const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');
const Handlebars = require('handlebars');

module.exports = ({ file, data }) => {
  const templateData = data || {};
  const mjml = fs.readFileSync(path.resolve(__dirname, `${file}.hbs`), 'utf8');
  const template = Handlebars.compile(mjml);
  const { html } = mjml2html(template(templateData));
  return html;
};
