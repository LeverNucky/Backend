
const helloUser = (req, res) => {
	res.send({hello:'world'})
}

module.exports = (app) => {
	app.get('/:user*?', helloUser)
}
