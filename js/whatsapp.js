const __LNG = localStorage.getItem('lng');
const __PHONE = '+51947058508'
const __URL = 'https://wa.me/';
const __URL2 = 'https://api.whatsapp.com/send?phone=';
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#whatapp-contact').addEventListener('click', () => {
        const __MSG = getMessage();
        console.log('url', `${__URL2}${__PHONE}&text=${encodeURI(__MSG)}`)
        window.open(`${__URL2}${__PHONE}&text=${encodeURI(__MSG)}`, '_blank');
    })
})
//articles.html
//contact.html
//about.html
// /
function getMessage() {
    const tourName = getTourName();
    if (__LNG === 'es') {
        return `Hola, estoy inseresado en ${ tourName }`;
    }
    return `Hi, I'm inserted in ${ tourName }`
}

function getTourName() {
    const title = document.querySelector('.article-title');
    const path = document.location.pathname;
    console.log(title, path);
    if(path !== '/'
        && path !== '/articles.html'
        && path !== '/contact.html'
        && path !== '/about.html'
    ) {
        return  title.innerHTML.replace(/\&amp;/g, __LNG === 'es' ? 'y' : 'and')
    }
    return __LNG === 'es' ? 'sus servicios' : 'your services';
}


