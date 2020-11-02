
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
            'Accept': 'application/json, */*',
            'auth_token': token1
          }
        }
      ).then(res => res.json())
      .then(articles => {
        for (let count = 0; count < articles.data.length; count++){ 
            let titleOfArticle = articles.data[count].title
            let blogContent = articles.data[count].body
            
            
            let articlesTable = document.getElementById('articles-table');
            articlesTable.innerHTML += `<tr><td>${articles.data[count].title}</td>
            <td>${articles.data[count].date}</td><td><input type='button' value='edit'`
                +` onclick="editArticle('${titleOfArticle}','${blogContent}','${articles.data[count]._id}')"><input
                    type='button' value='delete' onclick="removeArticle('${count}','${articles.data[count]._id}');">
                    </td></tr>`;  

            
                 
        }
        
      })
      .catch(err => {
            alert('An error occurred while retrieving articles.')
            console.log(err)
        })
 


// function to delete an article from the database and the table
const removeArticle = (count,id) => {
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


function editArticle (titleOfArticle,blogContent,id) {
    let newArticleTitle = document.getElementById('blog-title')
    let newArticleContent = document.getElementById('blog-body')
    let httpVal = 'https://hervebu.herokuapp.com/articles/' + id

    newArticleTitle.value = titleOfArticle;
    newArticleContent.value = blogContent;
    
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
            coverImgUrl: password.value
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

    }

    document.getElementById('logout-btn').addEventListener('click',logoutFun);

    function logoutFun() {
        localStorage.removeItem('token')
        localStorage.removeItem('currentVal')
         window.location.replace("login.html")  
    }
  }    
