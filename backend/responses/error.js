/**
 * Returns object with error info
 * @param errMessage {String} Error Message
 * @param details {Object} Additional information
 * @returns {{error_message: string, status: string, ts: number}}
 */
module.exports = (errMessage, details = {}) => {
	return {
		status: 'error',
		error_message: typeof errMessage === 'string' ? errMessage : 'unknown',
		ts: Date.now(),
		...details
	};
};