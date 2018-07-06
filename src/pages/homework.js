import React from 'react'
import ThemeConfig from '../config/theme'
import Header from '../../src/component/learn/homework/header'
import util from '../../src/util/util'
import MyWork from '../../src/component/learn/homework/mywork'
// import Learn401 from '../../src/component/learn/learn401'
import WorkQuestion from '../../src/component/learn/homework/workQuestion'
import Evaluate from '../../src/component/learn/homework/evaluate'

const colorStyle = '#EA9108'

export default class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let {courseId, workId} = util.geUrlParams(this.props.location.search)
    let {works, myAnswer} = this.props.homeworkContext
    let {homeworkContext} = this.props
    return <div>
      <div className='homework-layout'>
        <Header isH5={true} />
        <div className='homework-content'>
          <WorkQuestion homeworkContext={this.props.homeworkContext} works={works} />
          {myAnswer && works && (
            <MyWork
              courseId={courseId}
              workId={workId}
              type={works.type}
              myAnswer={myAnswer}
              homeworkContext={homeworkContext}
            />
          )}
          <Evaluate homeworkContext={this.props.homeworkContext} myAnswer={this.props.homeworkContext.myAnswer} workId={workId} />
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





