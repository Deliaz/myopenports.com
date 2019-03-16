const errMsg = require('./error');
const {performance} = require('perf_hooks');
const whois = require('whois');

/**
 * Return client info
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    const domain = req.query.domain;

    // TODO Validate domain

    if (!domain) {
        errMsg('Bad domain');
        return;
    }

    // TODO Timeout
    const startTs = performance.now();
    whois.lookup(domain, (err, data) => {
        if(err) {
            // TODO err
            console.error(err);
        }
        res.json({
            status: 'ok',
            check_time: performance.now() - startTs,
            whois_response: data
        });
    });
};
