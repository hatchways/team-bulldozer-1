/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
const crawler = {};
crawler.name = 'reddit';
crawler.findPopular = (term) => {
  return ['reddit'];
};
crawler.findRecent = (term) => {
  return ['reddit'];
};
crawler.convert = (type, obj) => [
  {
    source: this.name,
    type,
    title: '',
    body: '',
    url: 'http://',
    thumbnail: 'http://',
  },
];
module.exports = { crawler };
