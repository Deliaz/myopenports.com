const {expect} = require('chai');

const errMsg = require('../responses/error');

describe('errMsg', () => {
	it('should return error object with message', () => {
		const err = errMsg('test_error');

		expect(err).to.be.an('object');
		expect(err).to.have.property('status', 'error');
		expect(err).to.have.property('ts').which.is.a('number');
		expect(err).to.have.property('error_message', 'test_error');
	});

	it('should return error object with unknown error without errMsg', () => {
		const err = errMsg();
		expect(err).to.have.property('error_message', 'unknown');
	});

	it('should pass additional details', () => {
		const err = errMsg('test_error', {code: 123});
		expect(err).to.have.property('code', 123);
	});
});