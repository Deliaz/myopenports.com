const errMsg = require('./error');
const portNumbersDb = require('port-numbers');

const MIN_CHECK_TIME = 500;

const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * Check single port status
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    const portStr = req.query.port;

    if (!portStr) {
        res.status(400).json(errMsg('Port not specified'));
        return;
    }

    if (isNaN(portStr)) {
        res.status(400).json(errMsg('Bad port format'));
        return;
    }

    const portNumber = parseInt(portStr);
    if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
        res.status(400).json(errMsg('Bad port format'));
        return;
    }

    setTimeout(() => {
        const response = {
            status: 'ok',
            port: portNumber,
            info: null
        };

        const protocolInfo = portNumbersDb.getService(portNumber);

        if (protocolInfo && protocolInfo.name) {
            response.info = protocolInfo;
        }

        res.json(response);
    }, MIN_CHECK_TIME);
};