import React from 'react'
import Link from 'next/link'
import {MyTextArea, MyUploader} from './workItem'
import ThemeConfig from '../../../../config/theme'
import ToolsUtil from '../../../util/tools'
import CommonUtil from '../../../util/common'
import LearnCourseAction from '../../../../src/action/learn/course'
import { Button, Card } from 'antd'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: !this.props.myAnswer.answer,
      value: ''
    }
  }
  async submit () {
    let {value} = this.state
    let {courseId, workId} = this.props
    try {
      this.setState({isEdit: false})
      await LearnCourseAction.setWork(courseId, workId, value)
      this.props.reloadData()
    } catch (error) {
      this.setState({isEdit: true})
    }
  }
  isEditActionGroup (type) {
    const {value} = this.state
    if (ToolsUtil.isTextarea(type)) {
      return (
        <div className='action-group'>
          {!!value && <Button className='submit' type='primary' onClick={() => { this.submit() }}>提交答案</Button>}
          {!value && <Button className='submit' disabled>提交答案</Button>}
          <style jsx>{`
            .action-group {
              float: right;
              text-align: right;
              margin-top: -33px;
            }
          `}</style>
          <style global jsx>{`
            .work-item .action-group .ant-btn.submit {
              width: 126px;
              font-size: ${ThemeConfig.size.title};
            }
            .work-item .action-group button[disabled].submit {
              background: #AAAAAA;
              color: white;
            }
          `}</style>
        </div>
      )
    }
    return null
  }
  isShowActionGroup (type) {
    return (
      <div className='action-group'>
        <Link href={`/learn/otherhomework/${this.props.courseId}/${this.props.workId}/1`}>
          <a>
            <Button className='show-all' type='primary'>查看其他同学的回答</Button>
          </a>
        </Link>
        <Button className='edit-mine default' onClick={() => this.setState({isEdit: true})}>我要优化答案</Button>
        <style jsx>{`
          .action-group {
            margin-top: 20px;
            text-align: right;
            border-top: 1px solid #E6E6E6;
            padding-top: 20px;
          }
        `}</style>
        <style global jsx>{`
          .work-item .action-group .ant-btn{
            height: 44px;
            border-radius: 2px;
            font-size: ${ThemeConfig.size.title};
          }
          .work-item .action-group .ant-btn.show-all {
            width: 180px;
          }
          .work-item .action-group .ant-btn.edit-mine {
            width: 126px;
            margin-left: 20px;
          }
          @media screen and (max-width: 640px) {
            .work-item .action-group .ant-btn.edit-mine {
              margin-left: 0;
              margin-top: 10px;
            }
          }
        `}</style>
      </div>
    )
  }
  renderActionGroup (isEdit, type) {
    const {myAnswer} = this.props
    if (!!myAnswer && !!myAnswer.learningWorkAnswerEvaluate) { // 如果导师有评论，那就不展示操作按钮
      return null
    }
    if (CommonUtil.isEmpty(isEdit)) {
      return null
    }
    if (isEdit) {
      return this.isEditActionGroup(type)
    } else {
      return this.isShowActionGroup(type)
    }
  }
  handleChange (value) {
    this.setState({value: value})
  }
  render () {
    const {courseId, workId, type, myAnswer} = this.props
    const {isEdit} = this.state
    return (
      <Card className='work-item'>
        {ToolsUtil.isTextarea(type) && (
          <MyTextArea
            isEdit={isEdit}
            defaultValue={(myAnswer && myAnswer.answer) || ''}
            onChange={(value) => this.handleChange(value)}
          />
        )}
        {ToolsUtil.isUploader(type) && (
          <MyUploader
            courseId={courseId}
            workId={workId}
            defaultValue={myAnswer.answer}
            isEdit={isEdit}
            onChange={() => { this.setState({isEdit: false}) }}
          />
        )}
        {this.renderActionGroup(isEdit, type)}
      </Card>
    )
  }
}
