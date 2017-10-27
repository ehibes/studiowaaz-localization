module.exports = {
  improve: 'apostrophe-pages',
  construct: function(self, options) {
  	console.log('here');
    self.apos.define('apostrophe-pages-cursor', require('./lib/cursor.js'));
  }
};