const portscanner = require('portscanner');
const {performance} = require('perf_hooks');
const {eachSeries} = require('async');
const logger = require('../logger');

const CHECKPORT_TIMEOUT = 500;
const MIN_CHECK_TIME = 3000;

const PORT_CHECKLIST = {
	20: 'FTP',
	21: 'FTP',
	22: 'SSH',
	23: 'telnet',
	25: 'SMTP',
	42: 'WINS',
	43: 'WHOIS',
	53: 'DNS',
	67: 'DHCP',
	69: 'TFTP',
	80: 'HTTP',
	110: 'POP3',
	115: 'SFTP',
	123: 'NTP',
	137: 'NetBIOS',
	138: 'NetBIOS',
	139: 'NetBIOS',
	143: 'IMAP',
	161: 'SNMP',
	179: 'BGP',
	443: 'HTTPS',
	445: 'SMB',
	514: 'Syslog',
	515: 'LPD',
	993: 'IMAP/ssl',
	995: 'POP3/ssl',
	1080: 'SOCKS',
	1194: 'OpenVPN',
	1433: 'MSSQL',
	1702: 'L2TP',
	1723: 'PPTP',
	3000: 'Dev',
	3128: 'Proxy',
	3268: 'LDAP',
	3306: 'MySQL',
	3389: 'RDP',
	5432: 'PostgreSQL',
	5060: 'SIP',
	5900: 'VNC',
	5938: 'TeamViewer',
	8080: 'HTTP',
	10000: 'NDMP',
	20000: 'DNP'
};


/**
 * Port scanner for multiple ports
 * @param req Request
 */
module.exports = function (req) {
	return new Promise((resolve, reject) => {

		const clientIp = req.ip;
		let result = {};
		const startTs = performance.now();

		eachSeries(Object.keys(PORT_CHECKLIST), (port, nextCb) => {
			portscanner.checkPortStatus(port, clientIp, {timeout: CHECKPORT_TIMEOUT}, (err, status) => {
				if (err) {
					logger.error(err);
					result[port] = {
						status: false,
						protocol: PORT_CHECKLIST[port]
					};
				} else {
					result[port] = {
						status: Boolean(status === 'open'),
						protocol: PORT_CHECKLIST[port]
					};
				}
				nextCb();
			});
		}, err => {
			if (err) {
				logger.error(err);
				reject({code: 500, reason: 'Scanner issue'});
			} else {
				const endTs = performance.now();
				setTimeout(() => {
					resolve({
						scan_results: result,
						check_time: endTs - startTs
					});
				}, MIN_CHECK_TIME);
			}

		});
	});
};