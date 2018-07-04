const DateUtil = {
  // 格式化日期
  format: function (date, fmt) {
    if (typeof date === 'string' || typeof date === 'number') {
      date = new Date(date)
    }
    // yyyy-MM-dd hh:mm:ss
    // yyyy年MM月dd日 hh时mm分ss秒S毫秒 第q季度
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },

  beginningOfDate: function (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  },
  toLocalTime: function (time) {
    let d = new Date(time)
    let offset = (new Date().getTimezoneOffset()) * -1
    let n = new Date(d.getTime() + offset * 1000 * 60)
    return n
  },
  diffDay: function (dateStr) {
    if (dateStr) {
      let d1 = this.format(new Date(dateStr.replace(/-/g, '/').replace(/T/g, ' ')), 'yyyy-MM-dd')
      let d2 = this.format(new Date(), 'yyyy-MM-dd')
      d1 = new Date(d1)
      d2 = new Date(d2)
      var days = d1.getTime() - d2.getTime()
      var time = parseInt(days / (1000 * 60 * 60 * 24))
      return time
    }
  },

  diffTime: function (dateStr1, dateStr2) {
    let d1 = this.format(new Date(dateStr1.replace(/-/g, '/').replace(/T/g, ' ')), 'yyyy-MM-dd hh:mm:ss')
    let d2 = this.format(new Date(dateStr2.replace(/-/g, '/').replace(/T/g, ' ')), 'yyyy-MM-dd hh:mm:ss')
    d1 = new Date(d1)
    d2 = new Date(d2)
    var time = d1.getTime() - d2.getTime()
    return time
  },

  coverStrToDate: function (dateStr) {
    return new Date(dateStr.replace(/-/g, '/').replace(/T/g, ' '))
  },

  formatStrToDate: function (dataStr, fmt) {
    return this.format(this.coverStrToDate(dataStr), fmt)
  }
}

export default DateUtil
