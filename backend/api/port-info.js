const portNumbersDb = require('port-numbers');
const validatePort = require('../utils/validate-port');
const MIN_CHECK_TIME = 500;

/**
 * Returns information about port
 * @param req Request
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {
		const portStr = req.query.port;

		const portInfo = validatePort(portStr);
		if (!portInfo.valid) {
			reject({code: 400, reason: portInfo.reason});
			return;
		}
		const {portNumber} = portInfo;

		setTimeout(() => {
			const response = {
				port: portNumber,
				info: null
			};

			const protocolInfo = portNumbersDb.getService(portNumber);

			if (protocolInfo && protocolInfo.name) {
				response.info = protocolInfo;
			}

			resolve(response);
		}, MIN_CHECK_TIME);
	});
};