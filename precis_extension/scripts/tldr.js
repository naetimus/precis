
var lheArray;
var endpoint = "http://liquidhelium.stremor.com/tldr/";
var requestUrl = "";
var iniFile = "http://tldrstuff.com/static.txt";
var tldr_length;
var tldr_images;
var tldr_access;
var isSelection = false;
var envelope = $('body').clone();
var pocket = window.getSelection();
var prefs;
var prefsdata = new Array();
var referrer = (typeof document.referrer != 'undefined') ? document.referrer : "";
var version;
var summary = null;
var page = window.location.href;
var protocol = window.location.protocol;
var proceed = true;

//tags and styles to remove before sending
var _omit = ['script', 'noscript', 'style', 'embed', 'object', 'link', 'svg', '#tldr', 'form', 'p:empty', '[style*="display:none"]', '[style*="display: none"]'];

$(document).keydown(function(k) {
  if (k.keyCode == 27) {
    removePlugin();
  }
});

if ($('#tldr').length > 0) {
  removePlugin();
} else {
  if ($('frameset').length > 0) {
    alert("Sorry, this page uses framesets. The TLDR plugin doesn't work on pages using framesets.");
  } else {
    chrome.extension.sendMessage({service: "getLocalStorage", key: "tldrApp"}, function(response) {
      
      prefs = response.data;
      
      if (prefs) {
        prefsdata = JSON.parse(prefs);
        if (prefsdata.length > 0) {
          tldr_length = prefsdata[0].length;
          tldr_images = prefsdata[0].images;
          tldr_access = prefsdata[0].access;
        } 
      } else {
          tldr_length = "exec";
          tldr_images = "no";
          tldr_access = "warn";
      }

      processPage();
    });
  }
}

function processPage() {  

  if (proceed == true) {
    var tldr = $('<div />').attr('id', 'tldr');

    $('body:first').append(tldr); 
    
    tldr.load(chrome.extension.getURL("html/overlay.html"), function(E) {
      requestUrl = endpoint;

      //append content if it's not there.
      if (tldr.find('.tldr-container').length == 0) {
        $(this).html(e);
      }

      if (pocket != "") {
        isSelection = true;
        pocket = pocket.getRangeAt(0).cloneContents();
    
        // create a container for gumshoe
        var container = $('<div />').attr('id', 'tldr-selection');

        container.html(pocket);

        container.find(_omit.join(", ")).remove();

        var temp = $('#tldr').find('.tldr-temp-holder');

        temp.html(container);

        envelope = temp.html();

        temp.empty();
      } else {
        if (protocol != 'https:') {
          requestUrl += "url";
          envelope = "";
        } else {
          envelope.find(_omit.join(", ")).remove();
        }
      }

      if (envelope !== "") {
        //re-establish selection as jQuery object. if needed
        envelope = (envelope instanceof jQuery) ? envelope : $(envelope);
        
        envelope = envelope.html();

        //remove comments
        envelope = envelope.replace(/<!--[\s\S]*?-->/gi, "");  
      }

      // remove hash from url
      if ( page.indexOf('#') && !(/#.*\/.*/.test(page)) ) {
        page = page.split('#')[0];
      }


      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
      xmlhttp.open("POST", "https://precis.herokuapp.com/summaryurl", false);
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify({"url":page}));
      var response;

      if (xmlhttp.status === 200) {
        response = xmlhttp.responseText;
      }
 
      showResults(response);
      //send off request to LHe
      // chrome.extension.sendMessage({
      //   service: 'lhe', 
      //   url: requestUrl, 
      //   page: page,
      //   isSelection: isSelection,
      //   content: envelope
      // }, function(resp) {
      //   tldr.on('click', 'li[class^="tldr-"], a[class^="tldr-"]', clickControl);
      //   // showResults(resp.lhe);
      //   alert(resp.lhe);
      //   showResults("Shubham");
      // });
    });    
  } else {
    removePlugin();
  }
}  

function removePlugin() {
  //remove overlay
  $('#tldr').remove();
  //restore contextmenu
  //chrome.extension.sendMessage({service: 'contextmenu', enabled: true}, function(){}); 
}

function clickControl(e) {
  if (e.type == 'click') {
    knopf = $(this).attr('class');
  } else {
    knopf = e;
  }
  
  if (knopf != 'tldr-fml' && knopf != 'tldr-close') {
    $('#tldr').find('.tldr-active').removeClass('tldr-active');
  }

  switch(true) {
    case knopf.indexOf('tldr-close') > -1:
      removePlugin();
      break;
    case knopf.indexOf('tldr-exec') > -1:
      if (summary != null && summary.length > 0) {
        applyLHe(-1);
      } else {
        applyLHe(6);
      }
      $('.tldr-exec').addClass('tldr-active');
      break;
    case knopf.indexOf('tldr-short') > -1:
      applyLHe(25);
      $('.tldr-short').addClass('tldr-active');
      break;
    case knopf.indexOf('tldr-medium') > -1:
      applyLHe(50);
      $('.tldr-medium').addClass('tldr-active');
      break;
    case knopf.indexOf('tldr-long') > -1:
      applyLHe(75);
      $('.tldr-long').addClass('tldr-active');
      break;
    case knopf.indexOf('tldr-full') > -1:
      applyLHe(101);
      $('.tldr-full').addClass('tldr-active');
      break;
  }
}

function applyLHe(e) {
  var summ = $('#tldr').find('.tldr-summary');  
  var scored = $('#tldr').find('.tldr-scored');
  var i, len;
  //handle scored elements
  var show = function() {
    for (i=0,len=lheArray.length; i<len; i++) {
      var elem = $(lheArray[i]);
      var temp = elem.attr('data-lhe');

      if (temp > e) {
        if (!elem.hasClass('tldr-hidden')) {
          elem.addClass('tldr-fade');
          elem.one('webkitTransitionEnd', function (ev) {
            var current = $(ev.currentTarget);
            current.addClass('tldr-hidden');
          });
        }
      } else {
        elem.removeClass('tldr-hidden');
        document.getElementById('tldr').offsetWidth;
        elem.removeClass('tldr-fade');
      }
    }  
  }; 

  //handle summary and scored container
  if (e === -1) {
    if (!scored.hasClass('tldr-hidden')) {
      scored.addClass('tldr-fade');
      scored.one('webkitTransitionEnd', function() {
        scored.addClass('tldr-hidden');
        summ.removeClass('tldr-hidden tldr-fade');
      });
    }  
  } else {
    if (!summ.hasClass('tldr-hidden')) {
      summ.addClass('tldr-fade');
      summ.one('webkitTransitionEnd', function () {
        summ.addClass('tldr-hidden');
        scored.removeClass('tldr-hidden tldr-fade');
        //wait till summary has fully hidden to prevent content jump
        show();
      });
    } else {
      show();
    }  
  }
}

function handleImages(task) { 
  var regexps = {
    'classes': /caption|credit|title|byline/i,
    'tags': /CAPTION|CITE/i
  };  

  //ensure task is always set!!
  if (typeof task == 'undefined') {
    task = 'no';
  }

  $('.tldr-content').find('img').each(function(i, el) {
    el = $(el);

    // remove clear gifs/pixel trackers
    if (el.width() <= 1 && el.height() <= 1) {
      el.remove();
      return;
    }
   
    // is the parent a figure
    if (el.parent().prop('tagName') == 'FIGURE') {
      if (task == 'no') {
        el.parent().addClass('hidden');
      } else {
        el.parent().removeClass('hidden');
      } 
    }

    // check if image is accompanied by elements used for caption text 
    if (el.siblings().length > 0 && el.siblings().length < 3) { 
      var par = el.parent();
      try {
        el.siblings().each(function(i, sib) {
          sib = $(sib);
          // is the sibling a caption or cite
          if (sib.prop('tagName').search(regexps.tags) || ((typeof sib.attr('class') != 'undefined') && sib.attr('class').search(regexps.classes))) {
            par.addClass('tldr-image-caption');

            if (task == 'no') {
              par.addClass('hidden');
            } else {
              par.removeClass('hidden');
            }  
          }
        });
      } catch (Exception) {}   
    } else { 
      var prev = el.prev();
      var next = el.next();
      try {
        if (typeof prev.attr('class') != 'undefined' && prev.attr('class').search(regexps.classes)) {
          prev.addClass('tldr-image-caption');

          if (task == 'no') {
            prev.addClass('hidden');
          } else {
            prev.removeClass('hidden');
          } 
        }

        if (typeof next.attr('class') != 'undefined' && next.attr('class').search(regexps.classes)) {
          next.addClass('tldr-image-caption');

          if (task == 'no') {
            next.addClass('hidden');
          } else {
            next.removeClass('hidden');
          } 
        } 
      } catch (Exception) {}   
    }

    // add/remove hidden to img regardless of parents or siblings
    if (task == 'no') {
      el.addClass('hidden');
    } else {
      el.removeClass('hidden');
    } 
  });
}

function parseINIString(data){
  if (data) {
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function(line) {
        if (regex.comment.test(line)) {
            return;
        } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section){
                value[section][match[1]] = match[2];
            } else {
                value[match[1]] = match[2];
            }
        } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        } else if (line.length == 0 && section) {
            section = null;
        };
    });

    return value;
  }

  return false;
}

function showAdvert(file) {
  /* load text from static.stremor.com/whatever.txt */
  chrome.extension.sendMessage({service: "getAdvert", file: iniFile}, function(response) {

    var ini = parseINIString(response.advert);
    
    if (ini !== false) { 
      var advert = $('<p />').addClass('tldr-advert');

      if (typeof ini.text !== 'undefined') {
        advert.text(ini.text);
      }

      if (typeof ini.action !== 'undefined') {
        advert.append($('<span />').addClass('tldr-advert-action').html(ini.action));
      }
      
      if (advert.contents().length > 0) {
        $('.tldr-powered-by').addClass('hidden');
        $('.tldr-content').addClass('short');
        $('.tldr-info').prepend(advert);
      }
    }  
  });
}

// remove any scored elements that contain no text.
function filterLHe() {
  lheArray.each(function(i, el) {
    el = $(el);

    if (el.text() === "") {
      el.remove();
      lheArray.splice(i, 1);
    }
  });
}

// remove any elements that are `empty`. scored or non-scored
function removeEmptyNodes(content) {
  var tags = /IMG|BR/i;
  var test = [];

  content.find('*').each(function(i, el) {
    el = $(el);

    if (!(tags.test(el.prop('tagName')))) {
      if ($.trim(el.html()) == "") {
        el.remove();
      } else if ($.trim(el.text()) == "" && el.has('img').length == 0) {
        el.remove();
      }
    }  
  });
}

// a hack to give lists a LHe score 
function scoreLists(content) {
  content.find('ol, ul').each(function(i, el) {
    el = $(el);
    var top = 0;
    el.find('[data-lhe]').each(function(i, li) {
      li = $(li);
      var score = li.attr('data-lhe');
      if (score > top) {
        top = score;
      }
    });

    el.attr('data-lhe', top);
  });
}

function showResults(e) {
  // var success;
  // var message;
  // var code;
  // var results;
  // var title; 

  // if (!e.status) {
  //   success = false;
  // } else {
  //   success = e.status.success;
  //   message = e.status.message;
  //   code = e.status.code;
  //   results = e.content;
    
  //   if (typeof e.summary != 'undefined') {
  //     summary = e.summary;
  //   }
  // }

  summary = e;
  var tldr = $('#tldr');

  // // Get the modal
  // var modal = tldr.find('#myModal');

  // // Get the <span> element that closes the modal
  // var span = tldr.find('.close')[0];

  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //     modal.style.display = "none";
  // }

  // // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }
  // //hide preloader
  // tldr.addClass('hideLoader');
  obje = JSON.parse(summary)
  tldr.find('#myModal').css("display", "block").find('.modal-body').html(obje.summary);
  // tldr.find("#myModal").find('.close').click(function () {
  //   $('#myModal').modal('hide');
  // }

  // if(success) { 
  //     var tldr_content = tldr.find('.tldr-content');

  //     $('.tldr-container').css('display', 'block');
        
  //     // load content into plugin
  //     tldr_content.html(results)
  //     .find('*')
  //     .removeAttr('id class')
  //     .find('img')
  //     .removeAttr('width height');
              
  //     removeEmptyNodes(tldr_content);
    
  //     // scoreLists(tldr_content);

  //     tldr_content.children().first().addClass('tldr-scored');

  //     $('.tldr-fml').find('a').attr('href', encodeURI(e.more_like_url));
      
  //     // show/hide images based on option  
  //     handleImages(tldr_images);

  //     if (summary != null && summary.length > 0) {
  //       summary = $('<p />')
  //       .addClass('tldr-summary')
  //       .html(summary);

  //       // hide summary if it's not the default
  //       if (tldr_length != 'exec') {
  //         summary.addClass('tldr-fade tldr-hidden');
  //       } else {
  //         tldr.find('.tldr-scored').addClass('tldr-fade tldr-hidden');
  //       }
        
  //       tldr_content.prepend(summary);
  //     } 

  //     title = $('<h1 />')
  //     .addClass('tldr-title')
  //     .html(document.title);

  //     tldr_content.prepend(title);

  //     showAdvert(iniFile);

  //     lheArray = $('[data-lhe]');
  //     //filterLHe();
  //     $(lheArray).addClass('tldr-hidden tldr-fade');
  //     clickControl('.tldr-' + tldr_length);
  // }

  // if(!success) {
  //   tldr.find('.tldr-errorBox').css("display", "block").find('.tldr-errorMsg').html(message);
  // }
}

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//   switch (request.message) {
//     case "images":
//       if ($('#tldr').length > 0) {
//         handleImages(request.prefsdata);
//       }
//       break;
//   }
// });
