
var signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit',submitSignupFunc);

function submitSignupFunc(e) {
    e.preventDefault();
    var newUserName = document.getElementById('name-input').value;;
    var newUserEmail = document.getElementById('email-input').value;    
    var newUserPassword = document.getElementById('password-input').value;
    var newPasswordConfirm= document.getElementById('passconfirm-input').value;
   
    if (newUserPassword === newPasswordConfirm) {
           fetch(
               'https://hervebu.herokuapp.com/user/new',
               {
                   method: 'POST',
                   headers: {
                    'Accept': 'application/json, */*',
                    'content-type': 'application/json'
                },
                body:JSON.stringify({
                    name: newUserName,
                    email: newUserEmail,
                    password: newUserPassword
                })
               }
               ).then( (res) => res.json()).then(data => {
                if (data.message === 'You have been successfully signed up') {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('currentVal', data.val)  
                    window.location.assign('../Ui-templates/admin-page.html');
                } else {
                    alert(data.message)
                } 
                
               }).catch ((err) => {
                    alert(`"${senderName}", there was an error while creating account.`)
                    console.log(err)
               })
                
    } else {
        alert(`${newUserName}, correctly confirm your password.`)
    }
}

