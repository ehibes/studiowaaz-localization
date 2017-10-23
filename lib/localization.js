var _ = require('lodash');
module.exports = function(self, options) {
  self.neverTypes = ['apostrophe-images'];
  return {
    ensureProperties(doc, locale) {
      if (!_.has(doc, 'localized')) {
        doc.localized = {};
      }
      if (!_.has(doc.localized, locale)) {
        doc.localized[locale] = {};
      }
    },

    isArea(value) {
      if ((!value) || (value.type !== 'area')) {
        return false;
      }
      return true;
    },

    isNeverType(doc) {
      if(!doc.type){
        return false;
      }


      if(!self.neverTypes){
        return false;
      }
      
      return self.neverTypes.indexOf(doc.type) >=0;
    },
    merge(target, source) {
      _.each(source, function(area) {
        for (var i=0; i < target.length; i++) {
            if (target[i]._id === area._id) {
                target[i].type = area.type;
                target[i].content = area.content;
                return;
            }
        }
      });
    },
    isLocalizable(key) {
      var field = _.find(self.userAddFields, function(field) { return field.name ==  key });
      if (field && field.localized !== false) {
        return true;
      }

      return false;
    }
  }
};
