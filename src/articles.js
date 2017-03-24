let articles = [
                {id: 1, author: "author1", text: "this is the first article"},
                {id: 2, author: "author2", text: "this is the second article"},
                {id: 3, author: "author3", text: "this is the third article"}
                ]


const helloUser = (req, res) => {
    const user = req.params.user || 'Somebody'
    res.send('Hello ' + user + '!')
}

const addArticle = (req, res) => {
    console.log('Payload received', req.body)
    let article = {id: articles.length + 1, 
                   author: req.body.author || 'Will', 
                   text:req.body.text } 
    articles.push(article) 
    res.send(article)
}

const getArticle = (req, res) => {
    if (req.params.id) {
        let article = articles.filter(it => it.id == req.params.id)
        res.send(article)
    } else {
        res.send(articles)
    }
}

module.exports = (app) => {
//  app.get('/:user*?', helloUser)
    app.post('/article', addArticle)
    app.get('/articles/:id*?', getArticle)
}




