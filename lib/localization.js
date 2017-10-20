var _ = require('lodash');
module.exports = function(self, options) {
  self.ensureProperties = function(property, locale) {
    if (!_.has(property, 'localized')) {
      property.localized = {};
    }
    if (!_.has(property.localized, locale)) {
      property.localized[locale] = {};
    }
  };

  self.isArea = function(value) {
    if ((!value) || (value.type !== 'area')) {
      return false;
    }
    return true;
  };

  self.isNeverType = function(doc) {
    if(!doc.type){
      return false;
    }


    if(!module.neverTypes){
      return false;
    }

    return module.neverTypes.indexOf(doc.type) >=0;
  };
};