import React from 'react'
import {Link} from 'react-router-dom'
import ThemeConfig from '../../../config/theme'
import DateUtil from '../../../util/date'

import { Card, Button, Rate, Modal } from 'antd'

const colorStyle = '#EA9108'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: true
    }
  }
  renderEvaluateLevel (score) {
    if (score >= 9 && score <= 10) {
      return <img src='/static/img/learn/excellent.png' />
    } else if (score >= 7 && score <= 8) {
      return <img src='/static/img/learn/good.png' />
    } else if (score > 0 && score < 7) {
      return <img src='/static/img/learn/commonly.png' />
    }
  }
  handleChange = (value) => {
    const {myAnswer} = this.props
    this.setState({stars: value})
    let content = (
      <div style={{textAlign: 'center'}}>
        <div className='sentence'>你对导师评语的反馈<span style={{color: '#F0A200'}}>{value}星</span>，</div>
        <div className='sentence'>确认提交吗？</div>
        <style jsx>{`
          .sentence {
            display: inline-block;
          }
        `}</style>
      </div>
    )
    const ref = Modal.confirm({
      className: 'submit-star',
      title: '确认反馈',
      content: content,
      iconType: 'iconType',
      okText: '确认提交',
      cancelText: '回去修改',
      onOk: async () => {
        try {
          await this.props.homeworkContext.ajax.evaluateFeedback(myAnswer.learningWorkAnswerEvaluate.id, value)
          this.setState({isEdit: false})
        } catch (error) {
          const status = [10001, 10002]

          if (error && error.status && status.indexOf(error.status) >= 0) {
            this.setState({isEdit: false}, () => {
              ref.destroy()
            })
          }
          console.error(error)
        }
      }
    })
  }
  render () {
    const {myAnswer} = this.props
    if (!myAnswer) { // 已回答
      return null
    }
    if (!!myAnswer && !myAnswer.learningWorkAnswerEvaluate) { // 已回答，未评论
      return null
    }
    const { score, learningWorkAnswerEvaluate } = myAnswer // score是老师给同学打分
    const {isEdit} = this.state
    return (
      <div className='evaluate'>
        <Card>
          <div className='title'>导师评语</div>
          <div className='teacher-evaluate-info'>
            <div className='teacher-avatar'>
              <img src={learningWorkAnswerEvaluate.headimgurl} size='large' />
            </div>
            <div className='teacher-info'>
              <div>{learningWorkAnswerEvaluate.nickname}</div>
              <div>{DateUtil.format(learningWorkAnswerEvaluate.createTime, 'yyyy-MM-dd hh:mm')}</div>
            </div>
            <div className='score'>
              {this.renderEvaluateLevel(score)}
            </div>
          </div>
          <div className='evaluate'>{learningWorkAnswerEvaluate.evaluate}</div>
          <div className='wrap'>
            {learningWorkAnswerEvaluate.score !== null && (
              <div className='my-evaluate'>
                反馈：<Rate value={learningWorkAnswerEvaluate.score} disabled />
              </div>
            )}
            {learningWorkAnswerEvaluate.score === null && (
              <div className='my-evaluate'>
                反馈：<Rate onChange={(value) => this.handleChange(value)} disabled={!isEdit} />
              </div>
            )}
            <Link to={`/learn/otherhomework/${learningWorkAnswerEvaluate.courseId}/${this.props.workId}/1`}>
                <Button type='primary' className='show-all'>查看其他同学的回答</Button>
            </Link>
          </div>
        </Card>
        <style jsx>{`
          .title {
            color: #666;
            font-size: ${ThemeConfig.size.title};
            position: relative;
            padding-left: 8px;
          }
          .title::before {
            content: '';
            width: 2px;
            height: 14px;
            background-color: #F0A200;
            position: absolute;
            left: 0;
            top: 4px;
          }
          .teacher-evaluate-info {
            margin-top: 20px;
            font-size: 15px;
            color: #333;
            display: flex;
            justify-content: space-around;
          }
          .teacher-avatar img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
          }
          .teacher-info {
            flex: 2;
            margin-left: 10px;
          }
          .evaluate {
            font-size: 15px;
            margin-top: 20px;
          }
          .wrap {
            border-top: 1px solid #E6E6E6;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding-top: 20px;
          }
          .score img {
            width: 80%;
          }
          .my-evaluate {
            display: flex;
            align-items: center;
          }
          /* 宽度小于640px, 链接100%显示 */
          @media screen and (max-width: 640px) {
            a {
              width: 100%;
            }
          }
        `}</style>
        <style global jsx>{`
          .evaluate .ant-card {
            margin-top: 20px;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
          }
          .evaluate .ant-card .question img {
            max-width: 100%;
          }
          /* 对导师评语评价弹框样式 */
          .ant-confirm-body .ant-confirm-title {
            color: #F0A200;
            font-size: 20px;
            text-align: center;
          }
          .ant-confirm-body .ant-confirm-content {
            margin: 0;
            font-size: 20px;
            margin-top: 20px;
          }
          .ant-confirm .ant-confirm-btns {
            float: none;
            margin-top: 50px;
            display: flex;
            justify-content: space-around;
          }
          .ant-confirm-btns button.ant-btn {
            border-color: ${colorStyle};
            color: ${colorStyle};
            width: 116px;
            font-size: ${ThemeConfig.size.title};
          }
          .ant-confirm-btns button.ant-btn.ant-btn-primary {
            color: ${ThemeConfig.color.white};
          }
          /* 星星颜色 */
          .ant-rate {
            color: ${colorStyle};
          }
          .evaluate .show-all {
            margin-top: 20px;
          }
        `}</style>
      </div>
    )
  }
}
