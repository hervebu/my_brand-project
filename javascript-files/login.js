
var loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var userEmail = document.getElementById('login-userEmail').value;;
    var userPassword = document.getElementById('login-password').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(
        
        window.location.assign('../Ui-templates/admin-page.html')
    ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });  


})



function getUserCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function () {
        var userLatitude = position.coords.latitude; 
        var userLongitude = position.coords.longitude;
    });
  } else { 
    console.log('geolocation not supported ');
  }
}


