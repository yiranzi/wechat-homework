import React from 'react'
import ThemeConfig from '../../config/theme'
import Layout from '../../src/component/layoutN'
import LearnCourseAction from '../../src/action/learn/course'
import CommonUtil from '../../src/util/common'
import Header from '../../src/component/learn/homework/header'
import MyWork from '../../src/component/learn/homework/mywork'
import Learn401 from '../../src/component/learn/learn401'
import WorkQuestion from '../../src/component/learn/homework/workQuestion'
import Evaluate from '../../src/component/learn/homework/evaluate'
import Feedback from '../../src/component/learn/homework/feedback'

const colorStyle = '#EA9108'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      myAnswer: {}
    }
  }
  static async getInitialProps ({req}) {
    let {appData} = req
    const {isH5} = appData ? appData.browser : {}
    const {courseId, workId} = req.params
    try {
      // 本章作业
      let works = await LearnCourseAction.getWork(courseId, workId, req.cookies)
      works = works.response
      let workFeedback = await LearnCourseAction.getChapterFeedback(courseId, workId, req.cookies)
      workFeedback = workFeedback.response
      return {
        isH5,
        courseId,
        workId,
        works,
        workFeedback
      }
    } catch (error) {
      if (error.status === 401) {
        return {
          error
        }
      }
    }
  }
  componentDidMount () {
    if (this.props.error) { return }
    const {works} = this.props
    if (works.answer) {
      this.loadMyAnswer()
    } else {
      this.setState({myAnswer: 'nodata'})
    }
  }

  async loadMyAnswer () {
    const {courseId, workId} = this.props
    let myAnswer = await LearnCourseAction.getSelfAnswer(courseId, workId)
    myAnswer = myAnswer.response
    this.setState({myAnswer: myAnswer})
  }

  render () {
    const {error} = this.props
    if (error) { return <Learn401 /> }
    const {courseId, workId, works, isH5} = this.props
    const {myAnswer} = this.state
    return (
      <Layout>
        <div className='homework-layout'>
          <Header isH5={isH5} />
          <div className='homework-content'>
            <WorkQuestion works={works} />
            {!CommonUtil.isEmpty(myAnswer) && (
              <MyWork
                courseId={courseId}
                workId={workId}
                type={works.type}
                myAnswer={this.state.myAnswer}
                reloadData={() => this.loadMyAnswer()}
              />
            )}
            <Evaluate myAnswer={myAnswer} workId={this.props.workId} />
            <Feedback courseId={this.props.courseId} workId={this.props.workId} feedback={this.props.workFeedback} />
          </div>
        </div>
        <style jsx>{`
          .homework-layout {
            background: #F7F9FB;
            min-height: 100vh;
          }
          .homework-content {
            max-width: 740px;
            width: 100%;
            margin: auto;
            padding: 0 15px 15px 15px;
          }
        `}</style>
        <style global jsx>{`
          .ant-card {
            margin-top: 20px;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
          }
          /* button 主要样式 */
          .ant-btn {
            height: 44px;
            border-radius: 2px;
            font-size: ${ThemeConfig.size.title};
          }
          .ant-btn.ant-btn-primary {
            background: ${colorStyle};
            border-color: ${colorStyle};
            color: ${ThemeConfig.color.white};
          }
          .ant-btn.default {
            border-color: ${colorStyle};
            color: ${colorStyle};
          }
          /* 宽度小于640px, 按钮全部100%显示 */
          @media screen and (max-width: 640px) {
            .ant-btn {
              width: 100% !important;
            }
          }
        `}</style>
      </Layout>
    )
  }
}
