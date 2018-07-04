let ToolsUtil = {}

// 单选题
ToolsUtil.isRadio = function (type) {
  return parseInt(type) === 1
}

// 多选题
ToolsUtil.isCheckBox = function (type) {
  return parseInt(type) === 2
}

// 上传文件
ToolsUtil.isUploader = function (type) {
  return parseInt(type) === 3
}

// 文本题
ToolsUtil.isTextarea = function (type) {
  return parseInt(type) === 4
}

// oss 文件地址
ToolsUtil.ossFile = function () {
  return 'https://xiaozaoresource.xiaozao.org/learning'
}

ToolsUtil.isNewCourseId = function (courseId) {
  const newCourseList = [48, 91, 116, 111, 118, 119, 120, 121, 126, 137, 139, 141, 142, 143, 144, 145, 146]
  let result = newCourseList.find((ele) => {
    return ele === courseId
  })
  if (courseId > 146) {
    result = courseId
  }
  return result
}

ToolsUtil.ifGoNewCourse = function (courseId) {
  courseId = parseInt(courseId)
  let redictUrl = ''
  let host = ''
  let protocol = ''
  host = 'www.xiaozao.org'
  protocol = 'https'
  if (ToolsUtil.isNewCourseId(courseId)) {
    redictUrl = `${protocol}://${host}/learning/${courseId}/?endpoint=${protocol}%3A%2F%2F${host}%2Fapi%2Flrs&actor=%7B%22name%22%3A%5B%22xiaozao%22%5D%2C%22mbox%22%3A%5B%22xiaozao%40xiaozao.org%22%5D%7D`
  }
  return redictUrl
}

ToolsUtil.isMicroMessenger = function (userAgent) {
  userAgent = userAgent || navigator.userAgent
  return /MicroMessager/.test(userAgent)
}

module.exports = ToolsUtil
