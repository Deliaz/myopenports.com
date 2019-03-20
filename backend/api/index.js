const getUuid = require('uuid-by-string');

const errMsg = require('./error');

const check = require('./check');
const clientInfo = require('./client-info');
const whois = require('./whois');
const scanner = require('./scanner');
const portInfo = require('./portinfo');
const siteResponse = require('./site-response');


module.exports = function (req, res) {
    const apiMethod = req.params.method;
    const requestKey = req.headers['x-request-key'] || null;

    const requestKeyGenerated = getUuid(apiMethod);

    if (!requestKey || requestKey !== requestKeyGenerated) {
        res.status(400).json(errMsg('Bad request key'));
        return;
    }

    switch (apiMethod) {
        case 'clientinfo':
            clientInfo(req, res);
            break;
        case 'checkport':
            check(req, res);
            break;
        case 'scanner':
            scanner(req, res);
            break;
        case 'whois':
            whois(req, res);
            break;
        case 'portinfo':
            portInfo(req, res);
            break;
        case 'response':
            siteResponse(req, res);
            break;
        default:
            res.status(404).json(errMsg('Method not found'));
            break;

    }
};