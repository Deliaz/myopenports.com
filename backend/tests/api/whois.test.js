const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

const METHOD_NAME = 'whois';
let key = '';
before(() => {
	key = getUuid(METHOD_NAME);
});


describe('API: whois', function() {
	this.timeout(4000);

	it('should return error for request without domain', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('Bad domain');

				done();
			});
	});

	it('should return error for request with bad domain', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?domain=aaa`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('Bad domain');

				done();
			});
	});

	it('should return information for correct domain', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?domain=example.com`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.error_message).to.not.exist;
				expect(res.body.whois_response).to.be.a('string');

				done();
			});
	});
});


after(() => {
	server.close();
});