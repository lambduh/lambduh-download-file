var Q = require('q');
var fs = require('fs');
var req = require('request');

module.exports = function(event, options) {
  var def = Q.defer();

  var file = fs.createWriteStream(event.filepath);
  file.on('finish', function() {
    file.close(function(err){
      if (err) {
        def.reject(err);
      } else {
        def.resolve();
      }
    });
  })
  file.on('error', function(err) {
    fs.unlink(event.filepath);
    def.reject(err);
  });

  req(url).pipe(file);

  return def.promise;
}

