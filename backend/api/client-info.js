const errMsg = require('./error');
const {performance} = require('perf_hooks');
const geoip = require('geoip-lite');

/**
 * Return client info
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    let ip = null;
    if (process.env.NODE_ENV === 'development') {
        ip = '8.8.8.8';
    } else {
        ip = req.ip;
    }

    if (!ip) {
        res.status(500).json(errMsg('Cannot get info'));
        return;
    }

    const geo = geoip.lookup(ip);
    const {city, region, country} = geo;
    res.json({
        status: 'ok',
        ip,
        city,
        region,
        country
    });
};
