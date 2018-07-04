import React from 'react'
import ThemeConfig from '../config/theme'
import Header from '../../src/component/learn/homework/header'
// import MyWork from '../../src/component/learn/homework/mywork'
// import Learn401 from '../../src/component/learn/learn401'
// import WorkQuestion from '../../src/component/learn/homework/workQuestion'
// import Evaluate from '../../src/component/learn/homework/evaluate'
// import Feedback from '../../src/component/learn/homework/feedback'

const colorStyle = '#EA9108'

export class HomeWorkPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount = async () => {
    let works = await this.props.homeworkContext.ajax.getWork(courseId, workId)
    if (works.answer) {
      this.props.homeworkContext.ajax.getSelfAnswer(courseId, workId)
    }
    this.props.homeworkContext.ajax.getChapterFeedback(courseId, workId)
  }

  render () {
    const {error} = this.props
    if (error) { return <Learn401 /> }
    const {courseId, workId, works, isH5} = this.props
    const {myAnswer} = this.props.homeworkContext
    return (
      <div>
        <div className='homework-layout'>
          <Header isH5={isH5} />
          <div className='homework-content'>
            <WorkQuestion works={works} />
            {!myAnswer && (
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
      </div>
    )
  }
}

export default function (props) {
  return <Lib.Consumer>
    {homeworkContext => (<HomeWorkPage homeworkContext={homeworkContext} {...props} />)}
  </Lib.Consumer>
}




