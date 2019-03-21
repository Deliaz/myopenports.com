const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

const METHOD_NAME = 'clientinfo';
let key = '';
before(() => {
	key = getUuid(METHOD_NAME);
});


describe('API: client info', () => {
	it('should return client info object', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.status).to.have.equal('ok');
				expect(res.body).to.include.keys(['ip', 'city', 'region', 'country']);

				done();
			});
	});
});


after(() => {
	server.close();
});