import moment from '../static/moment'
let buyUtil = {}

buyUtil.needRedict = (paymentDetail) => {
    return (moment.utc(paymentDetail.sku.endTime).isBefore(moment().utcOffset(8).format()))
}

buyUtil.formatDetail = (paymentDetail) => {
  // 是否需要重定向。
  // 处理富文本。
  paymentDetail.detailList.forEach((detail, index) => {
    if (detail && detail.content) {
      if (detail.content.includes("{")) {
        detail.content = JSON.parse(detail.content)
      }
    }
  })
  if (paymentDetail.sku.custom) {
    paymentDetail.sku.custom = JSON.parse(paymentDetail.sku.custom)
    if (paymentDetail.sku.custom.course.startTime) {
      paymentDetail.sku.custom.course.startTime = moment.utc(paymentDetail.sku.custom.course.startTime).format('YYYY年MM月DD日')
    }
  }
  // 时间标准化
  paymentDetail.sku.endTime = moment.utc(paymentDetail.sku.endTime).format('YYYY年MM月DD日')
  return paymentDetail
}


export default buyUtil;