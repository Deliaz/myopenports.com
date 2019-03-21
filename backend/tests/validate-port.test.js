const {expect} = require('chai');

const validatePort = require('../utils/validate-port');

describe('validatePort', () => {
	it('should return valid status for suitable port', () => {
		// As string
		expect(validatePort('80')).to.be.deep.equal({
			valid: true,
			portNumber: 80
		});

		// As number
		expect(validatePort(8080)).to.be.deep.equal({
			portNumber: 8080,
			valid: true
		});

		expect(validatePort(8080)).to.not.have.property('reason');
	});

	it('should fail validation for wrong port number', () => {
		expect(validatePort(0)).to.have.property('valid', false);
		expect(validatePort(0).reason).to.be.a('string');

		expect(validatePort(65536)).to.have.property('valid', false);
		expect(validatePort(65536).reason).to.be.a('string');

		expect(validatePort('abc')).to.have.property('valid', false);
		expect(validatePort('abc').reason).to.be.a('string');
	});
});