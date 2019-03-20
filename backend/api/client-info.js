const geoip = require('geoip-lite');

/**
 * Returns client info
 * @param req Request
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {
		let ip = null;

		if (process.env.NODE_ENV === 'development') {
			ip = '8.8.8.8';
		} else {
			ip = req.ip;
		}

		if (!ip) {
			reject({code: 500, reason: 'Bad IP address'});
			return;
		}

		const geo = geoip.lookup(ip);
		const {city, region, country} = geo;

		resolve({
			ip,
			city,
			region,
			country
		});
	});
};
