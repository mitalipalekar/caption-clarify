const chai = require('chai');
const expect = chai.expect;
const supertest = require('co-supertest');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const koa = require('koa');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');

require('mocha-generators').install();

describe('getCaption function', function() {

	let stubs = {};

	stubs['./getMoodQuotes'] = function*() {
		this.body = 'ok';
	}

	const getCaption = proxyquire('../../src/routes/getCaption', stubs);

	let app = koa();

	app.use(bodyParser());
	app.use(route.post('/captioner/caption', getCaption));
	let agent;

	beforeEach(function() {
		agent = supertest.agent(app.listen());
	})

	it ('should do what I want', function(done) {
		agent.post('/captioner/caption')
			.set('Content-Type', 'application/json')
			.query({
				mood: 'happy',
				imageURL: 'http://cdn.skim.gs/image/upload/v1456344012/msi/Puppy_2_kbhb4a.jpg'
				//imageLocal: '/Users/christinewolf/Documents/DubHacks2016/caption-clarify/insta-captioner/src/routes/happy.jpg'
			})
			.expect(200)
			.end(done);

	})
});