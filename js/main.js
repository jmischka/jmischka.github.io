window.onload = function() {

	var interviewLinks = document.querySelectorAll('.interview-links');
	var lightbox = document.getElementById('lightbox');
	var videoWrapper = document.querySelector('.videoWrapper');
	var closeButton = document.getElementById('close-button');

	
	function interviewClick() {
		var videoSrc = this.dataset.videosrc;
		videoWrapper.innerHTML = '<iframe width="560" height="315" src="' + videoSrc + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		lightbox.style.display = 'block';
	}

	function closeLightbox() {
		function removeElement() {
			videoWrapper.firstChild.remove();
			lightbox.style.display = 'none';
			lightbox.style.opacity = 1;
		}
		lightbox.style.opacity = 0;
		setTimeout(removeElement, 1000);
	}

	for (var i = 0; i < interviewLinks.length; i++) {
		interviewLinks[i].addEventListener('click', interviewClick);
	}

	closeButton.addEventListener('click', closeLightbox);
}