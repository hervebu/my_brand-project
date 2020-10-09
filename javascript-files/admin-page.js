

var user = firebase.auth().currentUser;
var  email,password;

/* if (user != null) {
 console.log('yeah');
  //email = user.email;
    
    // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
  
                   // you have one. Use User.getToken() instead.
}else {
    console.log('no');
} */

document.getElementById('logout-btn').addEventListener('click',logoutFun);

function logoutFun() {
    firebase.auth().signOut().then(function() {
       console.log('s');
         
         window.location.replace("login.html");
         
       }).catch(function(error) {
    // An error happened.
        });   

}

var referenceToMsgs = firebase.database().ref('messages');

referenceToMsgs.on('value',getMsgs);

function getMsgs(data) {
    var msgs = data.val();
    var keysMs = Object.keys(msgs);
    //console.log(keys);

    for (var count = 0; count < keysMs.length; count++){
        var nameOfSender = msgs[keysMs[count]].name;
        var subjectOfMessage = msgs[keysMs[count]].subject;
        var message = msgs[keysMs[count]].message;
        var emailOfSender = msgs[keysMs[count]].email;
        
        var msgsTable = document.getElementById('msgs-table');
        msgsTable.innerHTML += `<tr><td>${nameOfSender}</td><td>${subjectOfMessage}</td><td>${message}</td><td>${emailOfSender}</td></tr>`;        
        
        
    }
    
}

//displaying articles into a table as a list

var referenceToArticles = firebase.database().ref('articles');

referenceToArticles.on('value',getArticles);

function getArticles(data) {
    var articles = data.val();
    var keys = Object.keys(articles);
    

    for (var cont = 0; cont < keys.length; cont++){
        var titleOfArticle = articles[keys[cont]].Title;
        var contentOfArticle = articles[keys[cont]].articleContent;
        var timeOfCreation = articles[keys[cont]].timeCreated;
        
        var articlesTable = document.getElementById('articles-table');
        articlesTable.innerHTML += `<tr id ="row-${cont}"><td>${titleOfArticle}</td><td>${timeOfCreation}</td>
                <td>
                    <select>
                        <option>edit </option>
                        <option>delete</option>
                        
                    </select>
                </td></tr>`;        
        
        
    }
    
}

// function to delete an article from the database and the table

function removeArticle (id) {
    document.getElementById(id).remove();
    

}

//console.log(firebase.auth().currentUser.email);
 
