const articles = {
    articles:[
        "1":{id : 1, author: 'Scott', text: "This is my first article"},
        "2":{id : 2, author: 'Vivid', text: "This is Vivid's article"},
        "3":{id : 3, author: 'Max', text: "This is Max,s article"}
    ],
    curId: 4
}


const postArticle = (req, res) =>{
    var id = articles.curId
    articles.curId++
    var newArticle = {id, author: req.body.author,text: req.body.text}
    articles.articles[newArticle.id] = newArticle
    res.send(newArticle)

}

const getArticle = (req, res)=>{
    if (req.params.id){
        res.send(articles.articles[req.params.id])
    }
    else{
        res.send(articles)
    }
}


module.exports = (app) =>{
    app.get('/articles/:id?', getArticle)
    app.post('/article', postArticle)
}