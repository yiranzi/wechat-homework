import Env from '../config/environment'

export default function auth (params) {
  let host = window.location.host
  const env = host.includes('rcwx') ? 'rc' : 'production'

  let { wechatConfig } = Env[env]

  var {authUrl, appId} = wechatConfig
  // fixUrl
  var redictPage = window.location.pathname + '?' + window.location.hash
  const redictUrl = encodeURIComponent(`${authUrl}?redirectURI=${redictPage}`)
  const result = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redictUrl}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
  window.location.href = result
}
