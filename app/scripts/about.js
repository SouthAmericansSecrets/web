import aen from '../tpl/pages/about.en.njk';
import aes from '../tpl/pages/about.es.njk';

var language = localStorage['lng'] || 'en' ;
let DATA;

let content = document.querySelector('#page-content');
System.import(`../data/about/certificates.${language}.js`).then((m) => {
	const tpl = language == "es" ? aes : aen;
	DATA = m.default;
	var html = tpl.render({ data: DATA });
	document.querySelector('#page-content').innerHTML = html;
	createImgPresentation(DATA.backgroundImgs)
});
/**
 * create a img presentation inside a element
 * @param {Array} imgs 
 * @param {HTMLElement} box 
 */
function createImgPresentation(imgs) {
	const box = document.querySelector('.certificate-info > .bg-imgs');
	const r =imgs.map((el, i) => {
		return `
			<div style="background:url(${el}) center;" class="${i !== 0 ? 'press-hidden' : ''}">
			</div>
		`
	}).join('')
	box.innerHTML = r;
	let x = 1;
	setInterval(() => {
		const prev = box.querySelector('*:not(.press-hidden)');
		if (x > imgs.length) {
			x = 1;
		}
		const next = box.querySelector(`*:nth-child(${x})`);
		prev.classList.add('press-hidden');
		next.classList.remove('press-hidden');
		x++;
	}, 5000)
}


document.title = "About us";

//const options = getContactChatOptionsByLanguafge(language);

document.addEventListener("DOMContentLoaded", function(event) {
//	const chat = new RebelChat(options);
	const mobileToggler = document.querySelector('.info-body > .mobile-only');
	const box = document.querySelector('.info-box');
	mobileToggler.addEventListener('click', () => {
		box.classList.toggle('toggled');
		if(box.classList.contains('toggled')) {
			mobileToggler.innerHTML = '<i class="fas fa-times"></i>'
		} else {
			mobileToggler.innerHTML = '<i class="fas fa-info-circle"></i>'
		}
	})
});
