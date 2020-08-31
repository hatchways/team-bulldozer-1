/* eslint-disable global-require */
const express = require('express');
const { join } = require('path');

/**
 * All routes are here to import all of them just with one command
 * in the main app.js
 */
module.exports = (app) => {
  app.use('/api/auth', require('./auth'));
  app.use('/api/search', require('./search'));
  app.use(require('./home'));

  // Provide `/public` folder content as static
  app.use(express.static(join(__dirname, '..', 'public')));

  // Route all unhandled requests to index page (routing managed front)
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
};
