import React from 'react'
import ThemeConfig from '../config/theme'
import Header from '../../src/component/learn/homework/header'
import util from '../../src/util/util'
import OtherWork from '../../src/component/learn/homework/otherwork'

export default class extends React.Component {
  componentDidMount () {
    this.updateAnswerList()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.updateAnswerList()
    }
  }

  updateAnswerList () {
    console.log('updateAnswerList')
    let {courseId, workId, pn} = util.geUrlParams(this.props.location.search)
    this.props.homeworkContext.ajax.getAnswerList(courseId, workId, pn)
  }

  // 相应操作
  clickPageNumber (index) {
    let {pageNumber, courseId, workId} = this.props
    let newPage = parseInt(pageNumber) + index
    this.props.history.replace(`/homework/other?courseId=${courseId}&workId={workId}&pn=${newPage}`)
  }

  // 点赞
  clickStar = (workAnswerId) => {
    this.props.homeworkContext.ajax.answerStar(workAnswerId)
  }

  goRouter () {
    let {courseId, workId} = this.props
    window.history.replaceState(null, '', `/learn/homework/${courseId}/${workId}`)
    window.history.go(0)
  }

  render () {
    return (
      <div>
        <div className='homework-layout'>
          {/* 这个header一直需要返回 */}
          <Header title='返回我的作业' goRouter={() => { this.goRouter() }} />
          <div className='homework-content'>
            <OtherWork {...this.props} clickPageNumber={(index) => { this.clickPageNumber(index) }} clickStar={(index) => { this.clickStar(index) }} />
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
            box-shadow: 0px 1px 6px rgba(0,0,0,.2);
          }
          .ant-card:hover {
            box-shadow: 0px 1px 10px rgba(0,0,0,.2) !important;
          }
        `}</style>
      </div>
    )
  }
}
