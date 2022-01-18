/**
 * 长文本加密
 * @param {string} string 待加密长文本
 * @returns {string} 加密后的base64编码
 * */
JSEncrypt.prototype.encryptLong = function (string) {
  var k = this.getKey();
  try {
    var ct = "";
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    var bytes = new Array();
    bytes.push(0);
    var byteNo = 0;
    var len, c;
    len = string.length;
    var temp = 0;
    for (var i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) { //特殊字符，如Ř，Ţ
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00FFFF) { //中文以及标点符号
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007FF) { //特殊字符，如È，Ò
        byteNo += 2;
      } else { // 英文以及标点符号
        byteNo += 1;
      }
      if ((byteNo % 117) >= 114 || (byteNo % 117) == 0) {
        if (byteNo - temp >= 114) {
          bytes.push(i);
          temp = byteNo;
        }
      }
    }
    //2.截取字符串并分段加密
    if (bytes.length > 1) {
      for (var i = 0; i < bytes.length - 1; i++) {
        var str;
        if (i == 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        var t1 = k.encrypt(str);
        ct += t1;
      };
      if (bytes[bytes.length - 1] != string.length - 1) {
        var lastStr = string.substring(bytes[bytes.length - 1] + 1);
        ct += k.encrypt(lastStr);
      }
      return hex2b64(ct);
    }
    var t = k.encrypt(string);
    var y = hex2b64(t);
    return y;
  } catch (ex) {
    return false;
  }
};

/**
 * 长文本解密
 * @param {string} string 加密后的base64编码
 * @returns {string} 解密后的原文
 * */
JSEncrypt.prototype.decryptLong = function (string) {
  var k = this.getKey();
  var maxLength = 256;
  try {
    var string = b64tohex(string);
    var ct = "";
    if (string.length > maxLength * 2) {
      var lt = string.match(/.{1,512}/g); //128位解密。取256位，256解密去512位
      lt.forEach(function (entry) {
        var t1 = k.decrypt(entry);
        ct += t1;
      });
      return ct;
    }
    var y = k.decrypt(string);
    return y;
  } catch (ex) {
    return false;
  }
};

JSEncrypt.prototype.encryptLong3 = function (d) {
  const k = this.key
  const maxLength = ((k.n.bitLength() + 7) >> 3) - 11

  try {
    let lt = ''
    let ct = ''

    if (d.length > maxLength) {
      lt = d.match(/.{1,117}/g) || ''
      lt.forEach(function (entry) {
        const t1 = k.encrypt(entry)
        ct += t1
      })
      return hexToBytes(ct)
    }
    const t = k.encrypt(d)
    const y = hexToBytes(t)
    return y
  } catch (ex) {
    return false
  }
}

JSEncrypt.prototype.decryptLong3 = function (string) {
  const k = this.getKey()
  const maxLength = (k.n.bitLength() + 7) >> 3
  try {
    const str = bytesToHex(string)
    let ct = ''
    if (str.length > maxLength) {
      const lt = str.match(/.{1,256}/g) || ''
      lt.forEach(function (entry) {
        const t1 = k.decrypt(entry)
        ct += t1
      })
      return ct
    }
    const y = k.decrypt(bytesToHex(string))
    return y
  } catch (ex) {
    return false
  }
}


function int2char(n) {
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  return BI_RM.charAt(n);
}

function hex2b64(h) {
  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  var ret = "";
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }
  return ret;
}
// convert a base64 string to hex
function b64tohex(s) {
  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  var ret = "";
  var i;
  var k = 0; // b64 state, 0-3
  var slop = 0;
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break;
    }
    var v = b64map.indexOf(s.charAt(i));
    if (v < 0) {
      continue;
    }
    if (k == 0) {
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 1;
    } else if (k == 1) {
      ret += int2char((slop << 2) | (v >> 4));
      slop = v & 0xf;
      k = 2;
    } else if (k == 2) {
      ret += int2char(slop);
      ret += int2char(v >> 2);
      slop = v & 3;
      k = 3;
    } else {
      ret += int2char((slop << 2) | (v >> 4));
      ret += int2char(v & 0xf);
      k = 0;
    }
  }
  if (k == 1) {
    ret += int2char(slop << 2);
  }
  return ret;
}

function hexToBytes(hex) {
  // eslint-disable-next-line prefer-const
  let bytes = []
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16))
  }
  return bytes
}

// Convert a byte array to a hex string
function bytesToHex(bytes) {
  const hex = []
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16))
    hex.push((bytes[i] & 0xf).toString(16))
  }
  return hex.join('')
}

function stringByteLength(string) {
  var byteNo = 0
  for (var i = 0; i < string.length; i++) {
    c = string.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) { //特殊字符，如Ř，Ţ
      byteNo += 4;
    } else if (c >= 0x000800 && c <= 0x00FFFF) { //中文以及标点符号
      byteNo += 3;
    } else if (c >= 0x000080 && c <= 0x0007FF) { //特殊字符，如È，Ò
      byteNo += 2;
    } else { // 英文以及标点符号
      byteNo += 1;
    }
  }
  return byteNo
}

function rsaKeyBody(pem) {
  var match = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g.exec(pem)
  return match[3]
}