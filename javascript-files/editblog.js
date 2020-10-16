
var addArticleForm = document.getElementById('article-form');
addArticleForm.addEventListener("submit",submitFun);
//displaying articles into a table as a list
var referenceToArticles = firebase.database().ref('articles');
var articleId = 0;
referenceToArticles.once('value',getArticles);

function getArticles(snapshot) {
    var articles = snapshot.val();
    var keys = Object.keys(articles);
    console.log(articles);
    
    for (var cont = 0; cont <= keys.length; cont++){ 
        var titleOfArticle = articles[keys[cont]].Title;
        var blogContent = articles[keys[cont]].blogContent;
        var timeOfCreation = articles[keys[cont]].timeCreated;
        
        articleId = cont + 1;
        var articlesTable = document.getElementById('articles-table');
        articlesTable.innerHTML += `<tr id ="row-${cont}"><td>${titleOfArticle}</td>
        <td>${timeOfCreation}</td>
                <td><input type='button' value='edit' 
                onclick="editArticle(${titleOfArticle},${blogContent},${addArticleForm},${articleId});"><input type='button' value='delete' 
                onclick="removeArticle(${cont},${articleId});">
                </td></tr>`;        
    }
    
}

// function to delete an article from the database and the table
function removeArticle (cont,articleId) {
  referenceToArticles.child(articleId).remove();
  document.getElementById('articles-table').deleteRow(cont+1);
}

function editArticle (titleOfArticle,blogContent,addArticleForm,articleId) {
    var newArticleTitle = document.getElementById('blog-title').value;
    var newArticleContent = document.getElementById('blog-body').value;
    var dateAndTimeUpdated = `${new Date().getDate()}/${new Date().getMonth() + 1}` 
           + `/${new Date().getFullYear()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
    
    newArticleTitle = titleOfArticle;
    newArticleContent = blogContent;
    addArticleForm.addEventListener("submit",upDateArticleFunc);
    function upDateArticleFunc (e) {
        e.preventDefault();
        var articlesDatabase = firebase.database().ref('articles');
      
        upDateArticle(newArticleTitle,newArticleContent,dateAndTimeUpdated,articleId);
        addArticleForm.reset();
        alert(`The blog "${articleTitle}" has been created.`);
                    
        function upDateArticle (newArticleTitle,newArticleContent,dateAndTimeUpdated,articleId) {
            articlesDatabase.child(articleId).update({
                   Title:newArticleTitle,
                   blogContent:newArticleContent,
                   timeCreated:dateAndTimeUpdated   
                });
        }    
      
    } 
    }

    function submitFun(e) {
        e.preventDefault();
        var articlesDatabase = firebase.database().ref('articles');
        articlesDatabase.once('value', function (snapshot) {
            if (snapshot.exists()) {
                var articleTotalNum = snapshot.numChildren();
            }else {
                articleTotalNum = 0;
            }
            var articleTitle = document.getElementById('blog-title').value;
            var articleContent = document.getElementById('blog-body').value;
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