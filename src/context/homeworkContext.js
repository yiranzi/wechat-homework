import React from 'react'
import AxiosUtil from '../util/axios'
var AjaxUtil = {}
let Context = React.createContext()
export const HomeWorkConsumer = Context.Consumer

export class HomeWorkProvider extends React.Component {
  constructor (props) {
    super(props)

    this.ajax = {
      getWork: async (courseId, workId) => {
        let works = await AxiosUtil.get(`/api/work/${courseId}/${workId}`)
        this.setState({
          works
        })
        return works
      },

      getChapterFeedback: async (feedbackId) => {
        let workFeedback = await AxiosUtil.get(`/api/course/getFeedback//${feedbackId}`)
        this.setState({
          workFeedback
        })
        return workFeedback
      },

      getSelfAnswer: async (courseId, workId) => {
        let myAnswer = await AxiosUtil.get(`/api/work/myAnswer/${courseId}/${workId}`)
        this.setState({
          myAnswer
        })
        return myAnswer
      },

      getAnswerList: async (courseId, workId, pn) => {
        let res = await AxiosUtil.get(`/api/work/answerList/${courseId}/${workId}?pn=${pn}`)
        this.setState({
          answerList: res.data,
          totalSize: res.totalSize
        })
      },

      evaluateFeedback: async (evaluateId, score) => {
        let evaluateFeedback = await AxiosUtil.get(`/api/work/evaluateFeedback/${evaluateId}?score=${score}`)
        this.setState({
          evaluateFeedback
        })
        return evaluateFeedback
      },

      setWork: async (courseId, workId, data) => {
        let workComplete = await AxiosUtil.post(`/api/work/workComplete/${courseId}/${workId}`, data)
        this.setState({
          workComplete
        })
        return workComplete
      },

      answerStar: async (workAnswerId) => {
        let answerStar = await AxiosUtil.get(`/api/work/answerStar/${workAnswerId}`)
        this.setState({
          answerStar
        })
        return answerStar
      },

      abv: async (a) => {
        let na = await AxiosUtil.get(`url`)
        this.setState({
          na
        })
        return na
      },

      // -----
      getLearningFootprint: function (courseId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/getLearningFootprint/${courseId}`
        })
      },
      saveFootprint: function (courseId, data) {
        return AjaxUtil({
          type: 'post',
          url: `/api/learning/saveFootprint`,
          data: data
        })
      },
      getCourseMenu: function (courseId, userAgent, ip) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/${courseId}`
        }, userAgent, ip)
      },
      getCoursePage: function (courseId, sectionId, page, userAgent, ip) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/${courseId}/${sectionId}/${page}`
        }, userAgent, ip)
      },
      getWorkList: function (courseId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/workList/${courseId}`
        })
      },



      getQuestionList: function (sectionId, pageNumber, pn) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/pageQuestionList/${sectionId}/${pageNumber}?pn=${pn}`
        })
      },
      getMyQuestionList: function (sectionId, pageNumber) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/myPageQuestionList/${sectionId}/${pageNumber}`
        })
      },
      getQuestionEvaluate: function (questionId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-question/questionEvaluate/${questionId}`
        })
      },
      getResourceByCourseId: function (courseId) {
        return AjaxUtil({
          type: 'get',
          'url': `/api/learning/getResource/${courseId}`
        })
      },


      /* 评论作业答案 */
      commentAnswer: function (workAnswerId, data) {
        return AjaxUtil({
          type: 'post',
          url: `/api/work/commentAnswer/${workAnswerId}`,
          data: data
        })
      },
      /* 评论作业答案 */
      getWorkAnswerEvaluate: function (workAnswerId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/workAnswerEvaluate/${workAnswerId}`
        })
      },

      /* 查看作业答案评论分页列表 */
      commentList: function (workAnswerId, pn) {
        return AjaxUtil({
          type: 'get',
          url: `/api/work/commentList/${workAnswerId}?pn=${pn}`
        })
      },
      setSection: function (courseId, sectionId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/course/sectionComplete/${courseId}/${sectionId}`
        })
      },
      getMyCourse: function (cookie) {
        return AjaxUtil({
          type: 'get',
          url: '/api/learning/myCourse'
        })
      },
      getMyNewCourse: function (cookie) {
        return AjaxUtil({
          type: 'get',
          url: '/api/course/myCourse'
        })
      },
      getTraining: function (id) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning/getTraining/${id}`
        })
      },
      signedAgreement: function (courseId, msg) {
        let url = '/api/learning/signedAgreement/' + courseId
        if (msg) {
          url += '?msg=' + msg
        }
        return AjaxUtil({
          type: 'get',
          url: url
        })
      },
      getTestById: function (testId) {
        return AjaxUtil({
          type: 'get',
          url: `/api/learning-test/getByTestId/${testId}`
        })
      },
      testComplete: function (data) {
        return AjaxUtil({
          type: 'post',
          url: '/api/learning-test/complete',
          data: data
        })
      },
      setChapterFeedback: function (feedbackId, score, content) {
        let url = '/api/course/feedback/' + feedbackId + '?score=' + score
        if (content) {
          url += '&content=' + content
        }
        return AjaxUtil({
          type: 'get',
          url: url
        })
      }

    }

    this.state = {
      works: undefined, //
      workFeedback: undefined, //
      myAnswer: undefined, //
      answerList: undefined, //
      evaluateFeedback: undefined, //
      ajax: this.ajax, // 获取
    }
  }
  // 内部使用的。

  render () {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
