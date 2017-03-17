$(function () {
	var prefs = window.localStorage['tldrApp'];
	var prefsdata = new Array();
	
	$('.tldr-container').css('display', 'block')
	if (prefs) {
	    prefsdata = JSON.parse(prefs);
		
		if (prefsdata.length ) {
			var tldr_length = prefsdata[0].length;
			var tldr_images = prefsdata[0].images;
			var tldr_access = prefsdata[0].access;
			$('input:radio[value=' + tldr_length + ']').attr('checked', true);
			$('input:radio[value=' + tldr_images + ']').attr('checked', true);
			$('input:radio[value=' + tldr_access + ']').attr('checked', true);
		}
	} else {
		$('input:radio[value=exec]').attr('checked', true);
		$('input:radio[value=no]').attr('checked', true);
		$('input:radio[value=warn]').attr('checked', true);
	}

	$('#tldr-save, .tldr-close').click(function () {
		saveOptions();
		window.close();
	});
	$('li.tldr-privacy, li.tldr-options, li.tldr-support').click(function () {
		// $('section.tldr-privacy, section.tldr-options').toggleClass('hidden');
		// $('li.tldr-privacy, li.tldr-options').toggleClass('active');
		
		$('.active').removeClass('active');
		$(this).addClass('active');
		e = $(this).attr('class');
		console.log(e);
		switch(true) {
			case e.indexOf('tldr-options') > -1:
				$('section:not(.tldr-options)').addClass('hidden');
				$('section.tldr-options').removeClass('hidden');
				break;
			case e.indexOf('tldr-support') > -1:
				$('section:not(.tldr-support)').addClass('hidden');
				$('section.tldr-support').removeClass('hidden');
				break;
			case e.indexOf('tldr-privacy') > -1:
				$('section:not(.tldr-privacy)').addClass('hidden');
				$('section.tldr-privacy').removeClass('hidden');
				break;
		}
	});

	function saveOptions() {
		prefsdata = [];
		prefsdata.push({length: $("input[name=tldr-length]:checked").val(), images: $("input[name=tldr-images]:checked").val(), access: $("input[name=tldr-access]:checked").val()});
		localStorage['tldrApp'] = JSON.stringify(prefsdata);
	}
}) 	