const md5=require('md5')
const cookieParser = require('cookie-parser')
const User = require('./model.js').User
const redis = require('redis').createClient("redis://h:p125633bd33922f578e4e6d43214c39ba86235a85da9e9dd110a84bd2de5fd2b5@ec2-34-206-56-122.compute-1.amazonaws.com:35589")

const cookieKey = 'sid'
const secretMessage = "Just some random strings haha"


const register=(req,res)=>{

    if (!req.body.username || !req.body.password){
        return res.status(400).send("Empty password or username is not allowed")
    }

    const username=req.body.username
    const password=req.body.password

    User.find({username:username}).exec(function(err, users){
        if (myuser.length!=0) {
            return res.status(401).send("Username already exists")         
        }
        const salt = new Date().getTime() + username
        const hash = md5(salt + password)
        const newUser = new models.User({username: username, salt:salt, hash:hash})
        newuUser.save()
        const newProfile=new model.Profile({
            username: username,
            headline: 'Welcome to Ricebook',
            following: [],
            email: req.body.email,
            zipcode: req.body.zipcode,
            dob: req.body.dob,
            avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg' })
        newProfile.save()
    })  
    res.status(200).send({result:'success', username:username})

}

const login=(req,res)=>{
    
    if (!req.body.username || !req.body.password){
        return res.status(400).send("Empty password or username is not allowed")
    }

    const username=req.body.username
    const password=req.body.password

    User.find({username:username}).exec(function(err,users) {
        if (users.length==0){
            return res.status(401).send("Username hasn't been registered")   
        }
        const newSalt=users[0].salt
        const newHash=md5(newSalt+password)
        if (newhash!=users[0].hash){
            return res.status(401).send("Incorrect password")        
        }
        else{
            const sid=md5(secretMessage + new Date().getTime() + username)
            redis.hmset(sid,users[0]);
            res.cookie(cookieKey,sid,{maxAge:3600*1000,httpOnly:true})  
        }
    })
    res.status(200).send({result:'success', username:username})
}

const logout=(req,res)=>{
    redis.del(req.cookies[cookieKey])
    res.clearCookie(cookieKey)
    res.status(200).send("OK")
}

const isLoggedIn = (req, res, next) => {

    const sid = req.cookies[cookieKey]
    if(!sid){
        return res.status(401)
    }
    else{
        redis.hgetall(sid, function(err, userObj){
            if(userObj){
                req.username=userObj.username
                next()
            }
            else{
                res.redirect('/login');
            }
        })
    }
}

const putPassword=(req,res)=>{

    const username = req.username
    const password = req.body.password
    User.find({username: username}).exec(function(err,users) {
        const salt=users[0].salt
        const hash=md5(salt+password)
        if (hash===users[0].hash){
            return res.status(401).send("New password is same as the old one")        
        }
        else{
            const newSalt = new Date().getTime() + username
            const newHash = md5(newSalt + password)
            User.update({username: username}, { $set: { salt: newSalt, hash: newHash }}, {}, function(err, user){
                res.status(200).send({username:username,status:'password changed'})
            })
        }
    }) 
}


module.exports=function(app){
    app.use(cookieParser())
    
    app.post('/register',register)
    app.post('/login',login)
    app.put('/password', putPassword)
    app.put('/logout', logout)
    
}
