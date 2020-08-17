const { CrawlerService } = require('./crawler');

const crawlerService = new CrawlerService('');

exports.search = async (req, res, next) => {
  // TODO: Iterate through active crawlers (crawlerService.getActiveCrawlers()) and combine results
  const crawler = crawlerService.getCrawler('twitter');
  const activeCrawlers = crawlerService.getActiveCrawlers(req.user);

  // TODO: Convert to a stardard format
  if (req.query.type === 'recent') {
    const result = await crawler.findRecent(req.query.term, req.query.type);
    res.status(200).send(result);
  } else {
    const result = await crawler.findPopular(req.query.term, req.query.type);
    res.status(200).send(result);
  }
};
