var _ = require('lodash');
var async = require('async');
module.exports = {
  improve: 'apostrophe-pieces-pages',
  construct:function(self, options) {
	self.addUrlsToPieces = function(req, results, callback) {
      var pieceName = self.pieces.name;
      return async.series({
        getIndexPages: function(callback) {
          if (req.aposParentPageCache && req.aposParentPageCache[pieceName]) {
            return setImmediate(callback);
          }
          return self.findForAddUrlsToPieces(req)
            .toArray(function(err, pages) {
              if (err) {
                return callback(err);
              }
              if (!req.aposParentPageCache) {
                req.aposParentPageCache = {};
              }
              req.aposParentPageCache[pieceName] = pages;
              return callback(null);
            }
          );
        }
      }, function(err) {
        _.each(results, function(piece) {
          var parentPage = self.chooseParentPage(req.aposParentPageCache[pieceName], piece);
          if (parentPage) {
            piece._url = self.buildUrl(parentPage, piece);
            piece._parentUrl = parentPage._url;
            var locale = req.data.activeLocale;
            piece._localeurl = '/' + locale + piece._url;
          }
        });
        return callback(null);
      });
    };
  }
}