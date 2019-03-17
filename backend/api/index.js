const getUuid = require('uuid-by-string');

const errMsg = require('./error');

const check = require('./check');
const clientInfo = require('./client-info');
const whois = require('./whois');
const scanner = require('./scanner');


module.exports = function (req, res) {
    const apiMethod = req.params.method;
    const requestKey = req.headers['x-request-key'] || null;

    const requestKeyGenerated = getUuid(apiMethod);

    if (!requestKey || requestKey !== requestKeyGenerated) {
        res.status(400).json(errMsg('Bad request key'));
        return;
    }

    switch (apiMethod) {
        case 'checkport':
            check(req, res);
            break;
        case 'clientinfo':
            clientInfo(req, res);
            break;
        case 'whois':
            whois(req, res);
            break;
        case 'scanner':
            scanner(req, res);
            break;
        default:
            res.status(404).json(errMsg('Method not found'));
            break;

    }
};