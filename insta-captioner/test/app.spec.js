const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const supertest = require('co-supertest');

require('mocha-generators').install();

describe('app function', function() {
	let agent;

	let stubs = {};

	stubs['./routes/getCaption'] = function*() {
		this.body = 'ok';
	}

	let app = proxyquire('../src/app', stubs);

	beforeEach(function() {
		agent = supertest.agent(app.listen());
	});

	it('calls getCaption when sent a post requirest with the path /captioner/caption', function*() {
		const result = yield agent.post('/captioner/caption')
									.expect(200)
									.end();
	})
})