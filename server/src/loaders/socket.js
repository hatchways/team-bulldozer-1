/* eslint-disable global-require */
const config = require('../config');
const { sessionStore } = require('./session');
const user = require('../models/user');

function onAuthorizeSuccess(data, accept) {
  // The accept-callback still allows us to decide whether to
  // accept the connection or not.
  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept) {
  if (error) throw new Error(message);
  // We use this callback to log all of our failed connections.
  accept(null, false);
}

function broadcastCount(io, connectedUsers) {
  io.emit('connected_user', connectedUsers.size);
}

module.exports = async (server) => {
  /**
   * Init Socket.io
   */
  const io = require('socket.io')(server, {
    path: '/socket.io',
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: true,
  });

  const cookieParser = require('cookie-parser');
  const passportSocketIo = require('passport.socketio');

  io.use(passportSocketIo.authorize({
    cookieParser, // the same middleware you registrer in express
    // the name of the cookie where express/connect stores its session_id
    key: config.web.session_key,
    secret: config.web.session_secret, // the session_secret to parse the cookie
    store: sessionStore, // we NEED to use a sessionstore. no memorystore please
    success: onAuthorizeSuccess, // *optional* callback on success - read more below
    fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
  }));

  const connectedUsers = new Set();

  io.on('connection', (socket) => {
    // User connected, keep track of him
    if (!socket.user) {
      socket.disconnect();
      return;
    }
    const { id } = socket;
    connectedUsers.add(id);
    broadcastCount(io, connectedUsers);

    socket.on('disconnect', () => {
      connectedUsers.delete(id);
      broadcastCount(io, connectedUsers);
    });
  });
};
