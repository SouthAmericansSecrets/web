import { getPageLanguage } from './utils';

let language = getPageLanguage('lng') || 'en' ;

System.import(`../data/splash/index.${language}.js`).then((res) => {
	let i = 0;
	createItems(res.default);
	setInterval(() => {
		const isTrue = document.querySelector('pretty-modal') !== null
			&& document.querySelector('pretty-modal').getAttribute('visible') !== null;
		// if some one is seeing it keep the presentation
		if (isTrue) {
			i++;
			if (res.default.length > i) {
				setPresentation(i)
			} else {
				i = 0;
				setPresentation(i);
			}
		}
	}, 10000)
});

function createItems(data) {
	document.querySelector('pretty-modal .splash-ad').innerHTML =
	`<div class="best-seller">Best Seller</div>` +
	data.map((item, i) => {
		return `
			<div class="splash-pres ${i === 0 ? '' : 'hidden'}">
				${ getItem(item, i) }
			</div>
		`
	}).join('');
}

function getItem(el, i) {
	return  `
	<picture>
		<source media="(max-width: 500px)" srcset="${el.img.portrait}">
		<img src="${el.img.landscape}">
	</picture>
	<div class="img-wrapper">
		<div class="splash-title">
			<h2><i class="fas fa-anchor"></i> ${ el.title }</h2>
			<h3><i class="fas fa-route"></i> ${ el.subtitle }</h3>
		</div>
		<div class="splash-description">
			${ el.itinerary.map((it, ind) => {
				if (ind <= 5) {
					return `
						<div>
							<span>
								<i>${it.date}</i>
								<i class="fas fa-long-arrow-alt-right"></i>
								<strong>${it.destination}</strong> / ${it.title} 
							</span>
						</div>
					`
				}
				return '';
			}).join('')}
			<div>
				<span>
					And more...
				</span>
			</div>
		</div>
		<div class="book-btn">
			<pretty-button type="danger" size="large" id="C-${i}" value="${language === 'en' ? 'See Tour' : 'Ver Tour'}"></pretty-button>
		</div>
	</div>
	`
}

function setPresentation(i) {
	const showing = document.querySelector('.splash-pres:not(.hidden)');
	const list = document.querySelectorAll('.splash-pres');
	showing.classList.add('hidden');
	list[i].classList.remove('hidden');
}