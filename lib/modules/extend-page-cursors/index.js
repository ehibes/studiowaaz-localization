module.exports = {
  construct: function(self, options) {
    console.log('module init');
    self.apos.define('apostrophe-pages-cursor', require('./lib/cursor.js'));
  }
};