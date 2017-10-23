var _ = require('lodash');
module.exports = {
  improve: 'apostrophe-pieces',
  beforeConstruct: function(self, options) {
  	self.userAddFields = options.addFields;
  },
  construct:function(self, options) {
	  var l = require('../../localization.js')(self, options);

  	self.beforeSave = function(req, piece, options,callback) {
      if(req.session && req.session.locale) {
        locale = req.session.locale;
      } else {
        return setImmediate(callback);
      }

      _.each(piece, function(value, key) {
        // If area & if neverType?
        if (l.isLocalizable(key)) {
          if (l.isArea(value)) {
            var items = [];
            _.each(piece[key]["items"], function(item) {
              //@TODO verify areas subitem is translatable
              if(!l.isNeverType(item)) {
                items.push(_.clone(item, true));
              }
            });
            if (items.length > 0) {
              l.ensureProperties(piece, locale);
              piece['localized'][locale][key] = items;
            }
          } else {
            piece['localized'][locale][key] = value;
          }
        }
      });

      return setImmediate(callback);

    };
  }
}