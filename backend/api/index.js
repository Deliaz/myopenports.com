const getUuid = require('uuid-by-string');

const errMsg = require('./error');

const checkPort = require('./check-port');
const clientInfo = require('./client-info');
const whois = require('./whois');

module.exports = function (req, res) {
    const apiMethod = req.params.method;
    const requestKey = req.headers['x-request-key'] || null;

    const requestKeyGenerated = getUuid(apiMethod);

    if(!requestKey || requestKey !== requestKeyGenerated) {
        res.status(400).json(errMsg('Bad request key'));
        return;
    }

    switch (apiMethod) {
        case 'checkport':
            checkPort(req, res);
            break;
        case 'clientinfo':
            clientInfo(req, res);
            break;
        case 'whois':
            whois(req, res);
            break;
        default:
            res.status(404).json(errMsg('Method not found'));
            break;

    }
};