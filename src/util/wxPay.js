import AxiosUtil from './axios'

let wxPay = {}

wxPay.pay = (orderInfo) => {
  const wxPaytype = '3'
  orderInfo.paymentMethod = wxPaytype
  let promise = AxiosUtil.post('/api/payment/unifiedOrder', orderInfo).then(result => {
    if (result) {
      result = JSON.parse(result)
      return wxPay.invokeWxPay(result)
    } else {
      return Promise.resolve('free')
    }
  })
  return promise
}

wxPay.invokeWxPay = (payInfo) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', (payInfo) => { wxPay.onBridgeReady(payInfo) }, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', (payInfo) => { wxPay.onBridgeReady(payInfo) })
        document.attachEvent('onWeixinJSBridgeReady', (payInfo) => { wxPay.onBridgeReady(payInfo) })
      }
    } else {
      let {appId, nonceStr, paySign, timeStamp, prepayId} = payInfo
      // eslint-disable-next-line
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': appId,
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': `prepay_id=${prepayId}`,
          'signType': 'MD5',
          'paySign': paySign
        },
        function (res) {
          let json = {state: 'unknown', message: '未知错误'}
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            resolve('success')
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            reject('支付取消')
          } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
            reject('支付失败')
          } else {
            reject('支付失败!')
          }
        }
      )
    }
  })
}

export default wxPay
