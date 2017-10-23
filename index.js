module.exports = {

  moogBundle: {
    modules: ['extend-page-cursors','studiowaaz-docs', 'studiowaaz-pieces'],
    directory: 'lib/modules'
  },

  construct: function(self, options) {
    self.defaultLocale = options.default || "en";
    self.locales = options.locales;
    self.neverTypes = options.neverTypes || ['apostrophe-images'];
    if (options.prefixes !== undefined) {
      self.prefixes = options.prefixes;
    } else {
      self.prefixes = true;
    }

    require('./lib/middleware.js')(self, options);
  }

};
