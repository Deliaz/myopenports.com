const errMsg = require('./error');
const portscanner = require('portscanner');
const {performance} = require('perf_hooks');

const MIN_CHECK_TIME = 500;
const CHECK_TIMEOUT = 5000; // 5 sec

const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * Check single port status
 * @param req Request
 * @param res Response
 * @param clientIp {String} Client IP
 */
module.exports = function (req, res, clientIp) {
    console.log(req.query);
    const port = req.query.port;

    if (!port) {
        res.status(400).json(errMsg('Port not specified'));
        return;
    }

    if (isNaN(port)) {
        res.status(400).json(errMsg('Bad port format'));
        return;
    }

    const portNumber = parseInt(port);
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
    portscanner.checkPortStatus(portNumber, clientIp, (err, status) => {
        clearTimeout(timeout);

        if (err) {
            console.error(err);
            res.status(400).json(errMsg('Unknown error'));
            return;
        }

        if (!timeoutFired) {
            const checkTime = performance.now() - startTs;

            setTimeout(() => {
                res.json({
                    status: 'ok',
                    port_status: status,
                    check_time: checkTime
                });
            }, MIN_CHECK_TIME);
        }
    });
};