
let articleId = localStorage.getItem('currentArticle')
let httpVal =  'https://hervebu.herokuapp.com/articles/' + articleId
fetch(
   httpVal,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*',
      }
    }
  ).then(res => res.json())
  .then(article => {
      
     let backgroundImg = `${article['requested article'].coverImgUrl}`
      document.getElementById('background').style.background = `url('${backgroundImg}')`
      document.getElementById('background').style.backgroundSize = 'cover'
      let articleParagraph = document.getElementById('article-par')
      articleParagraph.innerHTML += `<h2 id="article-title">${article['requested article'].title}</h2>
      <p id="article-body">
      Created on: ${article['requested article'].date}<br><br>
      ${article['requested article'].body}</p>`
  })
  .catch(err => console.log(err))
 