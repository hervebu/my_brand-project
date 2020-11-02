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
    let blogDiv = document.getElementById('blogs')  
    if(articles.data.lenth <= 3) {
        blogDiv.style.height = '433.33px'
    } else if (articles.data.lenth > 3 && articles.data.lenth <= 6) {
        blogDiv.style.height = '866.66px'
    }else if (articles.data.lenth > 6 && articles.data.lenth <= 9) {
        blogDiv.style.height = '1300px'
    }
        
        for(let count = 0; count <= articles.data.length; count ++) {
            blogDiv.innerHTML += `<div class="blog-box blog-box-1" onclick="viewArticle('${articles.data[count]._id}')">
            <img src="${articles.data[count].coverImgUrl}" class="blog-box-img" alt="">
            <span class="blog-title blog-title-1"><strong>${articles.data[count].title}</strong></span>
            </div>`
      }
    
  })
  .catch(err => console.log(err))

let viewArticle = (val) => {
    localStorage.setItem('currentArticle', val)
    window.location.assign('../Ui-templates/single-article.html')
}
