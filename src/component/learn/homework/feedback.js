import React from 'react'
import { Card, Input, Row, Col, Button, Modal, Rate } from 'antd'
import ThemeConfig from '../../../config/theme'
import CommonUtil from '../../../util/common'
import LearnCourseAction from '../../../action/learn/course'

const colorStyle = '#F0A200' // 黄色主色

export default class extends React.Component {
  constructor (props) {
    super(props)
    let feedback = {
      feedbackId: this.props.feedbackId,
      score: 0,
      content: null
    }
    let haveFeedback
    if (this.props.feedback) {
      feedback = this.props.feedback
      haveFeedback = true
    }
    this.state = {
      haveFeedback: haveFeedback,
      feedback: feedback,
      feedbackContent: ['', '（选填）好吧，勇敢说出来，我不会打小报告的～',
        '（选填）额，一定有什么地方讲的不好的，写下来，我们一定去改进～',
        '（选填）哪些地方让你印象深刻，写下来，我去告诉老师，让TA美一下～']
    }
    this.selectFeedback = this.selectFeedback.bind(this)
  }

  handleChange (e) {
    let {feedback} = this.state
    feedback.content = e.target.value
    this.setState({
      feedback: feedback
    })
  }

  selectFeedback (value) {
    let {feedback} = this.state
    feedback.score = value
    this.setState({
      feedback: feedback
    })
  }

  async submit () {
    const {feedback} = this.state
    const fbStr = ['', '很差', '一般', '很好']
    const content = (
      <div style={{textAlign: 'center'}}>
        <div className='sentence'>你对本章内容的反馈是 <span style={{color: '#F0A200'}}>{fbStr[feedback.score]}</span> ，确认提交吗？</div>
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
          await LearnCourseAction.setChapterFeedback(feedback.feedbackId, feedback.score, feedback.content)
          feedback.id = 1
          this.setState({
            feedback,
            haveFeedback: true
          })
        } catch (error) {
          const status = [10001]

          if (error && error.status && status.indexOf(error.status) >= 0) {
            this.setState({}, () => {
              ref.destroy()
            })
          }
        }
      }
    })
  }

  render () {
    const {feedback} = this.state
    return (
      <div className='my-work feedback'>
        <Card className='title-card' bordered={false}>
          <h1 className=''>章节内容反馈</h1>
          <div className='border'>
            <h3 className='my-text-center fb-title'>
              {!feedback.id && '花5秒钟给本章做个反馈吧～'}
              {feedback.id && '撒花！你已经完成反馈，继续好好学习哦~'}
            </h3>
            <Row className='block1'>
              <Col span={7} sm={7} xs={24} className='fb-tips'>觉得本章教学内容如何？</Col>
              <Col span={10} sm={10} xs={24} className='my-text-center'>
                <Row>
                  <Rate onChange={this.selectFeedback} defaultValue={this.state.feedback.score} disabled={this.state.haveFeedback} />
                </Row>
              </Col>
              {!feedback.id &&
              <Col span={7} sm={7} xs={24} className='my-text-right fb-btn-col'>
                {feedback.score === 0 && <Button className='fb-btn' disabled title='请先选择反馈类型'>提交</Button>}
                {feedback.score !== 0 && <Button className='fb-btn submit' type='default' onClick={() => { this.submit() }}>提交</Button>}
              </Col>
              }
            </Row>
            {!feedback.id && feedback.score !== 0 &&
            <Row>
              <Col span={24}>
                <Input type='textarea'
                       rows={5}
                       className='feedback-input'
                       maxLength={500}
                       placeholder={this.state.feedbackContent[this.state.feedback.score]}
                       onChange={(e) => { this.handleChange(e) }}
                />
              </Col>
            </Row>
            }
            {feedback.id &&
            <Row>
              <Col span={24}>
                <div className='feedback-input' dangerouslySetInnerHTML={{__html: CommonUtil.replaceAll(feedback.content || '', '\n', '<br />')}} />
              </Col>
            </Row>
            }
          </div>
        </Card>
        <style jsx>{`
          .border {
            border: 1px solid #E6E6E6;
            padding: 30px;
            margin-top: 20px;
          }
          .fb-title {
            font-size: ${ThemeConfig.size.large};
            color: ${colorStyle};
          }
        `}</style>
        <style global jsx>{`
          .block1 {
            margin: 20px 0;
          }
          .fb-icon {
            display: block;
            text-align: center;
          }
          .fb1, .fb2, .fb3 {
            display: inline-block;
            width: 62px;
            height: 62px;
            background-size: 62px;
            padding-top: 62px;
            text-align: center;
            font-style: normal;
          }
          .ed {
            cursor: pointer;
          }
          .fb1 img, .fb2 img, .fb3 img {
            width: 0px;
          }
          .fb1 {
            background-image: url('/static/img/learn/fb1.png');
          }
          .fb1.select1,
          .fb1.ed:hover {
            background-image: url('/static/img/learn/fb1_active.png');
            color: red;
          }
          .fb2 {
            background-image: url('/static/img/learn/fb2.png');
          }
          .fb2.select2,
          .fb2.ed:hover {
            background-image: url('/static/img/learn/fb2_active.png');
            color: ${colorStyle};
          }
          .fb3 {
            background-image: url('/static/img/learn/fb3.png');
          }
          .fb3.select3,
          .fb3.ed:hover {
            background-image: url('/static/img/learn/fb3_active.png');
            color: ${colorStyle};
          }
          .feedback-input {
            background-color: #f3f3f3;
            border: 0;
            border-radius: 0;
            padding: 20px;
            resize: none;
            font-size: ${ThemeConfig.size.normal};
            color: ${ThemeConfig.color.black};
            min-height: 145px;
          }
          .feedback .ant-btn.fb-btn {
            width: 100px;
            height: 40px;
            font-size: ${ThemeConfig.size.title};
          }
          .feedback .ant-btn.submit {
            border-color: ${colorStyle};
            color: ${colorStyle};
          }
          .fb-tips {
            color: ${ThemeConfig.color.black};
            font-size: ${ThemeConfig.size.normal};
            line-height: 80px;
          }
          .fb-btn-col {
            line-height: 80px;
          }
          @media screen and (max-width: 768px) {
            .fb-tips {
              line-height: 40px;
              text-align: center;
            }
            .fb-btn-col {
              line-height: 40px;
              margin-top: 20px;
              text-align: center !important;
            }
          }
          .my-text-center {
            text-align: center;
          }
          .my-text-right {
            text-align: right;
          }
          /* 对导师评语评价弹框样式 */
          .ant-confirm-body .ant-confirm-title {
            color: #F0A200;
            font-size: 20px;
            text-align: center;
            display: block;
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
        `}</style>
      </div>
    )
  }
}
