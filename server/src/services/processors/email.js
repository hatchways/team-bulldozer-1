const fs = require('fs');

/**
 * Search queue processor
 * @param {*} job Bull JS job
 * @param {*} done Done callback
 */
function processJob(job, done) {
  // TODO: Send email

  fs.writeFile(`./${job.data.to}.html`, job.data.html, (err) => {
    if (err) throw err;
  });

  done();
}

module.exports = {
  processJob,
};
