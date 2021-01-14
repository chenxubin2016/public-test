const os = require('os');
const fs = require('fs');
///获取本机ip///
module.exports = {
  getIPAdress: function () {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  },
  stat: function (url) {
    return new Promise(resolve => {
      fs.stat(url, (err, stats) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}
