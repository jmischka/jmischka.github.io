( function() {

	const outerWrapper = document.querySelector('.tech175-timeline-outerWrapper');
	const timeline = document.querySelector('.tech175-timeline');
	const titleSlide = document.querySelector('.tech175-titleSlide');
	const title = document.querySelector('.tech175-titleSlide-title');
	const titleTick = document.querySelector('.tech175-titleSlide-titleTick');
	const timelineEntries = Array.from(document.querySelectorAll('.tech175-timelineEntry'));
	const trigger = document.querySelector('.tech175-bkgrndTrggr');
	const scrollTick = document.querySelector('.tech175-titleSlide-scroll');
	const slug = document.querySelector('.tech175-titleSlide-slug');
	const futureButtons = document.querySelectorAll('.tech175-futureButton');
	const closeButtons = document.querySelectorAll('.tech175-videoPanel-closeButton');
	const coverLinks = document.querySelectorAll('.tech175-timelineEntry-coverLink');

	let mobile = false;


// FUNCTION HORIZONTAL SCROLL for Desktop
	function horizontalScroll() {
		if (mobile) {
			return;
		} else {
			let distanceScrolled = window.pageYOffset;
			timeline.style.left = -distanceScrolled + 'px';
			timelineEntries.forEach((entry, index) => {
				if (index == 0 && !entry.classList.contains('in-view') && distanceScrolled > entry.offsetLeft - window.innerWidth) {
					entry.classList.add('in-view');
				} else if (index > 0 && !entry.classList.contains('in-view') && distanceScrolled > entry.offsetLeft) {
					entry.classList.add('in-view');
				} else if (index > 0 && entry.classList.contains('in-view') && distanceScrolled < entry.offsetLeft) {
					function removeClass() {
						entry.classList.remove('in-view');
						entry.firstElementChild.style.opacity = '1';
					}
					entry.firstElementChild.style.opacity = '0';
					setTimeout(removeClass, 1000);
				} else if (index == 0 && entry.classList.contains('in-view') && distanceScrolled < entry.offsetLeft - window.innerWidth) {
					function removeClass() {
						entry.classList.remove('in-view');
						entry.firstElementChild.style.opacity = '1';
					}
					entry.firstElementChild.style.opacity = '0';
					setTimeout(removeClass, 1000);
				}
			})
			if (!trigger.classList.contains('scrolled') && distanceScrolled > trigger.offsetTop - window.innerHeight) {
				trigger.classList.add('scrolled');
				titleSlide.firstElementChild.style.opacity = '0';
				for (let i = 0; i < timelineEntries.length; i++) {
					timelineEntries[i].firstElementChild.style.opacity = '0';
				}
			} else if (trigger.classList.contains('scrolled') && distanceScrolled < trigger.offsetTop - window.innerHeight) {
				trigger.classList.remove('scrolled');
				titleSlide.firstElementChild.style.opacity = '1';
				for (let i = 0; i < timelineEntries.length; i++) {
					timelineEntries[i].firstElementChild.style.opacity = '1';
				}
			}
		}	
	}

// FUNCTION VERTICAL SCROLL FUNCTION for Mobile
	function verticalScroll() {
		if (!mobile) {
			return;
		} else {
			let distanceScrolled = window.pageYOffset;
			timelineEntries.forEach(entry => {
				if (!entry.classList.contains('in-view') && distanceScrolled > entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
					entry.classList.add('in-view');
				} else if (entry.classList.contains('in-view') && distanceScrolled < entry.offsetTop + entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop + entry.parentElement.offsetParent.parentElement.offsetTop) {
					function removeClass() {
						entry.classList.remove('in-view');
						entry.firstElementChild.style.opacity = '1';
					}
					entry.firstElementChild.style.opacity = '0';
					setTimeout(removeClass, 1000);
				}
			})
			if (!trigger.classList.contains('scrolled') && distanceScrolled > trigger.offsetTop - window.innerHeight) {
				trigger.classList.add('scrolled');
				titleSlide.firstElementChild.style.opacity = '0';
				for (let i = 0; i < timelineEntries.length; i++) {
					timelineEntries[i].firstElementChild.style.opacity = '0';
				}
			} else if (trigger.classList.contains('scrolled') && distanceScrolled < trigger.offsetTop - window.innerHeight) {
				trigger.classList.remove('scrolled');
				titleSlide.firstElementChild.style.opacity = '1';
				for (let i = 0; i < timelineEntries.length; i++) {
					timelineEntries[i].firstElementChild.style.opacity = '1';
				}
			}
		}	
	}

// PAGE FUNCTIONS
	function handleButtons(e) {
		e.preventDefault();
		let trigger = this.dataset.videolink;
		let panel = document.getElementById(trigger);
		panel.classList.add('activated');
		panel.firstElementChild.style.opacity = '1';
	}

	function handleCloseButtons(e) {
		e.preventDefault();
		this.parentElement.firstElementChild.style.opacity = '0';
		this.parentElement.classList.remove('activated');
		let iFrame = this.parentElement.firstElementChild.children[1].firstElementChild;
		let iframeSrc = iFrame.src;
		iFrame.src = iframeSrc;
	}

	function handleCvrLinkMob(e) {
		if (!mobile) {
			return;
		} else {
			e.preventDefault();
			this.classList.toggle('activelink');
			if (this.classList.contains('activelink')) {
				this.style.backgroundColor = 'white';
				this.children[2].style.opacity = '1';
				this.children[2].style.visibility = 'visible';
			} else {
				this.style.backgroundColor = '#F2DE77';
				this.children[2].style.opacity = '0';
				this.children[2].style.visibility = 'hidden';
			}
		}
	}

	function handleCvrLinkDesk(e) {
		if (mobile) {
			return;
		} else {
			e.preventDefault();
		}
	}

	function titleMobDisplay() {
		title.style.display = 'block';
		titleTick.style.display = 'block';
		slug.style.display = 'block';
	}

	function titleDeskDisplay() {
		title.style.display = 'block';
		titleTick.style.display = 'block';
		scrollTick.style.display = 'block';
		slug.style.display = 'block';
	}

// PAGE EVENT LISTENERS
	for (let i = 0; i < futureButtons.length; i++) {
		futureButtons[i].addEventListener('click', handleButtons);
	}

	for (let i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', handleCloseButtons);
	}

// SET PLATFORM - Mobile or Desktop
	function setPlatform() {
		if (window.innerWidth > 960) {
			mobile = false;
			outerWrapper.style.height = timeline.offsetWidth + (window.innerWidth - window.innerHeight) + 'px';
			window.addEventListener('scroll', horizontalScroll);
			for (let i = 0; i < coverLinks.length; i++) {
				coverLinks[i].addEventListener('click', handleCvrLinkDesk);
			}
			setTimeout(titleDeskDisplay, 1000);
		} else if (window.innerWidth < 960) {
			mobile = true;
			outerWrapper.style.height = 'auto';
			timeline.style.left = '0';
			window.addEventListener('scroll', verticalScroll);
			for (let i = 0; i < coverLinks.length; i++) {
				coverLinks[i].addEventListener('click', handleCvrLinkMob);
			}
			setTimeout(titleMobDisplay, 1000);
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

} )();