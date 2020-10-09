
var articlesDatabase = firebase.database().ref('articles');
let addArticleForm = document.getElementById('article-form');
addArticleForm.addEventListener("submit",submitFun);
 

function submitFun(e) {
    e.preventDefault();
     

    var articleTitle = document.getElementById('blog-title').value;
    var  articleContent= document.getElementById('blog-body').value;
    var dateAndTimeCreated = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
    

    saveArticle(articleTitle,articleContent,dateAndTimeCreated);
     addArticleForm.reset();
    alert(`The blog ${articleTitle} has been created.`);
    
 }
 

 function saveArticle (articleTitle,articleContent,dateAndTimeCreated) {
     var newArticleDatabase = articlesDatabase.push();

     newArticleDatabase.set({
         Title:articleTitle,
         blogContent:articleContent,
         timeCreated:dateAndTimeCreated
         
     });
 }
