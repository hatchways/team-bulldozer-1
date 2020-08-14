/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable class-methods-use-this */
const { readdirSync } = require('fs');

// TODO: Add cache / singleton pattern

/**
 * Provide abstraction to implemented crawlers
 */
class CrawlerService {
  constructor(name) {
    this.name = name;
  }

  /**
   * List crawler types
   */
  getCrawlers() {
    const getDirectories = (source) => readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const crawlers = getDirectories(__dirname);
    return crawlers;
  }

  getCrawler(name) {
    const crawlers = this.getCrawlers();
    if (crawlers.indexOf(name) < 0) {
      return undefined;
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

    return crawler;
  }
}

module.exports = { CrawlerService };
