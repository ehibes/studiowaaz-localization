module.exports = {
  construct: function(self, options) {
    self.apos.define('apostrophe-pages-cursor', require('./lib/cursor.js'));
  }
};