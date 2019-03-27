const logger = require('../logger');
const mysql = require('mysql2');

const DB_NAME = process.env.LOG_DB_NAME;
const DB_ADDRESS = process.env.LOG_DB_ADDRESS;
const DB_USERNAME = process.env.LOG_DB_USER;
const DB_PASSWORD = process.env.LOG_DB_PASSWORD;


if (!DB_ADDRESS || !DB_NAME) {
	logger.warn('LOG_DB_NAME or LOG_DB_ADDRESS not set. Skip logging.');
}

function makeConnection() {
	if (!DB_ADDRESS || !DB_NAME) {
		return null; // TODO
	}

	return mysql.createConnection({
		host: DB_ADDRESS,
		user: DB_USERNAME,
		password: DB_PASSWORD,
		database: DB_NAME
	});
}

function getNow() {
	return parseInt('' + Date.now() / 1000);
}

/**
 * Logs events for port check endpoint
 * @param port
 * @param status
 * @param checkTime
 */
module.exports.logPortCheck = function (port, status, checkTime) {
	const connection = makeConnection();
	if (connection) {
		connection.query(`INSERT INTO portcheck (date,port,status,check_time) VALUE(${getNow()},${port},"${status}",${checkTime})`);
	}
};
