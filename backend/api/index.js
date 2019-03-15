const getUuid = require('uuid-by-string');

const checkPort = require('./check-port');
const clientInfo = require('./client-info');
const errMsg = require('./error');

module.exports = function (req, res) {
    const apiMethod = req.params.method;
    const requestKey = req.headers['x-request-key'] || null;

    const requestKeyGenerated = getUuid(apiMethod);

    if(!requestKey || requestKey !== requestKeyGenerated) {
        res.status(400).json(errMsg('Bad request key'));
        return;
    }

    // TODO Refuse local IP in prod mode

    switch (apiMethod) {
        case 'checkport':
            checkPort(req, res);
            break;
        case 'clientinfo':
            clientInfo(req, res);
            break;
        default:
            res.status(404).json(errMsg('Method not found'));
            break;

    }
};