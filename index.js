var decode = require('base64-decode');
var crypto = require('crypto');

var ANTI_CHEAT_CODE = 'Fe12NAfA3R6z4k0z';
var SALT = 'af0ik392jrmt0nsfdghy0';

function parse(save) {
  if (save.indexOf(ANTI_CHEAT_CODE) > -1) {
    var result = save.split(ANTI_CHEAT_CODE);
    save = '';
    for (var i = 0; i < result[0].length; i += 2) {
      save += result[0][i];
    }

    var md5 = crypto.createHash('md5');
    md5.update(save + SALT, 'ascii');
    if (md5.digest('hex') !== result[1]) {
      throw new Error('Bad hash');
    }
  }

  var data = JSON.parse(decode(save));
  return data;
}

module.exports = parse;