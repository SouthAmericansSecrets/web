import loginen from '../tpl/partials/backoffice-login.en.njk';
import logines from '../tpl/partials/backoffice-login.es.njk';

const language	= localStorage['lng'] || 'en' ;
const tpl = language == 'es' ? logines : loginen;
var html = tpl.render();
document.querySelector('#page-content').innerHTML = html;

document.title = language == "es" ? "Iniciar sesión" : "Login";

//Just for now, a hardcoded login
function temporaryHardcodedLogin(usr,psw){
    if(usr == 'SouthAmericans' && psw == 'Secrets2026!'){
        changeUriPath('messageboard.html');
    }
}

//Login on enter
document.getElementById("backoffice-password").addEventListener("keypress", function(e){
    if(e.which == 13){
        e.preventDefault();
        document.getElementById("backoffice-login-button").click();
    }
});

//Get username & password
document.getElementById("backoffice-login-button").addEventListener("click", function(){
    var username = document.getElementById("backoffice-username").value,
    password = document.getElementById("backoffice-password").value;

    temporaryHardcodedLogin(username, password);
});
