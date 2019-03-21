const geoip = require('geoip-lite');

/**
 * Returns client info
 * @param req Request
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {
		let ip = null;

		console.log(`"${process.env.NODE_ENV}"`, req.ip);
		if (process.env.NODE_ENV !== 'production') {
			ip = '8.8.8.8';
		} else {
			ip = req.ip;
		}

		const geo = geoip.lookup(ip) || {};
		const {city, region, country} = geo;

		if (!geo) {
			reject({code: 500, reason: 'Cannot get info'});
			return;
		}

		resolve({
			ip,
			city,
			region,
			country
		});
	});
};
