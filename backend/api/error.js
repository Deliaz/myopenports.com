/**
 * Returns object with error info
 * @param errMsg
 * @returns {{error_message: string, status: string, ts: number}}
 */
module.exports = errMsg => {
    return {
        status: 'error',
        error_message: typeof errMsg === 'string' ? errMsg : 'unknown',
        ts: Date.now(),
    }
};