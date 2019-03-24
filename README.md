# [MyOpenPorts.com](https://myopenports.com)

JavaScript full-stack project

## Description

This project is a set of tools for experienced users which allows to 
find security vulnerabilities, check the status of network software and 
get information about domains and IP addresses.
   
Current services: 
* Check status of a TCP port on client computer: open or closed;
* Run portscanner for list of ~40 popular ports;
* Request WHOIS information for a domain;
* Check website response: code status and headers; 
* Get information about ports and its protocols: using IANA ports database.

Supports English and Russian languages.

## History
The project is a re-work of website PortScan.ru, which was written by me 
in 2010 using PHP and pretty old approach. It works fine, but I wanted 
to rewrite it using NodeJS for a long time. This code challenge gave me 
that opportunity and motivation.

This is not a production-ready project. It is in production already. 

## Structure
This repository contains two main parts: Backend and Frontend. Normally, 
I would separate them into two different repos. But for demonstration 
purpose, I keep them together. That's why both folders contain its own 
*package.json* and *node_modules*. 

## How to run

### Production mode 
For the production mode, the `backend` folder is self-sufficient. 
It already contains the latest version of frontend part in `backend/public`.

Steps: 

 * `cd backend`
 * `npm i --production`
 * `npm run prod`
 
By default, backend will be available on [http://localhost:3018](http://localhost:3018). 
You can change the port by setting `PORT` environment variable: 
`
PORT=4000 npm run prod
`   
 
### Development

**Backend**

Steps: 
 * `npm run dev`

You need to restart server each time after changes were made. 

This uses for work with backend code. In order to change front part
please follow steps from the next section.  

When server runs dev-mode (`NODE_ENV=development`) it enables CORS 
and allows to make requests from other origins (see frontend development). 

**Frontend**

Steps: 
 * `cd frontend`
 * `npm i`
 * `npm start`

Will run app on [http://localhost:3000](http://localhost:3000). 
It has watch mode, so every change will reload the page. 

Once you finished work with code, you may want to build and "deploy"
static files for the production. In this case, just run: 

 * `npm run deploy`

This will generate optimized files and put them to `backend/public`.    

## Architecture & Tech Stack
I've done both: backend and frontend. 

### Backend
The **backend** part is a view-less API, with simple HTTP protocol. 
This project doesn't store or change any data. It has few idempotent 
methods, so there is no need to use complicated protocols.

For the backend I've chosen Express.js: it is great and reliable framework.

The `backend/app.js` configures express app and pass requests to 
`backend/api/index.js`, which checks request key (see security section) 
and performs api method.

Each endpoint in `backend/api/*` is a module, which returns promise even 
for synchronous tasks: it keeps project consistent and improves performance. 

Endpoints itself are implemented using bunch of popular libs from npm,
such as: 
 - portscanner
 - port-numbers
 - geoip-lite
 - async
 - whois
 - etc..


### Frontend

The **frontend** &ndash; is a Single page application developed with 
**React** and **React-Router**. 
The app was generated using `create-react-app`. It saves lots of time 
avoiding tricky webpack installation. 

If the SPA will be more complicated, I'd prefer to install and configure
the module bundler by myself.

In production, it will be a bunch of static files, which will be served 
from `backend/public`.
 
There is no need to use here Redux. It is doesn't make sense for the 
project of this complexity. 

Interesting fact: local IP detection works via well-known WebRTC hack.

**HTML/CSS** 
I've used css framework [Bulma](https://bulma.io/). Looks nice and has
everything that I need. There is no css-preprocessors
in the project. I did mostly with bulma's capabilities but each react 
component still have few css custom style. 
Probably in the future I will use SASS.

*Translations* works via `react-i18next`. But it was tricky to use 
strings with html-formatting. So big texts, such as service description, 
I've render as usual function component. Haven't found a better
way but it is solid and works just fine.   

## Security
In order to avoid abusing API, express app uses `express-rate-limit`
middleware. The limit max is set to 100 requests per 5 minutes.

To serve a request API also expect for a special key passed to header 
`x-request-key`. Without this key request will be denied with HTTP 400 
(probably 403 is better?).

This key is an UUID string generated with request method name, 
a function like: 
```
key = genUUID(method_name)
``` 
You wouldn't believe how many script-kiddies will give up when understanding 
that they need to reverse-engineer minified code to find code-generating 
part.

In the future, the key generation algorithm will be changed and should contain 
timestamp and some client info in order to get a unique key for each request. 

## Tests

**Backend** has both functional and unit testing made with `Mocha`, 
`chai` and `chai-http`. Test can be run: 
 * `cd backend`
 * `npm run test`
 
The Code Coverage is around **87%**. With proper *mocks* it can be 100%. 
Reports available with: 
 * `npm run coverage` &ndash; for CLI
 * `npm run coverage:report` &ndash; for HTML report
 
**Frontend**, unfortunately, doesn't contain a set of tests. I was lack of 
time. There is only one modified test `App.test.js`, which checks that 
application runs without any issues. Anyway:

 * `cd frontend`
 * `npm run test`

## Code styles 
The project uses ESLint and includes `.editorconfig`; The linter can be
run separately in each folder: 

 * `cd frontend && npm run lint`
 and 
 * `cd backend && npm run lint`

## TODO list
 * Improve e2e tests 
 * Server side rendering
 * Use shared code, for example for port number or domain validation.
 * Cache WHOIS results (micro-optimization: not many people requests
 same domain)
 * Migrate to SASS if frontend became more complex
 * Usage statistic: InfluxDB + Grafana

  
 
## Server side 
I have my own VPS for few NodeJS applications. I use: 
 * Nginx for proxy pass, adding headers, cache static files. 
 * [PM2](https://github.com/Unitech/pm2) as process manages
 * Let's encrypt certificates for SSL 
 * [Nginx Amplify](https://www.nginx.com/products/nginx-amplify/) 
 for server monitoring and alerts 

## Other projects 
// TODO