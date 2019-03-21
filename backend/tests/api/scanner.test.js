const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

const METHOD_NAME = 'scanner';
let key = '';
before(() => {
	key = getUuid(METHOD_NAME);
});


describe('API: scanner', function() {
	this.timeout(5000); // Because scanner runs at least 3 sec

	it('should return correct response with results', (done) => {
		chai.request(server)
			.get(`/api/${METHOD_NAME}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.be.json;
				expect(res).to.have.status(200);
				expect(res.body.error_message).to.not.exist;
				expect(res.body.status).to.be.equal('ok');

				expect(res.body).to.include.all.keys(['scan_results', 'check_time']);
				expect(res.body.scan_results).to.be.an('object');
				done();
			});
	});
});


after(() => {
	server.close();
});