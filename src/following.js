const Profile= require('./model.js').Profile

const getFollowing = (req, res) => {
	const user = req.params.user ? req.params.user : req.username
	Profile.find({username:user}).exec(function(err,profiles){
        if(!profiles || profiles.length === 0){
            res.status(400).send("Invalid user")
        }
        else{
            res.status(200).send({username:user,following:profiles[0].following})
        }
    })
}

const addFollowing = (req, res) => {
	const user = req.username
    const following = req.params.user
    if(!following){
        res.status(400).send("missing the input following user")
        return
    }
    Profile.update({username:user}, {$addToSet:{following:following}}, {new:true}, function(err,tank){
        Profile.find({username:user}).exec(function(err, profiles){
        	res.status(200).send({username:user,following:profiles[0].following})
        })
    })
}

const removeFollowing = (req, res) => {
	const user = req.username
    const following = req.params.user
    if(!following){
        res.status(400).send("missing the input following user")
        return
    }
    Profile.update({username:user}, {$pull:{following:following}}, {new:true}, function(err,tank){
        Profile.find({username:user}).exec(function(err, profiles){
        	res.status(200).send({username:user,following:profiles[0].following})
        })
    })
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', addFollowing)
	app.delete('/following/:user', removeFollowing)
}