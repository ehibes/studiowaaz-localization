var _ = require('lodash');

module.exports = function(self, options) {

  // Set `req.locale` based on `req.query.workflowLocale`, `req.session.locale`,
  // the hostname and/or the URL prefix.
  //
  // If the locale is not present or is not valid, set `req.locale` to the
  // default locale by calling `self.guessLocale`.
  //
  // Store the locale in `req.session.locale` as well.

  self.expressMiddleware = {
    before: 'apostrophe-global',
    middleware: function(req, res, next) {
      if (req.method !== 'GET') {
        return next();
      }

      function setLocale(req,locale) {
        req.session.locale = locale;
        req.data.activeLocale = locale;
        self.apos.i18n.setLocale(req,locale);
      }

      // is locale in url?
      if (/^\/(modules|uploads)\/|\./.test(req.url)) {
        return next();
      }

      var matches = req.url.match(/^\/(\w{2,3})(\/.*|\?.*|)$/);
      if (!matches) {
        //do not keep the session locale here
        setLocale(req, self.defaultLocale);
        if (self.prefixes) {
          return res.redirect('/'+self.defaultLocale+req.url);
        }
        return next();
      }




      if (!_.includes(options.locales, matches[1])) {
        setLocale(req,self.defaultLocale);
        return next();
      }

      setLocale(req,matches[1]);

      req.url = matches[2];

      if (!req.url.length) {
        req.url = "/"
      }

      return next();
    }
  };
};