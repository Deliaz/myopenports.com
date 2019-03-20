const {performance} = require('perf_hooks');
const isValidDomain = require('is-valid-domain');
const whois = require('whois');

/**
 * Return WHOIS for Domain or IP
 * @param req Request
 */
module.exports = function (req) {
    return new Promise((resolve, reject) => {
        const domain = req.query.domain;

        if (!domain || !isValidDomain) {
            reject({code: 400, reason: 'Bad domain'});
            return;
        }

        const startTs = performance.now();
        whois.lookup(domain, (err, data) => {
            if (err) {
                console.error(err);
                reject({code: 500, reason: 'Lookup error'});
            } else {
                resolve({
                    check_time: performance.now() - startTs,
                    whois_response: data
                });
            }
        });
    });
};
