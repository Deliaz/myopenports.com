/**
 * Returns object with error info
 * @param errMsg {String} Error Message
 * @param additionalInfo {Object} Additional information
 * @returns {{error_message: string, status: string, ts: number}}
 */
module.exports = (errMsg, additionalInfo = {}) => {
    return {
        status: 'error',
        error_message: typeof errMsg === 'string' ? errMsg : 'unknown',
        ts: Date.now(),
        ...additionalInfo
    }
};