const graphicEntries = Array.from(document.querySelectorAll('.graphic-entry'));
const graphicEntriesLarge = Array.from(document.querySelectorAll('.graphic-entrylarge'));
const featuredImage = document.querySelector('.page-featured-image');
const graphicTrigger = document.querySelector('#graphic-trigger');

console.dir(graphicTrigger);


function handleScroll() {
	let distanceScrolled = pageYOffset;

	if (distanceScrolled > 5) {
		featuredImage.classList.add('zoom');
	} else if (featuredImage.classList.contains('zoom') && distanceScrolled < 5) {
		featuredImage.classList.remove('zoom');
	}

	graphicEntries.forEach(entry => {
		if (distanceScrolled > entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop) - 200) {
			entry.classList.add('showme');
		} else if (entry.classList.contains('showme') && distanceScrolled < entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop) - 200) {
			entry.classList.remove('showme');
		}
	})

	if (distanceScrolled > graphicTrigger.offsetTop) {
		graphicTrigger.classList.add('scrolled');
		for (let i = 0; i < graphicEntries.length; i++) {
			graphicEntries[i].style.opacity = '0';
		}
	} else if (graphicTrigger.classList.contains('scrolled') && distanceScrolled < graphicTrigger.offsetTop) {
		graphicTrigger.classList.remove('scrolled');
		for (let i = 0; i < graphicEntries.length; i++) {
			graphicEntries[i].style.opacity = '1';
		}
	}

	graphicEntriesLarge.forEach(entry => {
		if (distanceScrolled > entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop) - 200) {
			entry.classList.add('showme');
			entry.children[0].firstElementChild.classList.add('active');
		} else if (entry.classList.contains('showme') && distanceScrolled < entry.offsetTop + (entry.parentElement.offsetTop + entry.parentElement.offsetParent.offsetTop) - 200) {
			entry.classList.remove('showme');
			entry.children[0].firstElementChild.classList.remove('active');
		}
	})
}

graphicEntriesLarge[0].style.marginBottom = graphicEntriesLarge[0].lastElementChild.offsetHeight + 'px';
window.addEventListener('scroll', handleScroll);