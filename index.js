var crypto = require('crypto');

var ANTI_CHEAT_CODE = 'Fe12NAfA3R6z4k0z';
var SALT = 'af0ik392jrmt0nsfdghy0';

function md5(text) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(text, 'ascii');
  return md5sum.digest('hex');
}

function decode(save) {
  var result, clear = '';
  if (save.indexOf(ANTI_CHEAT_CODE) > -1) {
    result = save.split(ANTI_CHEAT_CODE);
    for (var i = 0; i < result[0].length; i += 2) {
      clear += result[0].charAt(i);
    }

    if (md5(clear + SALT) !== result[1]) {
      throw new Error('Bad hash');
    }
  }
  else {
    throw new Error('Anti-cheat code not found');
  }

  var data = JSON.parse(new Buffer(clear, 'base64').toString('ascii'));
  return data;
}
function encode(json) {
  var b64 = new Buffer(JSON.stringify(json)).toString('base64');
  var obscure = b64.split('').join('a');
  var r = md5(b64 + SALT);

  return obscure+ANTI_CHEAT_CODE+r;
}

module.exports.decode = decode;
module.exports.encode = encode;
