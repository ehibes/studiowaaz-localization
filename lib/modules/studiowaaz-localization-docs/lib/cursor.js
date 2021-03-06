var _ = require('lodash');

module.exports = {
  construct: function(self, options) {
    var l = require('../../../localization.js')(self, options);
    self.addFilter('localized', {
      def: true,
      after: function(results) {
        var locale;
        var req = self.get('req');
        if(!(req.data && req.data.activeLocale)) {
          if (!(req.session && req.session.locale)) {
            return;
          }
          locale = req.session.locale;
        } else {
          locale = req.data.activeLocale;
        }

        _.each(results, function(doc) {
          _.each(doc, function(property, key) {
            if(doc.localized && doc.localized[locale] && doc.localized[locale][key]) {
              if (l.isArea(property)) {
                property.items = _.merge(property.items, doc.localized[locale][key]);
              } else {
                doc[key] = doc.localized[locale][key];
              }
            }
          });
        });
        
        return results;
      }
    })
  }
};
