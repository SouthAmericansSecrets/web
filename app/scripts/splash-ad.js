import { getPageLanguage } from './utils';

let language = getPageLanguage('lng') || 'en' ;

System.import(`../data/splash/index.${language}.js`).then((res) => {
	let i = 0;
	createItems(res.default);
	setTimeout(() => {
		addListeners();
	}, 1000)
	setInterval(() => {
		addListeners();
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
/**
 * add event listeners
 */
function addListeners() {
	try {
		document.querySelectorAll('.splash-ad pretty-button button')
		.forEach(btn => {
			const index = btn.parentElement.getAttribute('index');
			btn.addEventListener('click', () => {
				redirect(parseInt(index));
			})
		})
		document.querySelector('.splash-ad .close-btn').addEventListener('click', () => {
			document.querySelector('pretty-modal').close();
		})
	} catch (error) {
		
	}
}

function redirect(ind) {
	switch (ind) {
		case 1:
			document.location.href = document.location.pathname + 'callao-cruise.html';
			break;
		case 2:
			document.location.href = document.location.pathname + 'paracas-cruise.html';
			break;
		default:
			document.location.href = document.location.pathname + 'salaverry-cruise.html';
			break;
	}
}

function createItems(data) {
	try {
		document.querySelector('pretty-modal .splash-ad').innerHTML =
		`<div class="best-seller">Best Seller</div>
		<div class="close-btn mobile-only">
			<i class="fas fa-times"></i>
		</div>
		` +
		data.map((item, i) => {
			return `
				<div class="splash-pres ${i === 0 ? '' : 'hidden'}">
					${ getItem(item, i) }
				</div>
			`
		}).join('');
	} catch (err) {
		//
	}
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
			${ el.cruisesdates.map((it, ind) => {
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
			<pretty-button type="danger" size="large" index="${i}" value="${language === 'en' ? 'See Tour' : 'Ver Tour'}"></pretty-button>
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