import AxiosUtil from './axios'

let wxConfig = {}
wxConfig.readyPromise = new Promise((resolve, reject) => {
  wxConfig.readyPromiseResolve = resolve
})
wxConfig.initConfig = () => {
  return new Promise((resolve, reject) => {
    const url = `/api/wxconfig/getWXConfig?url=${encodeURIComponent(window.location.href.split('#')[0])}`
    AxiosUtil.get(url).then(config => {
      config.jsApiList = [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
      ]
      // eslint-disable-next-line
      wx.config(config)
      // eslint-disable-next-line
      wx.ready(function () {
        wxConfig.readyPromiseResolve()
        resolve()
      })
      // eslint-disable-next-line
      wx.error(function (res) {
        // console.error(res)
        alert('微信认证失败' + res)
        resolve()
      })
    })
  })
}

wxConfig.callSdk = (type, obj) => {
  wxConfig.readyPromise.then(() => {
    wxConfig.setShare(obj)
  })
}

wxConfig.setShare = async function (obj) {
  let shareInfo = obj || {
    title: '小灶能力派',
    desc: '【小灶能力派】邀请我们一起来提升能力！',
    link: `https://${window.location.host}`
  }
  let {title, desc, link = window.location.href, imgUrl, success, cancel} = shareInfo
  // eslint-disable-next-line
  wx.onMenuShareTimeline({
    title: title,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { success('onMenuShareTimeline') }
    },
    cancel: function () {
      if (cancel) { cancel() }
    }
  })
  // eslint-disable-next-line
  wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { success() }
    },
    cancel: function () {
      if (cancel) { cancel() }
    }
  })
  // eslint-disable-next-line
  wx.onMenuShareQQ({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { success() }
    },
    cancel: function () {
      if (cancel) { cancel() }
    }
  })
  // eslint-disable-next-line
  wx.onMenuShareWeibo({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { success() }
    },
    cancel: function () {
      if (cancel) { cancel() }
    }
  })
  // eslint-disable-next-line
  wx.onMenuShareQZone({
    title: title,
    desc: desc,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { success() }
    },
    cancel: function () {
      if (cancel) { cancel() }
    }
  })
}

export default wxConfig
