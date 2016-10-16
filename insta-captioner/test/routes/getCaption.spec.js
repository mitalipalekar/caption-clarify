const chai = require('chai');
const expect = chai.expect;
const supertest = require('co-supertest');
const koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const getCaption = require('../../src/routes/getCaption');

require('mocha-generators').install();

describe('getCaption function', function() {

	let app = koa();

	app.use(bodyParser());
	app.use(route.post('/captioner/caption', getCaption));
	let agent;

	beforeEach(function() {
		agent = supertest.agent(app.listen());
	})

	it ('should do what I want', function*() {
		yield agent.post('/captioner/caption')
			.set('Content-Type', 'application/json')
			.send({
				mood: 'happy',
				imageURL: 'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg'
			})
			.expect(200)
			.end();
	})
});