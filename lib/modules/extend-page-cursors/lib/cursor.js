module.exports = {
  construct: function(self, options) {
    self.addFilter('localize', {
      after: function (results) {
        console.log('loadings docs by my mod');

        var req = self.get('req');
        if(!(req.data && req.data.activeLocale)) {
          return;
        }

        var locale = req.data.activeLocale;

        _.each(results, function(doc, id) {
          _.each(doc, function(property, key) {
            if(key === 'title') {
              if (!(doc.localized && doc.localized[locale])) {
                return;
              }
              doc.title = doc.localized[locale]['title'];
            }
            if(self.isArea(property)) {
              if (!(doc.localized && doc.localized[locale])) {
                return;
              }
              merge(property.items, doc.localized[locale][key]);
            }
          });
        });
        
        return results;
      }
    });
  }
}