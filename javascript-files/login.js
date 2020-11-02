

 //Function to signin with firebase userEmail and password
var loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let userEmail = document.getElementById('login-userEmail').value;;
    let userPassword = document.getElementById('login-password').value;

    fetch(
      'https://hervebu.herokuapp.com/user/accounts',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, */*',
          'content-type': 'application/json'
        },
        body:JSON.stringify({
          email: userEmail,
          password: userPassword
        })
      }
    ).then(response => response.json()).then(data => {
      if(data.message === "Successfully logged in") {
        localStorage.setItem('token', data.token)
        localStorage.setItem('currentVal', data.val)  
        window.location.assign('../Ui-templates/admin-page.html')
      } else {
        alert (data.message)
      } 
    }).catch((err) => {
      alert('Unable to log you in, something went wrong while logging in!')
      console.log(err)
    })
    
  
})
