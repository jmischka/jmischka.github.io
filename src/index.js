const covItems = Array.from(document.querySelectorAll('.covWork-voiceItem'));
const covText = Array.from(document.querySelectorAll('.covWork-itemText'));
const covAudioButtons = Array.from(document.querySelectorAll('.covWork-audioButton'));
const transcriptButtons = document.querySelectorAll('.covWork-transcriptButton');

let audioSrc;
let timer;
let progressBar;

function funcProgress() {
	let duration = audioSrc.duration;
	let time = audioSrc.currentTime;
	progressBar.style.width = (time / duration) * 100 + '%';
}

function handleAudioButton(e) {
	e.preventDefault();
	let audio = this.dataset.audio;
	audioSrc = document.getElementById(audio);
	progressBar = this.nextElementSibling.children[0];
	this.classList.toggle('playing');
	this.parentElement.offsetParent.parentElement.offsetParent.classList.toggle('playing');
	if (this.classList.contains('playing')) {
		this.parentElement.classList.add('playing');
		timer = setInterval(funcProgress, 1000);
		audioSrc.play();
	} else {
		this.parentElement.classList.remove('playing');
		audioSrc.pause();
		audioSrc.currentTime = 0;
		clearInterval(timer);
		progressBar.style.width = 0;	
	}
}

function handleTransButton(e) {
	e.preventDefault();
	this.classList.toggle('clicked');
	if (this.classList.contains('clicked')) {
		this.innerHTML = 'Close audio transcript';
		this.style.color = '#C2645F';
		this.nextElementSibling.style.display = 'block';
	} else {
		this.innerHTML = '<img src="img/reading-icon2.png">Read audio transcript';
		this.style.color = 'black';
		this.nextElementSibling.style.display = 'none';
	}
}

function handleScroll() {
	let distanceScrolled = window.pageYOffset;

	covItems.forEach((item,index) => {
		if (index == 0 && !item.classList.contains('scrolled') && distanceScrolled > item.offsetTop + ((item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop) - (window.innerHeight / 1.5))) {
			item.classList.add('scrolled');
		} else if (index > 0 && !item.classList.contains('scrolled') && distanceScrolled > item.offsetTop + (item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop)) {
			covItems[index - 1].children[0].firstElementChild.style.opacity = '0';
			item.classList.add('scrolled');
			if (covItems[index - 1].classList.contains('playing')) {
				let plItems = document.querySelectorAll('.playing');
				for (let i = 0; i < plItems.length; i++) {
					plItems[i].classList.remove('playing');
				}
				covItems[index - 1].lastElementChild.children[4].lastElementChild.pause();
				covItems[index - 1].lastElementChild.children[4].lastElementChild.currentTime = 0;
				clearInterval(timer);
				progressBar.style.width = 0;
			}
		} else if (index > 0 && item.classList.contains('scrolled') && distanceScrolled < item.offsetTop + (item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop)) {
			function removeClass(){
				item.classList.remove('scrolled');
				item.children[0].firstElementChild.style.opacity = '1';
			}
			covItems[index - 1].children[0].firstElementChild.style.opacity = '1';
			item.children[0].firstElementChild.style.opacity = '0';
			if (item.classList.contains('playing')) {
				let plItems = document.querySelectorAll('.playing');
				for (let i = 0; i < plItems.length; i++) {
					plItems[i].classList.remove('playing');
				}
				item.lastElementChild.children[4].lastElementChild.pause();
				item.lastElementChild.children[4].lastElementChild.currentTime = 0;
				clearInterval(timer);
				progressBar.style.width = 0;
			}
			setTimeout(removeClass, 500);
		} else if (index == 0 && item.classList.contains('scrolled') && distanceScrolled < item.offsetTop + ((item.parentElement.offsetTop + item.parentElement.offsetParent.offsetTop) - (window.innerHeight / 1.5))) {
			function removeClass(){
				item.classList.remove('scrolled');
				item.children[0].firstElementChild.style.opacity = '1';
			}
			item.children[0].firstElementChild.style.opacity = '0';
			if (item.classList.contains('playing')) {
				let plItems = document.querySelectorAll('.playing');
				for (let i = 0; i < plItems.length; i++) {
					plItems[i].classList.remove('playing');
				}
				item.lastElementChild.children[4].lastElementChild.pause();
				item.lastElementChild.children[4].lastElementChild.currentTime = 0;
				clearInterval(timer);
				progressBar.style.width = 0;
			}
			setTimeout(removeClass, 500);
		}
	});
}

// PAGE EVENTLISTENERS

window.addEventListener('scroll', handleScroll);

for (let i = 0; i < covAudioButtons.length; i++) {
	covAudioButtons[i].addEventListener('click', handleAudioButton);
}

for (let i = 0; i < transcriptButtons.length; i++) {
	transcriptButtons[i].addEventListener('click', handleTransButton)
}