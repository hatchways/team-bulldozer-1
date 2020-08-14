/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/**
 * Crawlers wrapper.
 * Expose available crawler list.
 * Expose crawlers excution abstraction.
 */
class CrawlerBase {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  findPopular(term) {
    return [];
  }

  findRecent(term) {
    return [];
  }
}

module.exports = { CrawlerBase };
