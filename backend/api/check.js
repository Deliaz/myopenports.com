const errMsg = require('./error');
const portscanner = require('portscanner');
const {performance} = require('perf_hooks');
const portNumbersDb = require('port-numbers');

const MIN_CHECK_TIME = 500;
const CHECK_TIMEOUT = 5000; // 5 sec

const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * Check single port status
 * @param req Request
 * @param res Response
 */
module.exports = function (req, res) {
    const portStr = req.query.port;
    const clientIp = req.ip;

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

    // Start timeout
    let timeoutFired = false;
    const timeout = setTimeout(() => {
        timeoutFired = true;
        res.status(408).json(errMsg('Check timeout'));
    }, CHECK_TIMEOUT);


    // Check port
    const startTs = performance.now();
    portscanner.checkPortStatus(portNumber, clientIp, {timeout: CHECK_TIMEOUT}, (err, status) => {
        clearTimeout(timeout);

        if (err) {
            console.error(err);
            res.status(400).json(errMsg('Unknown error'));
            return;
        }

        if (!timeoutFired) {
            const checkTime = performance.now() - startTs;

            setTimeout(() => {
                const response = {
                    status: 'ok',
                    port_status: Boolean(status === 'open'),
                    check_time: checkTime
                };

                const protocol = portNumbersDb.getService(portNumber);
                if (protocol && protocol.name) {
                    response.protocol = protocol.name;
                }

                res.json(response);
            }, MIN_CHECK_TIME);
        }
    });
};