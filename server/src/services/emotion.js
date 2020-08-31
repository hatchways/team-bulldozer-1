const Sentiment = require('sentiment');

const sentiment = new Sentiment();

exports.analyze = async (text) => {
  const result = sentiment.analyze(text);
  let name = 'neutral';

  if (result.comparative >= 0.05) {
    name = 'good';
  }
  if (result.comparative <= -0.05) {
    name = 'bad';
  }
  return {
    sentiment: result.comparative,
    emotion: name,
  };
};
