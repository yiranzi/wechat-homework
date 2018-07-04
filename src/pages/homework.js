import React from 'react'
import ThemeConfig from '../config/theme'
import Header from '../../src/component/learn/homework/header'
import util from '../../src/util/util'
import {HomeWorkConsumer} from '../context/homeworkContext'
import MyWork from '../../src/component/learn/homework/mywork'
// import Learn401 from '../../src/component/learn/learn401'
import WorkQuestion from '../../src/component/learn/homework/workQuestion'
import Evaluate from '../../src/component/learn/homework/evaluate'
// import Feedback from '../../src/component/learn/homework/feedback'

const colorStyle = '#EA9108'

export class HomeWorkPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      courseId: undefined,
      workId: undefined
    }
  }

  componentDidMount = async () => {
    let params = util.geUrlParams()
    let {courseId, workId} = params
    this.setState({
      courseId, workId
    })
    let works = await this.props.homeworkContext.ajax.getWork(courseId, workId)
    if (works.answer) {
      this.props.homeworkContext.ajax.getSelfAnswer(courseId, workId)
    }
    this.props.homeworkContext.ajax.getChapterFeedback(courseId, workId)
  }

  render () {
    return <div>
      <div className='homework-layout'>
        <Header isH5={true} />
        <div className='homework-content'>
          <WorkQuestion homeworkContext={this.props.homeworkContext} works={this.props.homeworkContext.works} />
          {/*{!myAnswer && (*/}
            {/*<MyWork*/}
              {/*courseId={courseId}*/}
              {/*workId={workId}*/}
              {/*type={works.type}*/}
              {/*myAnswer={this.state.myAnswer}*/}
              {/*reloadData={() => this.loadMyAnswer()}*/}
            {/*/>*/}
          {/*)}*/}
          <Evaluate homeworkContext={this.props.homeworkContext} myAnswer={this.props.homeworkContext.myAnswer} workId={this.state.workId} />
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
    </div>
  }
}

export default function (props) {
  return <HomeWorkConsumer>
    {homeworkContext => (<HomeWorkPage homeworkContext={homeworkContext} {...props} />)}
  </HomeWorkConsumer>
}




