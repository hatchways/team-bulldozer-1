#!/usr/bin/env node

/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

/* Sets up the environment variables from your .env file */
require('dotenv').config();

/**
 * Module dependencies.
 */
const http = require('http');
const app = require('../app');
const config = require('../config');

/**
 * Get port from environment and store in Express.
 */
const { port } = config.web;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// Init socket.io
require('../loaders/socket')(server);

require('../loaders/cron');

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
}
