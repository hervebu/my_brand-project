
const token1 = localStorage.getItem('token')
if (!token1) {
    alert('You have to login to continue')
    window.location.assign('../Ui-templates/login.html')
  } else {
    var addArticleForm = document.getElementById('article-form');  
    var addArticleBtn = document.getElementById('add-blog');
    addArticleBtn.addEventListener("click",submitFun);
    
     function submitFun(e) {
        e.preventDefault()
        let articleTitle = document.getElementById('blog-title').value
        let articleBody= tinymce.get("blog-body").getContent();
        let imgUrl = document.getElementById('coverImageFile').value
        fetch(
            'https://hervebu.herokuapp.com/articles/new',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, */*',
                    'Content-type': 'application/json',
                    'auth_token': token1
                },
                body:JSON.stringify({
                    title: articleTitle,
                    body: articleBody,
                    coverImgUrl: imgUrl
                })
            }
        ).then(res => res.json())
        .then(data => {
            alert(data.message)
            addArticleForm.reset()
        }).catch(err => console.log(err))
    
    }
    
    document.getElementById('logout-btn').addEventListener('click',logoutFun);
    
    function logoutFun() {
        localStorage.removeItem('token')
        localStorage.removeItem('currentVal')
         window.location.replace("login.html")  
    }
  }    
