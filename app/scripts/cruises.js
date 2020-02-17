import { getPageLanguage, requestResv } from './utils';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyADWQW2m0LOHMLhjbv27iQwQjVKLvIiqEw",
    authDomain: "secrets-74e91.firebaseapp.com",
    databaseURL: "https://secrets-74e91.firebaseio.com",
    projectId: "secrets-74e91"
};
firebase.initializeApp(config);

let language = getPageLanguage('lng') || 'en' ;

const itinerary = language === 'en' ? 'Cruise service 2020' : 'Servicio de cruseros 2020'

System.import(`../data/splash/index.${language}.js`).then((res) => {
	try {
		const content = document.querySelector('#cruise-content');
		const dataIndex = parseInt(content.getAttribute('data-index'));
		content.innerHTML = createLayout(res.default[dataIndex])
		addListeners();
	} catch(err) {
		//
		console.log(err)
	}
})

function addListeners() {
	const resBtn = document.querySelectorAll('.request-reservation');
	resBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			requestResv(btn.getAttribute('parent-modal'), btn, firebase)
		})
	})
}

function getReserveBtn(data) {
	const t0 = getText('Reserve First class', 'Reservar Primera clase');
	const t1 = getText('Reserve Standard', 'Reservar Estandar');
	const t2 = getText('Reserve Tour', 'Reservar Tour');
	const prices = Object.keys(data.price);
	return prices.map(type => {
		return `
			<button class="bttn-unite bttn-md bttn-warning" data-target="#${data.id + '-' + type}-modal" data-toggle="modal">
			${ (prices.length > 1)
				? (type === 'standard' ? t1 : t0)
				: (t2)
			}
			</button>
		`
	}).join('')
}

function getCruiseBody(data) {
	const t0 = getText('Include', 'Incluye');
	let res = `
	<div class="cuise-body">
			<div class="cruise-data">
				<h3>${ data.title }</h3>
				<h4>${ data.subtitle }</h4>
				<p>${ data.description }</p>
				<h4>${t0}</h4>
				<div class="tour-include">
					${ getTourInclude(data.include, data.price) }
				</div>
				<div class="reservation-btn">
					${ getReserveBtn(data) }
				</div>
			</div>
			<div class="img-presentation">
				${ getImgPresentation(data.media) }
				<div class="tour-itinerary">
					${ getTourItinerary(data.itinerary) }
				</div>
			</div>
		</div>
	`+ createModal(data);
	if (data.extraTours) {
		res = res + data.extraTours.map(extra => {
			return getCruiseBody(extra)
		}).join('');
	}
	setPresentation(data.media);
	return res;
}

function createLayout(data) {
	return `
		${getCruiseBody(data)}
		<div class="cruise-itinerary">
			<img src="${data.img.portrait}">
			<div class="article-title hidden">${data.shortTitle}</div>
			<div class="items">
				<h3>${ itinerary }</h3>
				${ getItineraryItems(data.cruisesdates) }
			</div>
		</div>
	`;
}

function getTourInclude(include, price) {
	const t0 = getText('First Class', 'Primera Clase');
	const t1 = getText('Standard', 'Estandar');
	const t2 = getText('Price', 'Precio');
	return Object.keys(include).map((type, i) => {
		return `
		<div class="include-type">
			<h4>${i === 0 ? t1 : t0}</h4>
			<div class="include-list">
				${
					include[type].map(item => {
						return `
							<div class="include-item">
								${item}
							</div>
						`
					}).join('')
				}
				<div class="include-price">
					<span>${t2}:</span> ${price[type].amount}$
				</div>
			</div>
		</div>
		`
	}).join('')
}
/**
 * 
 * @param {*} itinerary 
 */
function getTourItinerary(itinerary) {
	return Object.keys(itinerary).map(date => {
		return `
			<div class="itienrary-item">
				<div class="item-time">${ date }</div>
				<div class="item-desc">
					<p>${ capitalize(itinerary[date]) }</p>
					<div class="item-border"></div>
				</div>
			</div>
		`
	}).join('');
}
/**
 * 
 * @param {*} media 
 */
function setPresentation(media) {
	let i = 0;
	setInterval(() => {
		i++;
		if (i >= media.length) {
			i = 0;
		}
		document.querySelectorAll('.img-item:not(.hidden)').forEach(el => {
			el.classList.add('hidden');
		})
		document.querySelectorAll(`.img-presentation`).forEach(el => {
			el.querySelectorAll('.img-item')[i].classList.remove('hidden');
		})
	}, 10000)
}

function getImgPresentation(imgs) {
	return imgs.map((img, i) => {
		return `
			<div class="img-item${i !== 0 ? ' hidden' : ''}">
				<img src="${ img }"></img>
			</div>
		`
	}).join('')
}
/**
 * 
 * @param {*} cruisesdates 
 */
function getItineraryItems(cruisesdates) {
	return cruisesdates.map(item => {
		return `
			<div class="itinerary-item">
				<span>
					<i>${item.date}</i>
					<i class="fas fa-long-arrow-alt-right"></i>
					<strong>${item.destination}</strong> / ${item.title} 
				</span>
			</div>
		`
	}).join('');
}

function getText(en, es) {
	return language === 'en' ? en : es;
}
/**
 * Capitalize the first letter of any text given
 * @param {String} str 
 */
function capitalize(str) {
	return str.replace(new RegExp(`^${str[0]}`), str[0].toUpperCase());
}

function createModal(item) {
	const t0 = getText('per person', 'por persona');
	const t1 = getText('Tour reservation', 'Reserva del tour');
	const t2 = getText('Date', 'Fecha');
	const t3 = getText('Payment Type', 'Tipo de pago');
	const t4 = getText('N° people', 'N° personas');
	const t5 = getText('Notes about your reservation', 'Notas sobre su reserva');
	const t6 = getText('Invalid request, you must fill all required fields', 'Solicitud no válida, debe completar todos los campos obligatorios');
	const t7 = getText('Invalid email address', 'Dirección de correo electrónico no válida')
	const t8 = getText('Standard', 'Estandar');
	const t9 = getText('First Class', 'Primera Clase');
	const t10 = getText('Request Reservation', 'Reservar')
	return Object.keys(item.price).map(type => {
		return  `
		<div id="${item.id + '-' + type}-modal" class="rsv-modal-only modal" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h3 class="modal-title">${ (item.title + ' ') + ((type === 'standard') ? t8 : t9) }</h3>
					<div class="price-holder"><span class="form_price">${item.price[type].amount}$</span><span>${ t0 }</span></div>
				</div>
				<div class="modal-body">
					<input type="hidden" id="rsv-tour-info" class="rsv-tour-info" value="${item.title + ' ' + item.subtitle}" tour-id="${item.id + '-' + type}">
					<input type="hidden" id="rsv-lang" class="rsv-lang" value="en">
					<div class="reservation-subtitle">${t1}</div>
					<div class="form-inputs"><input type="text" class="rsv-input rsv-name" id="rsv-name" placeholder="Name*"></div>
					<div class="input-group date-input-group">
						<span class="input-group-addon">${t2}*</span>
						<input type="date" id="rsv-date" class="form-control rsv-date" name="date">
					</div>
					<div class="form-inputs"><input id="rsv-people" placeholder="${t4}*" class="rsv-input rsv-people" type="number"></div>
					<div class="form-inputs"><input id="rsv-email" placeholder="Email*" class="rsv-input rsv-email" type="email"></div>
					<div class="input-group">
						<span class="input-group-addon">${t3}*</span>
						<select id="rsv-payment" class="form-control rsv-payment">
							<option value="visa-credit">Visa credit</option>
							<option value="visa-debit">Visa debit</option>
							<option value="paypal">Paypal</option>
							<option value="bank-transfer">Bank transfer</option>
						</select>
					</div>
					<div class="form-inputs"><textarea id="rsv-notes" class="rsv-notes" placeholder="${t5}"></textarea></div>
					<p id="rsv-warn" class="rsv-warn-regular rsv-warn rsv-warn-hidden">*${t6}*</p>
					<p id="rsv-warn-email" class="rsv-warn-email rsv-warn rsv-warn-hidden">*${t7}*</p>
				</div>
				<div class="modal-footer">
					<button type="button" parent-modal="${item.id + '-' + type}-modal" class="request-reservation btn btn-default request-btn"><i class="fa fa-envelope-o" aria-hidden="true"></i>${t10}</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
		  </div>
		</div>
	</div>
	`;
	}).join('')
}