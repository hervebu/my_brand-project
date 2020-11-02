const token1 = localStorage.getItem('token') 
const myId = localStorage.getItem('currentVal')
if (!token1 || !myId) {
  alert('You have to log in')
  window.location.assign('../Ui-templates/login.html')
} else {
      let email = document.getElementById('user-e-email'),
      password = document.getElementById('user-e-passw'),
      userName = document.getElementById('full-name');

      let httpVal = 'https://hervebu.herokuapp.com/user/accounts/' + myId
    fetch(
        httpVal,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json, */*',
            'content-type': 'application/json',
            'auth_token': token1
          }
        }
      ).then(res => res.json())
      .then(data => {
        userName.value = data['user data'].name 
        email.value = data['user data'].email
        
      }).catch(err => console.log(err))
      
    document.getElementById('save-btn').addEventListener('click', () => {
      fetch(httpVal,
          {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, */*',
              'content-type': 'application/json',
              'auth_token': token1
            },
            body: JSON.stringify({
              name: userName.value,
              email: email.value,
              password: password.value
            })
          }
          ).then(res => res.json())
          .then(response => {
            alert(response.message)
            window.location.assign('../Ui-templates/admin-page.html')
          }).catch(err => {
              console.log(err)
              alert('Unable to update your user information, something went wrong.') 
          })

      })  
}

document.getElementById('logout-btn').addEventListener('click',logoutFun);

function logoutFun() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentVal')
     window.location.replace("login.html")  
}
    