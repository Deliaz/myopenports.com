const portscanner = require('portscanner');
const {performance} = require('perf_hooks');
const portNumbersDb = require('port-numbers');
const validatePort = require('../utils/validate-port');
const logger = require('../logger');

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

		// DEBUG
		if (req.query.___ip) {
			clientIp = req.query.___ip;
		}

		if (process.env.NODE_ENV === 'test') {
			// https://stackoverflow.com/questions/29411551/express-js-req-ip-is-returning-ffff127-0-0-1
			clientIp = clientIp.replace('::ffff:', '');
		}

		const portInfo = validatePort(portStr);
		if (!portInfo.valid) {
			reject({code: 400, reason: portInfo.reason});
			return;
		}
		const {portNumber} = portInfo;
		const startTs = performance.now();

		// Start timeout
		let timeoutFired = false;
		const timeout = setTimeout(() => {
			timeoutFired = true;
			logger.debug(`Check Port Timeout. Port ${portNumber}.`);
			const payload = getResponseObject({status: 'closed', startTs, portNumber});
			resolve(payload);
		}, CHECK_TIMEOUT);

		// Check port
		portscanner.checkPortStatus(portNumber, clientIp, {timeout: CHECK_TIMEOUT}, (err, status) => {
			clearTimeout(timeout);

			if (err) {
				logger.error(err);
				reject({code: 400, reason: 'Unknown error'});
				return;
			}

			if (!timeoutFired) {
				setTimeout(() => {
					const payload = getResponseObject({status, startTs, portNumber});
					resolve(payload);
				}, MIN_CHECK_TIME);
			}
		});
	});
};

/**
 * Return response object
 * @param status {String} "open" | "closed"
 * @param startTs {Number} performance.now() for check beginning
 * @param portNumber {Number} Port Number
 * @returns {{port_status: boolean, check_time: number}}
 */
function getResponseObject({status, startTs = 0, portNumber}) {
	const checkTime = performance.now() - startTs;
	const payload = {
		port_status: Boolean(status === 'open'),
		check_time: checkTime
	};

	const protocol = portNumbersDb.getService(portNumber);
	if (protocol && protocol.name) {
		payload.protocol = protocol.name;
	}

	return payload;
}