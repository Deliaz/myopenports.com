const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const http = require('http');
const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

const METHOD_NAME = 'checkport';
let key = '';
before(() => {
	key = getUuid(METHOD_NAME);
});


describe('API: check port', () => {
	it('should return error for request without port', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('not provided');

				done();
			});
	});

	it('should return error for port out of range (lower bound)', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?port=0`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('of range');

				done();
			});

	});

	it('should return error for port out of range (upper bound)', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?port=65536`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(400);
				expect(res.body.error_message).to.include('of range');

				done();
			});
	});


	it('should not have error_message for correct request', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?port=1234`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal('ok');
				expect(res.body.error_message).to.not.exist;

				done();
			});
	});

	it('should report closed port', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}?port=8080`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.status).to.be.equal('ok');
				expect(res.body.port_status).to.be.false;

				done();
			});
	});

	it('should report open port', (done) => {
		const OPEN_PORT = 22441;

		const testPort = http.createServer((req) => {
			console.log(req.ip);
		}).listen(OPEN_PORT).on('listening', () => {

			// The port 3018 will be open, because the API uses it
			chai.request(server)
				.get(`/api/${METHOD_NAME}?port=${OPEN_PORT}`)
				.set('x-request-key', key)
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res).to.be.json;
					expect(res).to.have.status(200);
					expect(res.body.status).to.be.equal('ok');
					expect(res.body.port_status).to.true;

					testPort.close();
					done();
				});

		});
	});
});


after(() => {
	server.close();
});