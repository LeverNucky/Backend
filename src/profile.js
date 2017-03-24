const getHeadLines = (req, res) => {
	res.send({ headlines: [{
		username:'me',
		headline: 'Headline'
	}]})
}

const putHeadLines = (req, res) => {
	res.send({
		username:'me',
		headline: req.body.headline
	})
}

const getEmail  = (req, res) => {
	res.send({
		username:'me',
		email: 'qw13@rice.edu'
	})
}

const putEmail = (req, res) => {
	res.send({
		username:'me',
		email: req.body.email
	})
}

const getZipcode = (req, res) => {
	res.send({
		username:'me',
		zipcode: '77005'
	})
}

const putZipcode = (req, res) => {
	res.send({
		username:'me',
		zipcode: req.body.zipcode
	})
}

const getAvatar = (req, res) => {
	res.send({ avatars: [{
		username:'me',
		avatar: 'avatar'
	}]})
}

const putAvatar = (req, res) => {
	res.send({
		username:'me',
		avatar: req.body.avatar 
	})
}

module.exports = app => {
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)
    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)
    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar',putAvatar)
}