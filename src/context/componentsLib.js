import React from 'react'
import AxiosUtil from '../util/axios'
var AjaxUtil = {}

export const Lib = React.createContext()

export class LibProvider extends React.Component {
  constructor (props) {
    super(props)

    this.ajax = {
      getWork: async function (courseId, workId) {
        let works = await AxiosUtil.get(`/api/work/${courseId}/${workId}`)
        this.setState({
          works
        })
        return works
      },

      getChapterFeedback: async function (courseId, workId) {
        let workFeedback = await AxiosUtil.get(`/api/learning/getWorkFeedback/${courseId}/${workId}`)
        this.setState({
          workFeedback
        })
        return workFeedback
      },

      getSelfAnswer: async function (courseId, workId) {
        let myAnswer = await AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`)
        this.setState({
          myAnswer
        })
        return myAnswer
      },

      getAnswerList: async function (courseId, workId, pn) {
        let answerList = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}?pn=${pn}`)
        this.setState({
          answerList
        })
        return answerList
      }

      // -----
      getLearningFootprint: function (courseId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/getLearningFootprint/${courseId}`
        }, cookie)
      },
      saveFootprint: function (courseId, data, cookie) {
        return AjaxUtil({
          type: 'post',
          url: `/api/learning/saveFootprint`,
          data: data
        }, cookie)
      },
      getCourseMenu: function (courseId, cookie, userAgent, ip) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/${courseId}`
        }, cookie, userAgent, ip)
      },
      getCoursePage: function (courseId, sectionId, page, cookie, userAgent, ip) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/${courseId}/${sectionId}/${page}`
        }, cookie, userAgent, ip)
      },
      getWorkList: function (courseId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/workList/${courseId}`
        }, cookie)
      },



      getQuestionList: function (sectionId, pageNumber, pn, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/pageQuestionList/${sectionId}/${pageNumber}?pn=${pn}`
        }, cookie)
      },
      getMyQuestionList: function (sectionId, pageNumber, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/myPageQuestionList/${sectionId}/${pageNumber}`
        }, cookie)
      },
      getQuestionEvaluate: function (questionId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/questionEvaluate/${questionId}`
        }, cookie)
      },
      getResourceByCourseId: function (courseId, cookie) {
        return AjaxUtil({
          type: 'get',
          'url': `/api/learning/getResource/${courseId}`
        }, cookie)
      },
      setWork: function (courseId, workId, data, cookie) {
        return AjaxUtil({
          type: 'post',
          url: `/api/work/workComplete/${courseId}/${workId}`,
          data: data
        }, cookie)
      },
      /* 作业答案点赞 */
      answerStar: function (workAnswerId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/answerStar/${workAnswerId}`
        }, cookie)
      },
      /* 评论作业答案 */
      commentAnswer: function (workAnswerId, data, cookie) {
        return AjaxUtil({
          type: 'post',
          url: `/api/work/commentAnswer/${workAnswerId}`,
          data: data
        }, cookie)
      },
      /* 评论作业答案 */
      getWorkAnswerEvaluate: function (workAnswerId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/workAnswerEvaluate/${workAnswerId}`
        }, cookie)
      },
      evaluateFeedback: function (evaluateId, score, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/evaluateFeedback/${evaluateId}?score=${score}`
        }, cookie)
      },
      /* 查看作业答案评论分页列表 */
      commentList: function (workAnswerId, pn, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/commentList/${workAnswerId}?pn=${pn}`
        }, cookie)
      },
      setSection: function (courseId, sectionId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/sectionComplete/${courseId}/${sectionId}`
        }, cookie)
      },
      getMyCourse: function (cookie) {
        return AjaxUtil({
          type: 'get',
          url: '/api/learning/myCourse'
        }, cookie)
      },
      getMyNewCourse: function (cookie) {
        return AjaxUtil({
          type: 'get',
          url: '/api/course/myCourse'
        }, cookie)
      },
      getTraining: function (id, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/getTraining/${id}`
        }, cookie)
      },
      signedAgreement: function (courseId, msg, cookie) {
        let url = '/api/learning/signedAgreement/' + courseId
        if (msg) {
          url += '?msg=' + msg
        }
        return AjaxUtil({
          type: 'get',
          url: url
        }, cookie)
      },
      getTestById: function (testId, cookie) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-test/getByTestId/${testId}`
        }, cookie)
      },
      testComplete: function (data) {
        return AjaxUtil({
          type: 'post',
          url: '/api/learning-test/complete',
          data: data
        })
      },

      setChapterFeedback: function (courseId, workId, score, content, cookie) {
        let url = '/api/learning/workFeedback/' + courseId + '/' + workId + '?score=' + score
        if (content) {
          url += '&content=' + content
        }
        return AjaxUtil({
          type: 'get',
          url: url
        }, cookie)
      }
    }

    this.state = {
      works: undefined, //
      workFeedback: undefined, //
      myAnswer: undefined, //
      answerList: undefined, //
      ajax: this.ajax, // 获取
    }
    this.vnodeFilter = this.vnodeFilter.bind(this)
  }
  // 内部使用的。

  render () {
    return (
      <Lib.Provider value={this.state}>
        {this.props.children}
      </Lib.Provider>
    )
  }
}
