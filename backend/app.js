const express = require('express');
const path = require('path');
const morgan = require('morgan');
const responseTime = require('response-time');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const apiHandler = require('./api');
const errMsg = require('./responses/error');

const LISTEN_PORT = process.env.PORT || 3018;
const STATIC_DIR = '/public';

const app = express();

app.set('trust proxy', true);

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: errMsg('Too many requests from this IP, please try again later'),
});

if (process.env.NODE_ENV !== 'test') { // Logs will be disabled in test mode
	app.use(morgan('common'));
}
app.use(helmet());
app.use(limiter);

if (process.env.NODE_ENV === 'development') {
	app.use(responseTime());
}
app.use(express.static(path.join(__dirname, STATIC_DIR)));

// Enable CORS for dev
if (process.env.NODE_ENV === 'development') {
	app.options('/api/:method', cors()); //pre-flight
	app.get('/api/:method', cors(), apiHandler);
} else {
	app.get('/api/:method', apiHandler);
}

// Handles any requests that don't match to API endpoints
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + `${STATIC_DIR}/index.html`));
});

const server = app.listen(LISTEN_PORT, 'localhost', () => {
	console.info(`Backend started on http://localhost:${LISTEN_PORT}`);
	console.info(`Environment: "${process.env.NODE_ENV}"`);
});

if (process.env.NODE_ENV === 'test') {
	module.exports.server = server;
}
