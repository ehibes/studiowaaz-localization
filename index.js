var async = require('async');
var _ = require('lodash');

module.exports = {

  moogBundle: {
    modules: ['extend-page-cursors'],
    directory: 'lib/modules'
  },

  construct: function(self, options) {
    self.defaultLocale = options.default || "en";
    self.locales = options.locales;
    self.neverTypes =options.neverTypes || ['apostrophe-images'];
    if (options.prefixes !== undefined) {
      self.prefixes = options.prefixes;
    } else {
      self.prefixes = true;
    }
    console.log('root init');

    require('./lib/middleware.js')(self, options);
    require('./lib/localization.js')(self, options); 
  }

};
