const errMsg = require('./error');
const {performance} = require('perf_hooks');
const geoip = require('geoip-lite');

/**
 * Return client info
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    // DEBUG
    const ip = '42.114.36.118';
    // const ip = req.ip;

    if (!ip) {
        errMsg('Cannot get info');
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
