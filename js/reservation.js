document.addEventListener("DOMContentLoaded", function(event) {
    //Bind event to email inputs
    var email_inputs = document.getElementsByClassName("rsv-email");
    for(var i=0; i < email_inputs.length; i++) {
        email_inputs[i].addEventListener("keypress", function(){
            var email_warnings = document.getElementsByClassName("rsv-warn-email");
            for(var j = 0; j < email_warnings.length; j++){
                email_warnings[j].setAttribute("class","rsv-warn-email rsv-warn rsv-warn-hidden");
            }
        });
    }
    //Bind event to inputs
	var inputs = document.getElementsByClassName("rsv-input");
	for(var i=0; i<inputs.length; i++) {
		inputs[i].addEventListener("keypress", function(){
            var input_warnings = document.getElementsByClassName("rsv-warn-regular");
            for(var j = 0; j < input_warnings.length; j++){
                input_warnings[j].setAttribute("class","rsv-warn-regular rsv-warn rsv-warn-hidden");
            }
		});
    }
    
});
//clear text from filled inputs
function cleanReservationForm(modal){
    modal.getElementsByClassName("rsv-name")[0].value = "";
    modal.getElementsByClassName("rsv-email")[0].value = "";
    modal.getElementsByClassName("rsv-date")[0].value = "";
    modal.getElementsByClassName("rsv-people")[0].value = "";
    modal.getElementsByClassName("rsv-notes")[0].value = "";
    modal.getElementsByClassName("rsv-tour-info")[0].value = "";
    modal.getElementsByClassName("rsv-lang")[0].value = "";
}
//email validation
function validateEmail (email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
//Insert to Firebase
function insertReservation(obj,fbase,that){
	//DB auth
	fbase.auth().signInAnonymously().catch(function(error) {
		console.log(error.code);
		console.log(error.message);
	});
	//DB post-auth event listener
	fbase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			// ...
			var database = fbase.database();

			var reservations = database.ref('reservations');
			var newReservation = reservations.push();

			//database.ref('reservations/' + uuidv4())
			newReservation.set({
				name: obj.name,
				email: obj.email,
				date : obj.date,
				tour_id : obj.tId,
				tour_title : obj.tTitle,
				notes: obj.notes,
				nPeople: obj.nPeople,
				lang: obj.lang,
				payment_type: obj.payment_type,
				timestamp: fbase.database.ServerValue.TIMESTAMP
			}).then(function(e){
				// The message has been saved
				// Shows sent message
				// Notify user...
                $("#"+obj.tId+"-modal").modal("hide");
                $("#sent-reservation").modal({backdrop: true});
                cleanReservationForm(document.getElementById(obj.tId+"-modal"));
				that.disabled = false;
			});
		} else {
			// User is signed out.
			// ...
			that.disabled = false;
		}
	});
}
//Request reservation
function requestResv(id, that){
    var tour = document.getElementById(id+"-modal");
    var name = tour.getElementsByClassName("rsv-name")[0].value,
    email = tour.getElementsByClassName("rsv-email")[0].value,
    date = tour.getElementsByClassName("rsv-date")[0].value,
    nPeople = tour.getElementsByClassName("rsv-people")[0].value,
    notes = tour.getElementsByClassName("rsv-notes")[0].value,
    tTitle = tour.getElementsByClassName("rsv-tour-info")[0].value,
    lang = tour.getElementsByClassName("rsv-lang")[0].value,
    tId = tour.getElementsByClassName("rsv-tour-info")[0].getAttribute('tour-id'),
    payment = tour.getElementsByClassName("rsv-payment")[0].value;

    that.disabled = true;

    //Crucial values
	if(tTitle != "" && tId != "" && name != "" && email != "" && date != "" && nPeople != ""){
        //Second validation
		if(validateEmail(email)){
            insertReservation({
                tTitle: tTitle,
                tId: tId,
                name: name,
                email: email,
                date: date,
                nPeople: nPeople,
                notes: notes,
                lang: lang,
                payment_type: payment
            },firebase);
        }else{
            tour.getElementsByClassName("rsv-warn-email")[0].setAttribute("class","rsv-warn-email rsv-warn");
            tour.getElementsByClassName("rsv-email")[0].focus();
            that.disabled = false;
        }
    }else{
        tour.getElementsByClassName("rsv-warn-regular")[0].setAttribute("class","rsv-warn-regular rsv-warn");
        that.disabled = false;
    }
}