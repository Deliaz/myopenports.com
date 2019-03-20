const errMsg = require('./error');
const request = require('request');
const {performance} = require('perf_hooks');
const isLocalIp = require('is-local-ip');
const isIp = require('is-ip');
const {isWebUri} = require('valid-url');

/**
 * Returns headers for a URI
 * @param req Request
 * @param res Response
 *
 * // TODO Support different User-Agents
 */
module.exports = function (req, res) {
    const uri = req.query.uri;

    if (!uri) {
        res.status(400).json(errMsg('Bad URI'));
        return;
    }

    if(!isIp(uri) && !isWebUri(uri)) {
        res.status(400).json(errMsg('Bad URI'));
        return;
    }

    if (isLocalIp(uri) || uri.toLowerCase() === 'localhost') {
        res.status(400).json(errMsg('Cannot check local IP'));
        return;
    }

    const startTs = performance.now();
    request(uri, {method: 'HEAD'}, function (err, siteResponse) {
        if (err || !siteResponse) {
            if (err && err.code === 'ENOTFOUND') {
                res.status(500).json(errMsg('Not Found', {code: 'not_found'}));
            } else {
                console.error(err);
                res.status(500).json(errMsg('Request error'));
            }
        } else {
            const result = {
                status: 'ok',
                check_time: performance.now() - startTs,
                response: {
                    headers: siteResponse.headers,
                    code: siteResponse.statusCode,
                    code_msg: siteResponse.statusMessage,
                    redirects: []
                }
            };
            if (siteResponse.request && siteResponse.request._redirect && siteResponse.request._redirect.redirects) {
                result.response.redirects = siteResponse.request._redirect.redirects;
            }
            res.json(result);
        }

    });
};
