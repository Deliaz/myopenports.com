const {createLogger, format, transports} = require('winston');

const level = process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
	level: level,
	format: format.combine(
		format.timestamp(),
		format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	transports: [
		new transports.Console({
			handleExceptions: true
		})
	]
});

module.exports = logger;