const portscanner = require('portscanner');
const {performance} = require('perf_hooks');
const portNumbersDb = require('port-numbers');
const validatePort = require('../utils/validate-port');

const MIN_CHECK_TIME = 500;
const CHECK_TIMEOUT = 5000; // 5 sec

/**
 * Check single port status
 * @param req Request
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {
		const portStr = req.query.port;
		let clientIp = req.ip;

		if(process.env.NODE_ENV === 'test') {
			// https://stackoverflow.com/questions/29411551/express-js-req-ip-is-returning-ffff127-0-0-1
			clientIp = clientIp.replace('::ffff:', '');
		}

		const portInfo = validatePort(portStr);
		if (!portInfo.valid) {
			reject({code: 400, reason: portInfo.reason});
			return;
		}
		const {portNumber} = portInfo;

		// Start timeout
		let timeoutFired = false;
		const timeout = setTimeout(() => {
			timeoutFired = true;
			reject({code: 408, reason: 'Check timeout'});
		}, CHECK_TIMEOUT);

		// Check port
		const startTs = performance.now();
		portscanner.checkPortStatus(portNumber, clientIp, {timeout: CHECK_TIMEOUT}, (err, status) => {
			clearTimeout(timeout);

			if (err) {
				console.error(err);
				reject({code: 400, reason: 'Unknown error'});
				return;
			}

			if (!timeoutFired) {
				const checkTime = performance.now() - startTs;

				setTimeout(() => {
					const payload = {
						port_status: Boolean(status === 'open'),
						check_time: checkTime
					};

					const protocol = portNumbersDb.getService(portNumber);
					if (protocol && protocol.name) {
						payload.protocol = protocol.name;
					}

					resolve(payload);
				}, MIN_CHECK_TIME);
			}
		});
	});
};