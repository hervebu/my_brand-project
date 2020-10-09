
var signUpForm = document.getElementById('signup-form');

var usersCollection = firebase.database().ref('users');

signUpForm.addEventListener('submit',submitSignupFunc);

function submitSignupFunc(e) {
    e.preventDefault();
    var newUserName =document.getElementById('name-input').value;;
    var newUserEmail =document.getElementById('email-input').value;
    var newUserDOB =document.getElementById('birthdate-input').value;
    var newUserPhone =document.getElementById('phone-input').value;
    var newUserPassword =document.getElementById('password-input').value;
    var adminAccount = document.getElementById('admin-check');
    var guestUserAccount = document.getElementById('guest-check');
    var newPasswordConfirm=document.getElementById('passconfirm-input').value;

    if (newUserPassword === newPasswordConfirm) {
        if (adminAccount.checked  && !guestUserAccount.checked) {
            typeOfaccount = 'admin';
            firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(function(){
                createUserAccount (newUserName,newUserEmail,newUserDOB,newUserPhone,typeOfaccount,newUserPassword);
                signUpForm.reset();
                window.location.assign('../Ui-templates/admin-page.html');
                    }).catch(function(error) {
                            // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode,errorMessage);
                    });    
        }else if(guestUserAccount.checked  && !adminAccount.checked) {
            typeOfaccount = 'guestUser';
            firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(function(){
                createUserAccount (newUserName,newUserEmail,newUserDOB,newUserPhone,typeOfaccount,newUserPassword);
                signUpForm.reset();
                    }).catch(function(error) {
                            // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode,errorMessage);
                    });
        } else if (adminAccount.checked && guestUserAccount.checked){
            alert('You have to choose one type of account');
        } else {
            alert('choose a type of account');
        }            



    } else {
        alert(`${newUserName}, correctly confirm your password.`)
    }
    
}




function createUserAccount (newUserName,newUserEmail,newUserDOB,newUserPhone,typeOfaccount,newUserPassword) {
    var newUserCollection = usersCollection.push();

    newUserCollection.set({
        name:newUserName,
        email:newUserEmail,
        dateOfBirth:newUserDOB,
        phoneNumber:newUserPhone,
        accountType:typeOfaccount,
        password:newUserPassword
    });
}
