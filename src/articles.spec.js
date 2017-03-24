/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			console.log(body)
			expect(body.articles.length).to.at.least(3)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		let pre
		fetch(url("/article"),{
			method: 'POST',
		    headers: {'Content-Type':'application/json'},
		    body: JSON.stringify({'text': '123'})
		})
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			
			expect(body.id).to.exist
			expect(body.text).to.eql('123')
			pre=body.id
		})
		.then(()=>{
			return fetch(url("/article"),{
				method: 'POST',
			    headers: {'Content-Type':'application/json'},
			    body: JSON.stringify({'text': '456'})
		    })}
		    )
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			console.log(body)
			expect(body.id).to.eql(pre+1)
			expect(body.text).to.eql('456')
		})
		.then(done)
	    .catch(done)

 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		let ran,firstcall
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			console.log(body)
			ran=Math.floor(Math.random()*body.length+1)
			firstcall=body.articles.filter((e)=>{
    		if (e.id==ran) return true
    			else return false
    	    })
		})
        .then(()=>{
			return fetch(url(`/articles/${ran}`))}
		    )
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json()
		})
		.then(body => {
			
			expect(body.articles).deep.eql(firstcall)
		})
		.then(done)
	    .catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(body).to.eql([])
		})
		.catch((e)=>{
	      expect(e).to.exist
	    })
		.then(done)
	}, 200)

});