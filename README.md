# [MyOpenPorts.com](https://myopenports.com)

This project is a SPA set of networks tools which allows: 
* Check single TCP port status on a user computer: open or closed
* Scan popular ports: list of ~40 popular ports
* Request WHOIS information
* Check website response: code status and headers 
* Get information about ports and its protocols: using IANA Ports database

Supports English and Russian languages.

### History
The project is a re-work of website PortScan.ru, which was written by me 
in 2010 using PHP and pretty old approach. It works fine, but I wanted 
to rewrite it using NodeJS for a long time. The code challenge gave me 
that opportunity and motivation.

This is not just a production-ready project. It is production already. 

## Structure
This repository contains two main parts: Backend and Frontend. Normally 
I would separate them into two different repos because believe that "one 
repository means single responsibility". But for demonstration 
purpose I keep them together. That's why both folders contain it's own 
*package.json* and *node_modules*. 

## How to run

### Production mode 
For the production mode the `backend` folder is a self-sufficient. 
It is already contains latest version of frontend part in `backend/public`.

Steps: 

 * `cd backend`
 * `npm i --production`
 * `npm run prod`
 
By default backend will be available on [http://localhost:3018](http://localhost:3018). 
You can change the port by setting `PORT` environment variable: 
`
PORT=4000 npm run prod
`   
 
### Development

**Backend**

Steps: 
 * `npm run dev`

You need to restart server each time after changes was made. 

This normally uses for work with backend code. In order to change front part
please follow steps from the next section.  

When server runs dev-mode (`NODE_ENV=development`) it enables CORS 
and allows to make requests from other origins (see frontend development). 

**Frontend**

Steps: 
 * `cd frontend`
 * `npm i`
 * `npm start`

It will run app on [http://localhost:3000](http://localhost:3000). 
It has watch mode, so every change will reload the page. 

Once you finished work with code, you may want to build and "deploy"
static files for the production. In this case just run: 

 * `npm run deploy`

This will generate static and move it to `backend/public`.    

## Architecture & Tech stack
I've implemented both: backend and frontend

The **backend** part is a view-less API, with simple HTTP protocol. 
This project doesn't store or change any data. It has few idempotent 
methods, so there is no sense to use complicated protocol.

For the backend I've choose Express.js: it is great and reliable framework 
for making simple and complex API.

`backend/app.js` configures express and and pass request to `backend/api/index.js`, which 
checks request key (see security section) and performs api method. 

Each endpoint in `backend/api/*` is a module, which returns promise even 
for synchronous tasks: it keeps project consistent and improves performance 
(event-loop).

---

The **frontend** &ndash; is a Single page application developed with React. 
React application was generated using `create-react-app`. It allows to 
save lots of time avoiding tricky webpack installation. 
If the SPA will be more complicated, I'd prefer to install and configure
the module bundler by myself.

In production it will be a bunch of static files, which will be served from `backend/public`.


### TODO list
 * Improve e2e tests 
 * Server side rendering
 * Use shared code, for example for port number or domain validation.
 * Ask *port-info* when performing ** 
 * Cache WHOIS results (micro-optimization: not many people requests
 same domain)
 * Usage statistic: InfluxDB + Grafana


### Security
In order to avoid abusing API, express app uses `express-rate-limit` middleware.
The limit max is set to 100 requests per 5 minutes.

To serve a request API also expect for a special key passed to header `x-request-key`.
Without this key request will be denied with HTTP 400 (probably 403 is better?).

This key is an UUID string generated with request method name, a function like: 
```
key = genUUID(method_name)
``` 
You wouldn't believe how many script-kiddies gave up when understand that they need 
to reverse-engineer minified code to find code-generating part (based on my experience).

In the future the key generation function will be improves and will contain 
timestamp and some client info in order to get unique key for each request. 
  
 
### Server side 
I have my own VPS for few NodeJS applications. I use: 
 * Nginx for proxy pass, adding headers, cache static files. 
 * [PM2](https://github.com/Unitech/pm2) as process manages
 * Let's encrypt certificates for SSL 
 * [Nginx Amplify](https://www.nginx.com/products/nginx-amplify/) for server monitoring and alerts 

### Code styles 
The project uses ESLint and includes `.editorconfig`; The linter can be
run separately in each folder: 

 * `cd frontend && npm run lint`
 and 
 * `cd backend && npm run lint`