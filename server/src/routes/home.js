module.exports = (app) => {
  app.get('/status', (req, res) => { res.status(200).end(); });
};
