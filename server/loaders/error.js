const createError = require('http-errors');

module.exports = async (app) => {
  // catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
  });

  // Return the express app
  return app;
};
