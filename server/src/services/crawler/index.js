/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
const { readdirSync } = require('fs');

/**
 * Provide abstraction to implemented crawlers
 */
class CrawlerService {
  constructor(name) {
    this.name = name;
    this.crawlerList = undefined;
    this.crawlerInstanceList = {};
  }

  /**
   * List crawler types
   */
  getCrawlers() {
    if (this.crawlerList === undefined) {
      const getDirectories = (source) => readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      const crawlers = getDirectories(__dirname);
      this.crawlerList = crawlers;
    }
    return this.crawlerList;
  }

  getActiveCrawlers(user) {
    let crawlers = this.getCrawlers();
    // Filter on actual user active crawlers
    if (user && user.crawlers) {
      const userCrawlers = user.crawlers;
      crawlers = crawlers.filter((name) => user.crawlers.indexOf(name) > -1);
    }
    return crawlers;
  }

  getCrawler(name) {
    const crawlers = this.getCrawlers();
    if (crawlers.indexOf(name) < 0) {
      return undefined;
    }

    if (this.crawlerInstanceList[name] !== undefined) {
      return this.crawlerInstanceList[name];
    }

    // name validated to avoid path traversal
    const path = `./${name}`;
    const { crawler } = require(path);

    // pseudo expected interface/attributes
    const methodNames = ['name', 'findPopular', 'findRecent'];

    const keys = Object.keys(crawler)
      .filter((key) => methodNames.indexOf([key]));

    if (keys.length < methodNames.length) {
      throw Error('Missing methods from interface CrawlerBase');
    }

    const methods = keys.filter((key) => typeof (crawler[key]) === 'function');
    const attributes = keys.filter((key) => typeof (crawler[key]) === 'string');

    if (methods.concat(attributes).length !== methodNames.length) {
      throw Error('Missing methods from interface CrawlerBase');
    }

    this.crawlerInstanceList[name] = crawler;

    return crawler;
  }
}

module.exports = { CrawlerService };
