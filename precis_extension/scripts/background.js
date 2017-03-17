function clicker(e) {
	chrome.tabs.query({currentWindow:true, active:true}, function (tabs) {
		var temp = tabs[0];
		chrome.tabs.executeScript(temp.id, {file: '/scripts/tldr.js'});
		chrome.tabs.insertCSS(temp.id, {file: '/css/tldr.css'});
	});
}

// check tab url for presence of https or chrome and disable
// if needed 
function checker(tab) {
	// get prefs from localStorage
	var prefs = localStorage['tldrApp'];
	var prefsdata = JSON.parse(prefs);
	var access = prefsdata[0].access;

	if (tab.url.search('https://') != -1 || tab.url.search('chrome://') != -1) {
		if (access == 'noallow') {
			// hide toolbar icon on create
			chrome.browserAction.disable(tab.id);
			chrome.contextMenus.update('tldr-menu', {'enabled': false});
		}		
	} else {
		chrome.browserAction.enable(tab.id);
		chrome.contextMenus.update('tldr-menu', {'enabled': true});
		chrome.tabs.sendMessage(tab.id, {'message': 'images', 'prefsdata': prefsdata[0].images}, function(){});
	}
}

// ensure no csp issues
function requestor(args) {	
	var resp = {};

	jQuery.ajax({
	    'url': args.url,
	    'type': 'POST',
	    'async': false,
	    'data': {
	        "content": args.content,
	       	"url": args.page,
	       	"isSelection": args.isSelection,
	        "version": "CH-" + chrome.app.getDetails().version
	    },
	    'dataType': 'json',
	    'timeout': 20000,
	    success: function(response, textStatus, jqXHR) {
	    	resp = response;
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	      	var statusErrorMap = {
	        	'400' : "The server understood the request but the content was invalid.",
	        	'401' : "Unauthorized access.",
	        	'403' : "Forbidden resource can't be accessed",
	        	'500' : "Oops! It seems the server had an error. Please try again.",
	        	'503' : "Bummer! The TLDR service is unavailable. Please try again.",
	        	'0'   : "Sorry... I was a little slow, and a timeout occured!"
	      	};

	      	response = {
	        	"content": jqXHR,
	        	"id": "",
	        	"status": {
	          		"message": statusErrorMap[jqXHR.status],
	          		"success": false
	        	}
	      	};

	      	resp = response;
	    }
	});
	
	return resp;
}

function getAdvert(file) {
	var resp = {};

	jQuery.ajax({
		'url': file,
		'type': 'GET',
		'async': false,
		success: function(response, textStatus, jqXHR) {
	    	resp = response;
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	    	resp = false;
	    }
	});

	return resp;
}

//set default values if nothing is set
function setLocalStorage() {
	if ((typeof localStorage['tldrApp'] == 'undefined') || (localStorage['tldrApp'].length == 0)) {
 		var prefsdata = [];

		prefsdata.push({length: 'exec', images: 'no', access: 'warn'});
		localStorage['tldrApp'] = JSON.stringify(prefsdata);
	}	
}

setLocalStorage();

try {
	//check for initial install
	chrome.runtime.onInstalled.addListener(function(details) {
		if (details.reason == 'install') {
			chrome.tabs.create({'url': 'http://www.stremor.com/tldrplugin_install.html', 'active': true});
		}
	});
} catch(Exception) {}

chrome.contextMenus.create({"title": "Less words, please!", "id": "tldr-menu", "contexts": ["page", "frame", "selection", "link"]});

//listen for messages from injected scripts
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	var resp;

	switch (request.service) {
		case "getLocalStorage":
      	sendResponse({data: localStorage[request.key]});
		break;

	 	case "version":
    	resp = chrome.app.getDetails().version;
    	//chrome.contextMenus.update('tldr-menu', {'enabled': false});
		sendResponse({version: resp});
	 	break;

	 	case "contextmenu":
		chrome.contextMenus.update('tldr-menu', {'enabled': request.enabled});
	 	sendResponse({contextmenu: 'updated'});
	 	break;


	 	case "lhe":
	 	resp = requestor(request);
	 	sendResponse({lhe: resp});
	 	break;

	 	case "getAdvert":
	 	resp = getAdvert(request.file);
	 	sendResponse({advert: resp});
	 	break;
	}

});

// check url and options on new tab creation
chrome.tabs.onCreated.addListener(checker);

// inject js and css when plugin button is clicked
chrome.browserAction.onClicked.addListener(clicker);

// inject js and css when contextMenu is selected
chrome.contextMenus.onClicked.addListener(clicker);

//check url and options on tab update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		checker(tab);
	}	
});

//check tab when it becomes the active tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		checker(tab);
	});
});