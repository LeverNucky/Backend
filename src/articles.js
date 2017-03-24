const articles = { articles: [ 
          { id:1, author: 'Scott', body:'Post 1' },
          { id:2, author: 'Max', body:'Post 2' },
          { id:3, author: 'Joe', body:'Post 3' }
]};


const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     const newArticle = {
          author: req.body.author,
          body: req.body.body,
          id: articles.articles.length+1
     }  
     articles.articles.push(newArticle)
     res.send({articles:[newArticle]})
}

const getArticle= (req,res)=>{
     const id = req.params.id
     if(!id){
          res.send(articles)
     }else{
          res.send({articles: articles.articles.filter(x=>(x.id==id))})
     }
}


module.exports = (app) => {
     app.post('/article', addArticle)
     app.get('/articles/:id*?', getArticle)
}