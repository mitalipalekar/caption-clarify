const chai = require('chai');
const expect = chai.expect;
const Promise = require('bluebird');

const getMoodQuotes = require('../../src/routes/getMoodQuotes');

require('mocha-generators').install();

describe('getMoodQuotes function', function() {

	it ('should do what I want', function(done) {
		return new Promise(function(resolve, reject) {
			getMoodQuotes('Funny');
			resolve();
		}).then(function() {
			return new Promise(resolve, reject) {
				done();
			}
		}
		//done();
	})
});