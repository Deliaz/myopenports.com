/**
 * Returns object with error info
 * @param errMsg {String} Error Message
 * @param details {Object} Additional information
 * @returns {{error_message: string, status: string, ts: number}}
 */
module.exports = (errMsg, details = {}) => {
    return {
        status: 'error',
        error_message: typeof errMsg === 'string' ? errMsg : 'unknown',
        ts: Date.now(),
        ...details
    }
};