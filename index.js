module.exports = {

  moogBundle: {
    modules: ['extend-page-cursors','studiowaaz-docs', 'studiowaaz-pieces', 'studiowaaz-pieces-pages'],
    directory: 'lib/modules'
  },

  alias: 'waaz',

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
    self.addHelpers({
      // localePicker:function(args) {
      //   var locales = {};
      //   _.each(self.locales, function(value) {
      //     locales[value] = '/'+value+self.apos.templates.contextReq.url;
      //   });
      //   return self.partial('localePicker', {locales: locales, current: self.apos.templates.contextReq.data.activeLocale});

      // },
      // toLocalUrl: function(url) {
      //   // Replace spaces with claps
      //   return "/"+ self.apos.templates.contextReq.data.activeLocale+ url;
      // },
      getLocale: function() {
        return self.apos.templates.contextReq.data.activeLocale;
      }
    });
  }

};
