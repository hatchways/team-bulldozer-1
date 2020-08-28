import '../typedef';

/**
  * @type CrawlerEngine
  */
const CrawlerEngine = {
  plugins: [],

  /**
   * Register a plugin
   * @param {Plugin} plugin Plugin to register
   */
  register(plugin) {
    const {
      name, findPopular, findRecent,
    } = plugin;

    if (findPopular === undefined || findRecent === undefined) {
      throw Error('Invalid plugin');
    }
    this.plugins[name] = {
      findPopular, findRecent,
    };
  },

  /**
   * Search through all plugins and then return result
   * @param {string} search Search terms
   */
  async search(search) {
    const searches = Object
      .keys(this.plugins)
      .map(async (pluginName) => {
        /**
         * @type Plugin
         */
        const plugin = this.plugins[pluginName];
        const popular = await plugin.findPopular(search);
        const recent = await plugin.findRecent(search);
        return { search, popular, recent };
      });
    return Promise.all(searches);
  },
};

// Register crawlers here
CrawlerEngine.register(require('./reddit'));
CrawlerEngine.register(require('./twitter'));

// To perform a search on all plugins:
// CrawlerEngine.search('test');

module.exports = { CrawlerEngine };
