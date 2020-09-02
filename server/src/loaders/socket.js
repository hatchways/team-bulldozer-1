/* eslint-disable global-require */
const cookieParser = require('cookie-parser');
const passportSocketIo = require('passport.socketio');

const config = require('../config');
const { sessionStore } = require('./session');
const { User } = require('../models/user');
const { Result } = require('../models/result');
const { createRedisClient } = require('../config/redis');

const connections = {};

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

function broadcastConnectionCount(io) {
  io.emit('connected_user', Object.keys(connections).length);
}

/**
 * Emit `mention` event to socket.io users based on their search criteria OR their terms
 * @param {number} socketId Socket id
 * @param {string} channel Redis channel name
 * @param {string} message Redis event message
 */
function emitMentionToConnectedUsers(socketId, channel, message) {
  // Only interested in "found" channel
  if (channel !== 'found') { return; }

  // Convert mention
  const mention = JSON.parse(message);

  const {
    socket,
    type,
    search,
  } = connections[socketId];

  if (mention.type !== type) { return; }

  // Helper method
  const containsTerm = (term) => term !== undefined
    && (mention.title.includes(term) || mention.body.includes(term));

  // Validate user terms are contains within document
  const userTerms = socket.request.user.terms;
  if (containsTerm(search)
    // Fallback on user terms
    || (search === undefined && (userTerms.some(containsTerm)))) {
    socket.emit('mention', mention);
  }
}

function subscribeOrDisconnectSocket(io, socket) {
  // User connected, keep track of him
  if (!(socket.request.user && socket.request.user.logged_in)) {
    socket.disconnect();
    return;
  }

  // Get type and search from query
  const { type, search } = socket.handshake.query;

  const { id } = socket;
  connections[id] = {
    socket,
    user: socket.request.user,
    type,
    search,
  };

  // Update search term
  socket.on('🔎', (data) => {
    connections[id].search = data.search;
    connections[id].type = data.type;
    // Confirm msg reception
    socket.send('👌');
  });

  /**
   * Redis pub/sub subscriber per client
   * Can be optimized by reusing subscriber.
   */
  const mentionSubscriber = createRedisClient();
  // On redis pub/sub message
  mentionSubscriber.on('message', (channel, message) => emitMentionToConnectedUsers(id, channel, message));
  // Subscribe to redis pub/sub channel "found"
  mentionSubscriber.subscribe('found');

  broadcastConnectionCount(io);

  socket.on('disconnect', () => {
    delete connections[id];
    broadcastConnectionCount(io);

    mentionSubscriber.unsubscribe();
    mentionSubscriber.quit();
  });
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

  /**
   * Init passport.socketio
   */
  io.use(passportSocketIo.authorize({
    cookieParser, // the same middleware you registrer in express
    // the name of the cookie where express/connect stores its session_id
    key: config.web.session_key,
    secret: config.web.session_secret, // the session_secret to parse the cookie
    store: sessionStore, // we NEED to use a sessionstore. no memorystore please
    success: onAuthorizeSuccess, // *optional* callback on success - read more below
    fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
  }));

  io.on('connection', (socket) => subscribeOrDisconnectSocket(io, socket));
};
