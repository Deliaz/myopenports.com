const request = require('request');
const {performance} = require('perf_hooks');
const isLocalIp = require('is-local-ip');
const isIp = require('is-ip');
const {isWebUri} = require('valid-url');

/**
 * Returns response headers
 * @param req Request
 * // TODO Support different User-Agents
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {
		const uri = req.query.uri;

		if (!uri) {
			reject({code: 400, reason: 'Bad URI'});
			return;
		}

		if (!isIp(uri) && !isWebUri(uri)) {
			reject({code: 400, reason: 'Bad URI'});
			return;
		}

		if (isLocalIp(uri) || uri.toLowerCase() === 'localhost') {
			reject({code: 400, reason: 'Cannot check local IP'});
			return;
		}

		const startTs = performance.now();
		request(uri, {method: 'HEAD'}, function (err, siteResponse) {
			if (err || !siteResponse) {
				if (err && err.code === 'ENOTFOUND') {
					reject({
						code: 500,
						reason: 'Not Found',
						details: {
							code_name: 'not_found'
						}
					});
				} else {
					console.error(err);
					reject({code: 500, reason: 'Request error'});
				}
			} else {
				const result = {
					status: 'ok',
					check_time: performance.now() - startTs,
					response: {
						headers: siteResponse.headers,
						code: siteResponse.statusCode,
						code_msg: siteResponse.statusMessage,
						redirects: []
					}
				};
				if (siteResponse.request && siteResponse.request._redirect && siteResponse.request._redirect.redirects) {
					result.response.redirects = siteResponse.request._redirect.redirects;
				}
				resolve(result);
			}

		});
	});
};
