const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

const METHOD_NAME = 'response';
let key = '';
before(() => {
	key = getUuid(METHOD_NAME);
});


describe('API: site response', function() {
	this.timeout(10000);

	it('should return error for request without url', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('Bad URI');

				done();
			});
	});

	it('should return error for request with bad uri', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?uri=aaa`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('Bad URI');

				done();
			});
	});

	it('should return error for request with IP 127.0.0.1', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?uri=127.0.0.1`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('local IP');

				done();
			});
	});

	it('should return correct response for google.com', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?uri=google.com`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.error_message).to.not.exist;

				expect(res.body).to.include.all.keys(['status', 'check_time', 'response']);
				expect(res.body.response).to.have.all.keys(['code','code_msg', 'headers', 'redirects']);
				done();
			});
	});
});


after(() => {
	server.close();
});