
const token1 = localStorage.getItem('token')
if (!token1) {
    alert('You have to login to continue')
    window.location.assign('../Ui-templates/login.html')
} else {
   
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
      .then(articles => {
        for (let count = 0; count < articles.data.length; count++){         
            
            let articlesTable = document.getElementById('articles-table');
            articlesTable.innerHTML += `<tr><td>${articles.data[count].title}</td>
            <td>${articles.data[count].date}</td><td><input type='button' value='edit'`
                +` onclick="editArticle('${articles.data[count]._id}')"><input
                    type='button' value='delete' onclick="removeArticle('${count}','${articles.data[count]._id}');">
                    </td></tr>`;                  
        }
        
      })
      .catch(err => {
            alert('An error occurred while retrieving articles.')
            console.log(err)
        })
 
    // function to delete an article from the database and the table
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
        .then(display => {
        document.getElementById('articles-table').deleteRow(count+1)
        })
        .catch(err => {
        alert('Unable to delete the  article')
        console.log(err)})       
    }

    let newArticleTitle = document.getElementById('blog-title')
        let newArticleContent = document.getElementById('blog-body')
        let coverImage = document.getElementById('coverImageFile')


    //Function for setting values in edit article form    
    function editArticle (id) {
        
        let httpVal = 'https://hervebu.herokuapp.com/articles/' + id
        if (localStorage.getItem('currentArticle')) {
            localStorage.removeItem('currentArticle')
            localStorage.setItem('currentArticle', httpVal)    
        } else {
            localStorage.setItem('currentArticle', httpVal)
        }
        
        fetch(
            httpVal,
            {
            method: 'GET',
            headers: {
                'Accept': 'application/json, */*'
            }
            }
        ).then(res => res.json())
        .then(article => {

            newArticleTitle.value = article['requested article'].title
            newArticleContent.value = article['requested article'].body
            coverImage.value = article['requested article'].coverImgUrl
        }).catch(err => {
            console.log(err)
            alert('Something happened trying to get the article to edit')
        })
    }  

    //Function for updating an article
    document.getElementById('article-form').addEventListener('submit', (e) => {    
        e.preventDefault()
        let httpVal = localStorage.getItem('currentArticle')
        fetch(httpVal,
            {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, */*',
                'content-type': 'application/json',
                'auth_token': token1
            },
            body: JSON.stringify({
                title: newArticleTitle.value,
                body: newArticleContent.value,
                coverImgUrl: coverImage.value
            })
            }
        ).then(res => res.json())
        .then(response => {
            alert(response.message)
            document.getElementById('article-form').reset()
        }).catch(err => {
            console.log(err)
            alert('Unable to update your user information, something went wrong.') 
        })
    })
       
//Function to logout a user
    document.getElementById('logout-btn').addEventListener('click',logoutFun);

        function logoutFun() {
            localStorage.removeItem('token')
            localStorage.removeItem('currentVal')
            window.location.replace("login.html")  
        }
}    
