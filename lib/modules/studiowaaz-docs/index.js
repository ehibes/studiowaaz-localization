var _ = require('lodash');
module.exports = {
  improve: 'apostrophe-docs',
  construct:function(self, options) {
	var l = require('../../localization.js')(self, options);
  	self.docBeforeSave = function(req, doc, options,callback) {
      if(req.session && req.session.locale) {
        locale = req.session.locale;
      } else {
        return setImmediate(callback);
      }

      _.each(doc, function(value, key) {
        if (key === 'title') {
          l.ensureProperties(doc, locale);
          doc['localized'][locale]['title'] = value;
        }
        
        if (l.isArea(value)) {
          var items = [];
          _.each(doc[key]["items"], function(item) {
            if(!l.isNeverType(item)) {
              items.push(_.clone(item, true));
            }
          });
          if (items.length > 0) {
            l.ensureProperties(doc, locale);
            doc['localized'][locale][key] = items;
          }
        }
      });

      return setImmediate(callback);

    };
  }
}