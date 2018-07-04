const environment = {
  'development': {
    'url': 'http://localhost:3000'
  },
  'rc': {
    'url': 'https://rcwx.review.xiaozao.org',
    'wechatConfig': {
      'appId': 'wx9d5d40cfa33f1085',
      'authUrl': 'https://rcwx.review.xiaozao.org/auth/login'
    }
  },
  'production': {
    'url': 'https://wx.xiaozao.org',
    'wechatConfig': {
      'appId': 'wx969f487a45509862',
      'authUrl': 'https://wx.xiaozao.org/auth/login'
    }
  }
}

module.exports = environment
