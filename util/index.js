/**
 * util index
 */

const formatter = require('./filename_format');
const fixer = require('./fix_html');

const deal = async function index() {
  await formatter;
  fixer();
};

deal();
