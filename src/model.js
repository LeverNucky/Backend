const mongoose = require('mongoose')

const userSchema=new mongoose.Schema( {
    username: String,
    salt: String,
    hash: String    
})

const profileSchema=new mongoose.Schema( {
    username: String,
    headline: String,
    following: [ String ],
    email: String,
    dob: Date,
    zipcode: String,
    avatar: String    
})

const articleSchema=new mongoose.Schema( {
    author: String,
    text: String,
    date: Date,
    img: String, 
    comments: [{
        commentId: Number,
        author: String,
        text: String,
        date: Date
    }]
})

exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
exports.Article = mongoose.model('articles', articleSchema)