import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const download = document.querySelector('.download-wrapper');
const downloadTrigger = document.querySelector('.download-contentTrigger');
const timelineWrapper = document.querySelector('.timeline-wrapper');
const milestones = Array.from(document.querySelectorAll('.milestone'));
const timelineDates = Array.from(document.querySelectorAll('.timeline-date'));

function handleDownload(e) {
	e.preventDefault();
	download.classList.toggle('active');			
}

function handleDateClick(e) {
	e.preventDefault();
	let url = this.getAttribute('href');
	let date = document.getElementById(url);
	gsap.to(window, {duration: 3, scrollTo: {y: date, offsetY: 75}, ease: "power3.out"});
}

function handleScroll() {
	let distanceScrolled = window.pageYOffset;

	if (!download.classList.contains('fixed') && distanceScrolled > (download.offsetTop + download.parentElement.offsetTop) - 75) {
		download.classList.add('fixed');
		download.firstElementChild.classList.add('fixed');
	} else if (download.classList.contains('fixed') && distanceScrolled < (download.offsetTop + download.parentElement.offsetTop) - 75) {
		download.classList.remove('fixed');
		download.firstElementChild.classList.remove('fixed');
	}

	if (!timelineWrapper.classList.contains('fixed') && distanceScrolled > (timelineWrapper.offsetTop + timelineWrapper.parentElement.offsetTop) - 75) {
		timelineWrapper.classList.add('fixed');
		timelineWrapper.firstElementChild.classList.add('fixed');
	} else if (timelineWrapper.classList.contains('fixed') && distanceScrolled < (timelineWrapper.offsetTop + timelineWrapper.parentElement.offsetTop) - 75) {
		timelineWrapper.classList.remove('fixed');
		timelineWrapper.firstElementChild.classList.remove('fixed');
	}

	milestones.forEach((milestone,index) => {
		if (!milestone.classList.contains('scrolled') && index == 0 && distanceScrolled > milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop - (window.innerHeight / 2)) {
			milestone.classList.add('scrolled');
			timelineDates[index].classList.add('active');
		} else if (!milestone.classList.contains('scrolled') && distanceScrolled > milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop - (window.innerHeight / 2)) {
			let activeMarker = document.querySelector('.timeline-date.active');
			milestone.classList.add('scrolled');
			activeMarker.classList.remove('active');
			timelineDates[index].classList.add('active');
		} else if (milestone.classList.contains('scrolled') && distanceScrolled < milestone.offsetTop + milestone.parentElement.offsetTop + milestone.parentElement.offsetParent.offsetTop - (window.innerHeight / 2)) {
			let activeMarker = document.querySelector('.timeline-date.active');
			milestone.classList.remove('scrolled');
			activeMarker.classList.remove('active');
			timelineDates[index - 1].classList.add('active');
		}
	})
}

window.addEventListener('scroll', handleScroll);

for (let i = 0; i < timelineDates.length; i++) {
	timelineDates[i].addEventListener('click', handleDateClick);
}

downloadTrigger.addEventListener('click', handleDownload);


