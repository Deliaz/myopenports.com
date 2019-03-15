const express = require('express');
const path = require('path');
const morgan = require('morgan');
const responseTime = require('response-time');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');


const apiHandler = require('./api');
const errMsg = require('./api/error');

const LISTEN_PORT = process.env.PORT || 3018;
const STATIC_DIR = '/public';

const app = express();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: errMsg('Too many requests from this IP, please try again later'),
    // TODO improve keyGenerator
});

// TODO Common map with errors and codes

app.use(morgan('common'));
app.use(helmet());
app.use(limiter);

// TODO CORS Only in dev

app.use(responseTime());
app.use(express.static(path.join(__dirname, STATIC_DIR)));

app.options('/api/:method', cors()); //pre-flight // TODO dev
app.get('/api/:method', cors(), apiHandler);

// Handles any requests that don't match to API endpoints
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+`${STATIC_DIR}/index.html`));
});

// TODO Handle 404

app.listen(LISTEN_PORT, 'localhost', () => console.log(`Backend started on http://localhost:${LISTEN_PORT}`));