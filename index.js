var Q = require('q');
var fs = require('fs');
var req = require('request');

module.exports = function(event) {
  var def = Q.defer();

  var file = fs.createWriteStream(event.filepath);
  file.on('finish', function() {
    file.close(function(err){
      if (err) {
        def.reject(err);
      } else {
        def.resolve(event);
      }
    });
  })
  file.on('error', function(err) {
    fs.unlink(event.filepath);
    def.reject(err);
  });

  req(event.url).pipe(file);

  return def.promise;
}

