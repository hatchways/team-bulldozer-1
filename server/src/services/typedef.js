/**
 * @typedef {Object} CrawlerResult
 * @property {string} source
 * @property {string} type
 * @property {string} author
 * @property {Date} date
 * @property {string} title
 * @property {string} body
 * @property {string} url
 * @property {string} thumbnail
 */

/**
 * @typedef {Object} CrawlerEngine
 * @property {Plugin[]} plugins
 * @property {CrawlerEngine~registerCallback} register
 * @property {CrawlerEngine~searchCallback} search
 */

/**
 * @callback CrawlerEngine~registerCallback
 * @param {Plugin} plugin
 */

/**
 * @callback CrawlerEngine~searchCallback
 * @param {string} search
 */

/**
 * @typedef {Object} Plugin
 * @property {string} name
 * @property {function():CrawlerResult} convert
 * @property {Plugin~searchCallback} findPopular
 * @property {Plugin~searchCallback} findRecent
 */

/**
 * @callback Plugin~convertCallback
 * @param {string} type
 * @param {Object} obj
 * @returns {CrawlerResult[]}
 */

/**
 * @callback Plugin~searchCallback
 * @param {string} search
 * @returns {CrawlerResult[]}
 */
