const errMsg = require('./error');
const {performance} = require('perf_hooks');
const isValidDomain = require('is-valid-domain');
const whois = require('whois');

/**
 * Return client info
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    const domain = req.query.domain;

    if (!domain || !isValidDomain) {
        res.status(400).json(errMsg('Bad domain'));
        return;
    }

    const startTs = performance.now();
    whois.lookup(domain, (err, data) => {
        if(err) {
            console.error(err);
            res.status(500).json(errMsg('Lookup error'));
        } else {
            res.json({
                status: 'ok',
                check_time: performance.now() - startTs,
                whois_response: data
            });
        }
    });
};
