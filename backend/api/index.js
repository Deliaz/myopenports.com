const getUuid = require('uuid-by-string');

const errMsg = require('../responses/error');

const check = require('./check');
const clientInfo = require('./client-info');
const whois = require('./whois');
const scanner = require('./scanner');
const portInfo = require('./port-info');
const siteResponse = require('./site-response');


module.exports = function (req, res) {
    const apiMethod = req.params.method;
    const requestKey = req.headers['x-request-key'] || null;

    const requestKeyGenerated = getUuid(apiMethod);

    if (!requestKey || requestKey !== requestKeyGenerated) {
        res.status(400).json(errMsg('Bad request key'));
        return;
    }

    // TODO Global timer
    processRequest(apiMethod, req)
        .then(result => {
            res.json({
                status: 'ok',
                ...result
            });
        })
        .catch(rejection => {

            // Unspecified error
            if (!rejection || !rejection.code || !rejection.reason) {
                console.error(rejection);
                res.status(500).json(errMsg('Unknown error'));
            }

            // Specified error
            res.status(rejection.code).send(errMsg(rejection.reason, rejection.details));
        });
};

/**
 * Process requested method
 * @param methodName {String}
 * @param req {Object} Request
 * @returns {Promise}
 */
function processRequest(methodName, req) {
    switch (methodName) {
        case 'clientinfo':
            return clientInfo(req);
        case 'checkport':
            return check(req);
        case 'scanner':
            return scanner(req);
        case 'whois':
            return whois(req);
        case 'portinfo':
            return portInfo(req);
        case 'response':
            return siteResponse(req);
        default:
            return Promise.reject({
                code: 404,
                reason: 'Method not found'
            });

    }
}