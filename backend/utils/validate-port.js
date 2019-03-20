const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * Validate port
 * @param portStr {String} Port number as a string from get request
 * @returns {Object} {valid: {Boolean}, reasons {String}} Contains validation status as "valid" field and
 * reason string in case if port is not valid. For valid case it is also sends "portNumber" as an integer.
 */
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