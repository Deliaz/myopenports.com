const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const getUuid = require('uuid-by-string');
const {server} = require('../../app');

const expect = chai.expect;

describe('API: common code', () => {
	it('should return 400 without key', (done) => {
		chai.request(server)
			.get('/api/checkport?port=80')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(400);
				expect(res).to.be.json;

				done();
			});
	});

	it('should return 404 for not existing method but with key', (done) => {
		const methodName = 'not_exist_method';
		const key = getUuid(methodName);

		chai.request(server)
			.get(`/api/${methodName}`)
			.set('x-request-key', key)
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(404);
				expect(res.body.error_message).to.include('not found');

				done();
			});
	});

	it('should return index.html file', (done) => {
		chai.request(server)
			.get('/')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.text).to.be.a('string');
				expect(res.text).to.include('</html>');

				done();
			});
	});


	it('should return index.html for unknown page', (done) => {
		chai.request(server)
			.get('/not_exist_page')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res.text).to.be.a('string');
				expect(res).to.be.html;
				expect(res.text).to.include('</html>');

				done();
			});
	});
});


after(() => {
	server.close();
});