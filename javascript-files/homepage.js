  
fetch(
    'https://hervebu.herokuapp.com/articles',
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json, */*',

      }
    }
  ).then(res => res.json())
  .then(articles => {
    let blogDiv = document.getElementById('article-boxes')  
    if(articles.data.lenth <= 3) {
        blogDiv.style.height = '433.33px'
    } else if (articles.data.lenth > 3 && articles.data.lenth <= 6) {
        blogDiv.style.height = '866.66px'
    }else if (articles.data.lenth > 6 && articles.data.lenth <= 9) {
        blogDiv.style.height = '1300px'
    }
        
        for(let count = 0; count <= 3; count ++) {
            blogDiv.innerHTML += `<div class="blog-box" onclick="viewArticle('${articles.data[count]._id}')">
            <img src="${articles.data[count].coverImgUrl}" class="blog-box-img" alt="${articles.data[count].title}">
            <span class="blog-title blog-title-1"><strong>${articles.data[count].title}</strong></span>
            </div>`
      }
    
  })
  .catch(err => console.log(err))

let viewArticle = (val) => {
    localStorage.setItem('currentArticle', val)
    window.location.assign('../Ui-templates/single-article.html')
}
