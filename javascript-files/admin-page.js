
const token1 = localStorage.getItem('token')
if (!token1) {
  alert('You have to login to continue')
  window.location.assign('../Ui-templates/login.html')
} else {

  //Function to get user's location
  function getUserCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function () {
          var userLatitude = position.coords.latitude; 
          var userLongitude = position.coords.longitude;
          console.log(userLatitude,userLongitude);
      });
    } else { 
      console.log('geolocation not supported ');
    }
  }
  getUserCurrentLocation();
  
  //Function to get queries/messages listed in a table
  fetch(
    'https://hervebu.herokuapp.com/query',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*',
        'auth_token': token1
      }
    }
  ).then(res => res.json())
  .then(queries => {
  
    for (let count = 0; count < queries.data.length; count++) {
      let msgsTable = document.getElementById('msgs-table');
          msgsTable.innerHTML += `<tr><td>${queries.data[count].senderName}</td>
             <td>${queries.data[count].message}</td><td>${queries.data[count].email}</td></tr>`
    }
  }).catch(err => console.log(err))
  
  //displaying articles into a table as a list
  fetch(
    'https://hervebu.herokuapp.com/articles',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*'
      }
    }
  ).then(res => res.json())
  .then(articles =>{
    for (let count = 0; count < articles.data.length; count++){ 
     
      let articlesTable = document.getElementById('articles-table');
      articlesTable.innerHTML += `<tr><td>${articles.data[count].title}</td>
      <td>${articles.data[count].date}</td><td><input
              type='button' value='delete' onclick="removeArticle('${count}','${articles.data[count]._id}');">
              </td></tr>`;  
  }
  
  })
  .catch(err => {
    alert('An error occurred while retrieving articles.')
    console.log(err)
  })
  
  //Function to delete an article
  function removeArticle (count,id) {
    let httpVal = 'https://hervebu.herokuapp.com/articles/' + id
    fetch(
    httpVal,
    {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json, */*',
        'auth_token': token1
    }
    }).then(res => res.json())
    .then(() => {
    document.getElementById('articles-table').deleteRow(count+1)
    alert('Article successfully deleted')
    })
    .catch(err => {
    alert('Unable to delete the  article')
    console.log(err)})    
  }
  
  //function to logout 
  document.getElementById('logout-btn').addEventListener('click',logoutFun);
  
  function logoutFun() {
      localStorage.removeItem('token')
      localStorage.removeItem('currentVal')
       window.location.replace("login.html")  
  }
}
