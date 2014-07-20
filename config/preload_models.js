//Bootstrap models

module.exports = function(mongoose, fs) {
  var models_path = __dirname + '/../app/models';

  var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);
      if (stat.isFile() && /(.*)\.(js$|coffee$)/.test(file)) {
        require(newPath);
      } else if (stat.isDirectory()) {
        walk(newPath);
      }
    });
  };
  walk(models_path);
};
