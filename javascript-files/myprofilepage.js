
document.getElementById('logout-btn').addEventListener('click',logoutFun);

function logoutFun() {
    firebase.auth().signOut().then(function() {
         window.location.replace("login.html");
         
       }).catch(function(error) {
            console.log(error);

        // An error happened.
        });   

}


/* document.getElementById('save-btn').addEventListener('click', function(){
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    // Prompt the user to re-provide their sign-in credentials
    return user.reauthenticateWithCredential(credential);
}); */  




var user = firebase.auth().currentUser;
var  email,password;

if (user != null) {
 console.log('yeah');
  //email = user.email;
    
    // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
  
                   // you have one. Use User.getToken() instead.
}else {
    console.log('no');
}

  