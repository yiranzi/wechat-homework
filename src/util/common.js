
const CommonUtil = {
  replaceAll: function (str, s1, s2) {
    return str.replace(new RegExp(s1,'gm'), s2)
  },

  isImg: function (str) {
    return str.match(/.*png$/) || str.match(/.*jpg$/) || str.match(/.*jpeg$/)
  },

  // mp3文件
  isMp3: function (str) {
    return str.match(/.*mp3/)
  },

  // mp4文件
  isMp4: function (str) {
    return str.match(/.*mp4/)
  },

  // 是字符串
  isString: function (str) {
    return typeof str === 'string'
  },

  convertToRowList: function (list, rowSize = 10) {
    // 把列表排成行，不足的填空
    const rowList = []
    list.forEach(function (item, index) {
      if (index % rowSize === 0) {
        rowList.push([])
      }
      rowList[rowList.length - 1].push(item)
    })
    if (rowList.length > 0) {
      const row = rowList[rowList.length - 1]
      for (let i = row.length; i < rowSize; i++) {
        row.push(null)
      }
    }
    return rowList
  },

  // 一个字符串在另一个字符串重复出现的次数
  countBy: function (sourceStr, matchStr) {
    const r = new RegExp('\\' + matchStr, 'gi')
    const mat = sourceStr.match(r)
    if (mat) {
      return mat.length
    }
    return 0
  },

  isObject: function (obj) {
    let type = typeof obj
    return type === 'object'
  },

  isEmpty: function (data) {
    if (data == null) return true
    if (this.isObject(data)) {
      return Object.keys(data).length === 0
    }
    return data.length === 0
  },

  // 判断字符串是否为空
  strIsEmpty: function (str) {
    return str == null || str.trim() === ''
  },

  // 判断数组是否为空
  arrayIsEmpty: function (array) {
    return Array.isArray(array) && array.length === 0
  },

  arrayIsContains: function (arr, obj) {
    var i = arr.length
    while (i--) {
      if (arr[i] === obj) {
        return true
      }
    }
    return false
  },

  startWith: function (str, startStr) {
    const reg = new RegExp('^' + startStr)
    return reg.test(str)
  },

  endWith: function (str, endStr) {
    const reg = new RegExp(endStr + '$')
    return reg.test(str)
  },

  removeByValue: function (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1)
        break
      }
    }
  },

  clone: function (obj) {
    if (typeof (obj) !== 'object' || obj == null) return obj
    let newObj = {}
    for (var i in obj) {
      newObj[i] = this.clone(obj[i])
    }
    return newObj
  },

  // 对象转URL参数与拼接
  /**
     //调用：
     var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
     parseParam(obj);
     结果："name=tom&class.className=class1&classMates[0].name=lily"
     parseParam(obj,'stu');
     结果："stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily"
     * */
  parseParam: function (param, key) {
    let paramStr = ''
    let mappingOperator = '='
    const separator = '&'
    // 数组用逗号连接成字符串作为参数，后台对应再使用下面函数parseQueryString转数组
    param = param instanceof Array ? param.join(',') : param
    if (param instanceof String || typeof (param) === 'string' || param instanceof Number || typeof (param) === 'number' || param instanceof Boolean || typeof (param) === 'boolean') {
      if (param !== null && param !== '') {
        paramStr += separator + key + mappingOperator + param// encodeURIComponent(param);
      }
    } else {
      for (var i in param) {
        var value = param[i]
        if (value !== null && value !== '') {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
          var v = this.parseParam(value, k)
          if (v !== null && v !== '') {
            paramStr += separator + v
          }
        }
      }
    }
    return paramStr.substr(1)
  },

  // 地址栏参数转json对象，空字符串会赋null值
  parseQueryString: function (url) {
    let reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      arr_url = reg_url.exec(url),
      ret = {}
    if (arr_url && arr_url[1]) {
      let str_para = arr_url[1], result
      while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = (result[2] && result[2].indexOf(',') > 0) ? this.strSplit(result[2])
          : (result[2] && result[2].trim() === '') ? null
            : !isNaN(result[2]) ? Number(result[2])
              : (result[2] === 'true' || result[2] === 'false') ? Boolean(result[2]) : decodeURIComponent(result[2])
      }
    }
    return ret
  },

  // 查询对象转换成name=value格式
  stringifyQueryObject: function (obj) {
    const list = []
    for (let i in obj) {
      if (obj[i] !== undefined) {
        list.push(`${i}=${obj[i]}`)
      }
    }
    return list.join('&')
  },

  strSplit: function (str) {
    let arr = str.split(',')
    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(arr[i])) {
        arr[i] = Number(arr[i])
      }
    }
    return arr
  },

  // 取地址栏单个参数，search带?后面所有字符包括?，空字符串会返回null
  getQueryString: function (search, name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = search.substr(1).match(reg)
    if (r != null && r[2].trim() !== '') return unescape(r[2])
    return null
  },

  uuid: function (len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    let uuid = []
    let i
    radix = radix || chars.length
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      let r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  },
  imgFormat: function (base64, type) {
    const text = window.atob(base64.split(',')[1])
    const buffer = new Uint8Array(text.length)
    for (let i = 0; i < text.length; i++) {
      buffer[i] = text.charCodeAt(i)
    }
    const blob = getBlob([buffer], type)
    const formdata = new FormData()
    formdata.append('file', blob, `blob.${type.split('/')[1]}`)
    return formdata

    function getBlob (buffer, format) {
      try {
        return new Blob(buffer, {type: format})
      } catch (e) {
        const bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)()
        buffer.forEach(function (buf) {
          bb.append(buf)
        })
        return bb.getBlob(format)
      }
    }
  },
  dataUrlToBlob (dataUrl) {
    var arr = dataUrl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
  },
  loadFile: function (file, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      callback(reader.result)
    })
    reader.readAsDataURL(file)
  },

  // 是否手机号
  isPhone: function (str) {
    return /^1\d{10}$/.test(str)
  },

  // 是否邮箱
  isMail: function (str) {
    return /^\b(^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b$/.test(str)
  }
}

module.exports = CommonUtil
