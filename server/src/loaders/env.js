/* eslint-disable global-require */
/* eslint-disable no-console */

function validateMandatoryEnvironmentVariable(variableName) {
  if (process.env[variableName] === undefined) {
    console.error('======================================================');
    console.error(`Environment variable [31m${variableName}[39m not set`);
    console.error('======================================================');
    process.exit(-1);
  }
}

module.exports.Validate = () => {
  // Validate mandatory env VARS
  validateMandatoryEnvironmentVariable('SESSION_SECRET');
  validateMandatoryEnvironmentVariable('MONGO_DB');

  if (process.env.NODE_ENV === 'test') {
    return;
  }

  validateMandatoryEnvironmentVariable('TWITTER_CONSUMER_KEY');
  validateMandatoryEnvironmentVariable('TWITTER_CONSUMER_SECRET');
  validateMandatoryEnvironmentVariable('TWITTER_TOKEN');
  validateMandatoryEnvironmentVariable('TWITTER_TOKEN_SECRET');
};
