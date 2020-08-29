const header = document.querySelector('.fabian-article-header');
const titleSlide = document.querySelector('.fabian-title-slide');
const mainContent = document.querySelector('.fabian-main-content');
const contentSlides = Array.from(document.querySelectorAll('.fabian-content-slide'));
const videoPanelTrigger = document.querySelector('.fabian-videoPanelTrigger');
const audioPanelTriggers = Array.from(document.querySelectorAll('.fabian-audioPanelTrigger'));
const panelCloseButtons = Array.from(document.querySelectorAll('.panel-close-button'));
const contentCurtain = document.querySelector('.fabian-content-curtain');
const documentBody = document.getElementsByTagName('BODY');
const slideDownLink = document.querySelector('.title-slide-down-link');
const returnLink = document.querySelector('.footer-return-link');
const audioBtn = Array.from(document.querySelectorAll('.fabian-audioPlayBtn'));
const audioProg = Array.from(document.querySelectorAll('.fabian-audioProgress-fill'));

let slideCount = 0;
let interval;


// COMPLIANCE BANNER onload
// function setBodyStyle() {
// 	documentBody[0].style.transform = 'none';
// }

// function setBodyResize() {
// 	const wrapper = document.querySelector('.optanon-alert-box-wrapper');
// 	if (!wrapper.classList.contains('clicked')) {
// 		wrapper.style.top = '0';
// 		documentBody[0].style.transform = 'none';
//         documentBody[0].style.position = 'relative';
// 	}
// }

// var interval = setInterval(function() {
//     if(document.readyState === 'complete') {
//         clearInterval(interval);
//         const wrapper = document.querySelector('.optanon-alert-box-wrapper');
//         const button = document.querySelector('.optanon-allow-all');
//         wrapper.style.top = '0';
//         documentBody[0].style.transform = 'none';
//         documentBody[0].style.position = 'relative';
//         // documentBody[0].style.scrollTop = '0';
//         button.addEventListener('click', function(e) {
//         	wrapper.classList.add('clicked');
//         	setTimeout(setBodyStyle, 100);
//         })
//     }    
// }, 100);


// WINDOW RESIZE FUNCTIONS
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// };

// const resizeFunction = debounce(function() {
// 	setBodyResize();
// }, 250);

// window.addEventListener('resize', resizeFunction);


function handleAudioPanelTrigger(e) {
	e.preventDefault();
	let panel = document.getElementById(this.getAttribute('href'));
	this.classList.add('activated');
	panel.classList.add('active-panel');
	contentCurtain.style.display = 'block';
	if (this.previousElementSibling.children[0].paused == false) {
		this.previousElementSibling.children[0].pause();
	}
	if (this.classList.contains('activated')) {
		this.setAttribute('aria-expanded','true');
	} else {
		this.setAttribute('aria-expanded','false');
	}
}

function handleVideoPanelTrigger(e) {
	e.preventDefault();
	let panel = document.getElementById(this.getAttribute('href'));
	this.classList.add('activated');
	panel.classList.add('active-panel');
	contentCurtain.style.display = 'block';
	if (this.classList.contains('activated')) {
		this.setAttribute('aria-expanded','true');
	} else {
		this.setAttribute('aria-expanded','false');
	}
}

function handleCloseButton(e) {
	e.preventDefault();
	function removeCurtain() {
		let activeEl = document.querySelector('.activated');
		activeEl.classList.remove('activated');
		if (activeEl.classList.contains('activated')) {
			activeEl.setAttribute('aria-expanded','true');
		} else {
			activeEl.setAttribute('aria-expanded','false');
		}

		contentCurtain.style.display = 'none';
		contentCurtain.style.opacity = '1';
	}
	this.parentElement.classList.remove('active-panel');
	let iFrame = this.parentElement.children[0].firstElementChild;
	let iframeSrc = iFrame.src;
	iFrame.src = iframeSrc; 
	contentCurtain.style.opacity = '0';
	setTimeout(removeCurtain, 1000);
}

function handleKeyDown(e) {
	if (e.keyCode == 40 || e.keyCode == 39) {
		if (slideCount == 0) {
			gsap.to(window, {duration: 2, scrollTo: {y: contentSlides[slideCount], offsetY: -(window.innerHeight / 2), autoKill: false}, ease: "power3.out"});
		} else {
			gsap.to(window, {duration: 2, scrollTo: {y: contentSlides[slideCount], offsetY: -window.innerHeight, autoKill: false}, ease: "power3.out"});
		}
	}

	if (e.keyCode == 38 || e.keyCode == 37) {
		if (slideCount == 1) {
			gsap.to(window, {duration: 2, scrollTo: {y: 0, autoKill: false}, ease: "power3.out"});
		} else if (slideCount == 2) {
			gsap.to(window, {duration: 2, scrollTo: {y: contentSlides[slideCount-2], offsetY: -window.innerHeight / 2, autoKill: false}, ease: "power3.out"});
		} else {
			gsap.to(window, {duration: 2, scrollTo: {y: contentSlides[slideCount-2], offsetY: -window.innerHeight, autoKill: false}, ease: "power3.out"});
		}
	}
}

function handleSlideDownlink(e) {
	e.preventDefault();
	gsap.to(window, {duration: 3, scrollTo: {y: contentSlides[0], offsetY: -(window.innerHeight / 2), autoKill: false}, ease: "power3.out"});
}

function handleReturnLink(e) {
	e.preventDefault();
	gsap.to(window, {duration: 2, scrollTo: {y: 0, autoKill: false}, ease: "power3.out"});
}

function handleButton(e) {
	e.preventDefault();
	function progress() {
		let timer = audio.currentTime / audio.duration * 100;
		if (timer < 100) {
			pBar.style.width = timer + '%';
		} else {
			audio.currentTime = '0';
			pBar.style.width = '0';
			audio.previousElementSibling.classList.remove('playing');
			audio.previousElementSibling.children[0].classList.remove('playing');
			return;
		}		
	}
	this.classList.toggle('playing');
	this.parentElement.classList.toggle('playing');
	let audio = document.getElementById(this.dataset.audio);
	let pBar = this.nextElementSibling.children[0];
	if (this.classList.contains('playing')) {
		audio.play();
		interval = setInterval(progress, 1000);
	} else {
		audio.pause();
		clearInterval(interval);
		interval = null;
	}
}


window.addEventListener('scroll', function() {
	let distanceScrolled = window.pageYOffset;

	if (distanceScrolled > titleSlide.offsetHeight) {
		header.style.top = '-60px';
	} else {
		header.style.top = '0';
	}

	// TRIGGER CONTENT SLIDES
	contentSlides.forEach((slide,index) => {
		if (index == 0 && !slide.classList.contains('triggered') && distanceScrolled > slide.offsetTop + slide.parentElement.offsetTop - (window.innerHeight - 100)) {
			slide.classList.add('triggered');
			slideCount = index + 1;
		} else if (index > 0 && !slide.classList.contains('triggered') && distanceScrolled > slide.offsetTop + slide.parentElement.offsetTop) {
			slide.classList.add('triggered');
			contentSlides[index - 1].children[0].style.opacity = '0';
			if (slideCount < contentSlides.length) {
				slideCount = index + 1;
			}
		} else if (index > 0 && slide.classList.contains('triggered') && distanceScrolled < slide.offsetTop + slide.parentElement.offsetTop) {
			function removeClass() {
				slide.classList.remove('triggered');
				slide.children[0].style.opacity = '1';
			}
			slide.children[0].style.opacity = '0';
			contentSlides[index - 1].children[0].style.opacity = '1';
			setTimeout(removeClass, 750);
			slideCount = index;
		} else if (index == 0 && slide.classList.contains('triggered') && distanceScrolled < slide.offsetTop + slide.parentElement.offsetTop - (window.innerHeight - 100)) {
			function removeClass() {
				slide.classList.remove('triggered');
				slide.children[0].style.opacity = '1';
			}
			contentSlides[index].children[0].style.opacity = '0';
			setTimeout(removeClass, 750);
			slideCount = index;
		}
	})
});

videoPanelTrigger.addEventListener('click', handleVideoPanelTrigger);

for (let i = 0; i < audioPanelTriggers.length; i++) {
	audioPanelTriggers[i].addEventListener('click', handleAudioPanelTrigger);
}

for (let i = 0; i < panelCloseButtons.length; i++) {
	panelCloseButtons[i].addEventListener('click', handleCloseButton);
}

slideDownLink.addEventListener('click', handleSlideDownlink);
returnLink.addEventListener('click', handleReturnLink);
window.addEventListener('keydown', handleKeyDown);

for (let i = 0; i < audioBtn.length; i++) {
	audioBtn[i].addEventListener('click', handleButton);
}
