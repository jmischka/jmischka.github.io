import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const timelineWrapper = document.querySelector('.timeline175-wrapper');
const timelineWindow = document.querySelector('.timeline175-window');
const timeline = document.querySelector('.timeline175-container');
const timelineNavigation = document.querySelector('.timeline175-timelineNavigation');
const navigationLinks = Array.from(document.querySelectorAll('.timeline175-timelineNavigation-link'));
const timelineNavTrig = document.querySelector('.timeline175-timelineNavigation-trigger');
const timelineNavClose = document.querySelector('.timeline175-timelineNavigation-close');
const timelineEntry = Array.from(document.querySelectorAll('.timeline175-entry'));
const coverArchive = document.querySelector('.timeline175-coverArchive');
const timelineProgress = document.querySelector('.timline175-progressFill');
const pageTitle = document.querySelector('.timeline175-pageTitle');

let mobile = true;

function titleReveal() {
	pageTitle.style.display = 'block';
}

setTimeout(titleReveal, 8000);

function desktopScroll() {
	if (mobile) {
		return;
	} else {
		let distanceScrolled = window.pageYOffset;
		timeline.style.left = -distanceScrolled + 'px';

		timelineProgress.style.width = distanceScrolled / timeline.offsetWidth * 100 + '%';

		if (!timelineWindow.classList.contains('scrolled') && distanceScrolled > coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.add('scrolled');
			timelineNavTrig.style.display = 'none';
		} else if (timelineWindow.classList.contains('scrolled') && distanceScrolled < coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.remove('scrolled');
			timelineNavTrig.style.display = 'block';
		}

		if (!timelineNavTrig.classList.contains('show') && distanceScrolled > timelineEntry[0].offsetLeft) {
			timelineNavTrig.classList.add('show');
			timelineNavTrig.style.display = 'block';
		} else if (timelineNavTrig.classList.contains('show') && distanceScrolled < timelineEntry[0].offsetLeft) {
			timelineNavTrig.classList.remove('show');
			timelineNavTrig.style.display = 'none';
		}

		timelineEntry.forEach(entry => {
			if (!entry.classList.contains('active') && distanceScrolled > entry.offsetLeft) {
				entry.classList.add('active');
			} else if (entry.classList.contains('active') && distanceScrolled < entry.offsetLeft) {
				entry.classList.remove('active');
			}
		})
	}
}

function mobileScroll() {
	if (!mobile) {
		return;
	} else {
		let distanceScrolled = window.pageYOffset;

		if (!timelineNavTrig.classList.contains('show') && distanceScrolled > timelineEntry[0].offsetTop + timelineEntry[0].parentElement.offsetTop + timelineEntry[0].parentElement.offsetParent.offsetTop + timelineEntry[0].parentElement.offsetParent.parentElement.offsetTop) {
			timelineNavTrig.classList.add('show');
			timelineNavTrig.style.display = 'block';
		} else if (timelineNavTrig.classList.contains('show') && distanceScrolled < timelineEntry[0].offsetTop + timelineEntry[0].parentElement.offsetTop + timelineEntry[0].parentElement.offsetParent.offsetTop + timelineEntry[0].parentElement.offsetParent.parentElement.offsetTop) {
			timelineNavTrig.classList.remove('show');
			timelineNavTrig.style.display = 'none';
		}

		if (!timelineWindow.classList.contains('scrolled') && distanceScrolled > coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.add('scrolled');
			timelineNavTrig.style.display = 'none';
		} else if (timelineWindow.classList.contains('scrolled') && distanceScrolled < coverArchive.offsetTop - window.innerHeight) {
			timelineWindow.classList.remove('scrolled');
			timelineNavTrig.style.display = 'block';
		}		
		
		timelineEntry.forEach(entry => {
			if (!entry.classList.contains('active') && distanceScrolled > entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
				entry.classList.add('active');
			} else if (entry.classList.contains('active') && distanceScrolled < entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
				entry.classList.remove('active');
			}
		})
	}
}

function handleTrigger(e) {
	e.preventDefault();
	timelineNavigation.classList.add('active');
}

function handleNavClose(e) {
	e.preventDefault();
	timelineNavigation.classList.remove('active');
}

function handleNavEnter(e) {
	if (mobile) {
		return;
	} else {
		let img = document.getElementById(this.dataset.yearimg);
		img.classList.add('active-navimg');
		img.style.opacity = '.7';
	}
}

function handleNavLeave(e) {
	if (mobile) {
		return;
	} else {
		let img = document.querySelector('.active-navimg');
		img.style.opacity = '0';
		img.classList.remove('active-navimg');
	}
}

function handleNavClick(e) {
	if (mobile) {
		return;
	} else {
		e.preventDefault();
		function scroller() {
			gsap.to(window, {duration: 4, scrollTo: {y: tElem.offsetLeft + tElem.children[1].offsetWidth}, ease: "power3.out"});
		}
		let tDate = this.getAttribute('href');
		let tElem = document.getElementById(tDate);
		timelineNavigation.classList.remove('active');
		setTimeout(scroller, 350);
	}
}

function handleMobileNavClick(e) {
	if (!mobile) {
		return;
	} else {
		e.preventDefault();
		function scroller() {
			gsap.to(window, {duration: 4, scrollTo: {y: tElem, offsetY: -50, autoKill: false}, ease: "power3.out"});
		}
		let tDate = this.getAttribute('href');
		let tElem = document.getElementById(tDate);
		timelineNavigation.classList.remove('active');
		setTimeout(scroller, 350);
	}
}

// SET PLATFORM - Mobile or Desktop
function setPlatform() {
	if (window.innerWidth < 960) {
		mobile = true;
		timelineWindow.style.position = 'relative';
		timeline.style.left = '0';
		window.addEventListener('scroll', mobileScroll);

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('click', handleMobileNavClick);
		}
	} else if (window.innerWidth > 960) {
		mobile = false;
		timelineWindow.style.position = 'fixed';
		window.addEventListener('scroll', desktopScroll);

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('mouseenter', handleNavEnter);
		}

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('mouseleave', handleNavLeave);
		}

		for (let i = 0; i < navigationLinks.length; i++) {
			navigationLinks[i].addEventListener('click', handleNavClick);
		}
	}
}
setPlatform();

// WINDOW RESIZE FUNCTIONS
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const resizeFunction = debounce(function() {
	setPlatform();
}, 250);

window.addEventListener('resize', resizeFunction);
timelineNavTrig.addEventListener('click', handleTrigger);
timelineNavClose.addEventListener('click', handleNavClose);
