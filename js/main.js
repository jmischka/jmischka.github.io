( function() {

	var fbShareLink = document.querySelectorAll('.scr-boil-fbShareLink');
	var twShareLink = document.querySelectorAll('.scr-boil-twShareLink');

	function handleFbShare(e) {
		e.preventDefault();
		var url = window.location.href;
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
	}

	function handleTwShare(e) {
		e.preventDefault();
		var url = window.location.href;
		window.open('https://twitter.com/intent/tweet?url=' + url);
	}

	for (var i = 0; i < fbShareLink.length; i++) {
		fbShareLink[i].addEventListener('click', handleFbShare);
	}

	for (var i = 0; i < twShareLink.length; i++) {
		twShareLink[i].addEventListener('click', handleTwShare);
	}	

} )();