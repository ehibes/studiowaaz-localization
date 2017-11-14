module.exports = {
  improve: 'apostrophe-pages',
  construct: function(self, options) {
    self.apos.define('apostrophe-pages-cursor', require('./lib/cursor.js'));
  }
};