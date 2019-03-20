const MIN_PORT = 1;
const MAX_PORT = 65535;

module.exports = function(portStr) {
    if (!portStr) {
        return {
            valid: false,
            reason: 'Port not provided',
        }
    }

    if (isNaN(portStr)) {
        return {
            valid: false,
            reason: 'Bad port format',
        }
    }

    const portNumber = parseInt(portStr);
    if (portNumber < MIN_PORT || portNumber > MAX_PORT) {
        return {
            valid: false,
            reason: 'Out of range',
        }
    }

    return {
        valid: true,
        portNumber
    }
};