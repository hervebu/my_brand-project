
var addArticleForm = document.getElementById('article-form');
addArticleForm.addEventListener("submit",submitFun);

 function submitFun(e) {
    e.preventDefault();
    var articlesDatabase = firebase.database().ref('articles');
    articlesDatabase.once('value', function (snapshot) {
        if (!snapshot.exists()) {
            articleTotalNum = 0;
        }else {
            var articleTotalNum = snapshot.numChildren();
        }
        var articleTitle = document.getElementById('blog-title').value;
        var articleContent= document.getElementById('blog-body').value;
        var dateAndTimeCreated = `${new Date().getDate()}/${new Date().getMonth() + 1}` 
           + `/${new Date().getFullYear()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
                
        saveArticle(articleTotalNum,articleTitle,articleContent,dateAndTimeCreated);
        addArticleForm.reset();
        alert(`The blog "${articleTitle}" has been created.`);
                
        function saveArticle (articleTotalNum,articleTitle,articleContent,dateAndTimeCreated) {
            articlesDatabase.child(articleTotalNum + 1).set({
                   Title:articleTitle,
                   blogContent:articleContent,
                   timeCreated:dateAndTimeCreated   
                });
    
        }    
 });
}

document.getElementById('logout-btn').addEventListener('click',logoutFun);

function logoutFun() {
    firebase.auth().signOut().then(function() {
      window.location.replace("login.html");
       }).catch(function(error) {
        // An error happened.
        });   
}

     
