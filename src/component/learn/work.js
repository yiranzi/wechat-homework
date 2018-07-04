import React from 'react'
import PropTypes from 'prop-types'
import ThemeConfig from '../../../config/theme'
import {Button, message, Upload, Rate, Input} from 'antd'
import DateUtil from '../../util/date'
import CommonUtil from '../../util/common'
import LearnCourseAction from '../../action/learn/course'
import ToolsUtil from '../../util/tools'

export default class Work extends React.Component {
  static propTypes = {
    courseId: PropTypes.string,
    work: PropTypes.object,
    setWork: PropTypes.func
  };

  constructor (props) {
    super(props)
    const {work} = this.props
    this.state = {
      answer: work.answer || '',
      editorState: !work.answer,
      answerTextLength: 5000,
      evaluate: null,
      showEvaluate: false,
      evaluateObj: null
    }
  }

  componentDidMount () {
    const {work} = this.props
    work.answer && this.loadEvaluate()
  }

  componentWillReceiveProps = (nextProps) => {
    const {work} = this.props
    if (work !== nextProps.work) {
      this.state = {
        editorState: !nextProps.work.answer
      }
    }
  }

  /* 加载导师点评 */
  loadEvaluate = async () => {
    let {evaluateObj} = this.state
    if (!evaluateObj) {
      try {
        let {answerId} = this.props.work
        const evaluate = await LearnCourseAction.getWorkAnswerEvaluate(answerId)
        evaluateObj = evaluate.response
        this.setState({evaluateObj: evaluateObj})
      } catch (err) {
        console.error(err)
      }
    }
  }

  changeEditorState = () => {
    const {editorState} = this.state
    this.setState({
      editorState: !editorState
    })
  };

  setWork = () => {
    const {setWork, work} = this.props
    let {answer} = this.state
    if (answer.length === 0) {
      return
    }
    setWork({
      id: work.id,
      answer: answer
    })
    const obj = {
      editorState: false,
      answer: answer
    }
    this.setState(obj)
  }

  answerChange (e) {
    if (e.target.value.length > this.state.answerTextLength) {
      return
    }
    this.setState({
      answer: e.target.value
    })
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .rdw-editor-main,
        .work .demo-wrapper,
        .demo-editor.rdw-editor-main {
          border: 1px solid #F1F1F1;
          height: auto!important;
        }
        .rdw-option-wrapper {
          height: auto!important;
        }
        .DraftEditor-editorContainer {
          min-height: 100px!important;
        }
        .rdw-image-modal-header-option:nth-child(2) {
          display: none!important;
        }
        .rdw-image-modal-upload-option-label {
          overflow: auto;
        }
        .rdw-image-alignment-options-popup {
          display: none!important;
        }
    `}</style>
    )
  }

  uploadChange (file, filelist, event) {
    const fileResponse = file.file
    const fileStatus = fileResponse.status
    // const uploadResponse = fileResponse.response

    if (fileStatus === 'done') {
      // const uploadStatus = uploadResponse.status
      // const uploadMessage = uploadResponse.message
      location.reload()
    }
  }

  handleFeedBack = async (id, value) => {
    try {
      await LearnCourseAction.evaluateFeedback(id, value)
      this.state.evaluateObj.score = value
      this.setState({evaluateObj: this.state.evaluateObj})
      message.success('给导师打分成功')
    } catch (err) {
      console.error(err)
    }
  }

  renderEvaluate = () => {
    const {work} = this.props
    const {evaluateObj} = this.state
    if (evaluateObj) {
      return (
        <div className='evaluate-block'>
          <h4>导师点评：<small>({work.score}分)</small></h4>
          <h3 className='name'><img className='headimg' src={evaluateObj.headimgurl} />{evaluateObj.nickname}&emsp;&emsp;
            {DateUtil.format(DateUtil.coverStrToDate(evaluateObj.createTime), 'yyyy-MM-dd hh:mm')}&emsp;
          </h3>
          <p className='content' dangerouslySetInnerHTML={{__html: CommonUtil.replaceAll(evaluateObj.evaluate, '\n', '<br />')}} />
          <div title='给导师打分'><Rate count={5} value={evaluateObj.score} disabled={!!evaluateObj.score} onChange={(value) => {
            this.handleFeedBack(evaluateObj.id, value)
          }} /></div>
          <style jsx>{`
            .evaluate-block {
              border: 1px solid #ddd;
              background-color: ${ThemeConfig.color.bg_gray};
              border-radius: 3px;
              padding: 5px 10px;
              text-align: left;
              margin: 15px 0;
            }
            .evaluate-block .content {
              background-color: #fff;
              padding: 5px;
              margin: 5px 0;
            }
            .evaluate-block .name {
              font-size: ${ThemeConfig.size.title};
              font-weight: 500;
            }
            .headimg {
              width: 22px;
              vertical-align: middle;
              margin-right: 5px;
              border-radius: 15px;
            }
          `}</style>
        </div>
      )
    }
  };

  render () {
    const {courseId, work} = this.props
    const {answer, editorState, answerTextLength} = this.state
    return (
      <div>
        <div className='work'>
          <h3 className='title'>课间思考作业</h3>
          <h4 className='question'><div dangerouslySetInnerHTML={{__html: work.question}} /></h4>
          {!editorState &&
          <div className='answer'>
            <h4>我的回答：</h4>
            {work.type === 3 &&
            <div>
              {CommonUtil.isImg(work.answer) &&
                <img className='work-img'
                  src={ToolsUtil.ossFile() + '/workFile/' + work.answer} />
              }
              {!CommonUtil.isImg(work.answer) &&
                <a target='_blank' href={ToolsUtil.ossFile() + '/workFile/' + work.answer}>
                  点击下载该答案
                </a>
              }
            </div>
            }
            {work.type === 4 &&
            <div>
              <div dangerouslySetInnerHTML={{__html: CommonUtil.replaceAll(work.answer, '\n', '<br />')}} />
            </div>
            }
            {work.type === 5 &&
            <div className='work-audio-block'>
              <video className='work-audio' controls='controls' src={ToolsUtil.ossFile() + '/workAudio/' + work.answer + '.mp3'} />
              <span className='hidden-download' />
            </div>
            }
          </div>
          }
          {editorState &&
            <div>
              {work.type === 4 &&
                <div>
                  <Input type='textarea' rows={8} onChange={e => this.answerChange(e)} value={answer} />
                  <div className='my-text-right'>
                    <span style={{color: 'red'}}>
                      {answer.length === 0 && '作业内容不能为空'}
                      {answer.length >= this.state.answerTextLength && ('作业内容长度不能超过' + this.state.answerTextLength)}
                    </span>
                    &emsp;&emsp;已输入
                    <span ref='answer_entered'>{answer ? answer.length : 0}</span>/{answerTextLength}</div>
                </div>
              }
            </div>
          }

          {editorState && work.type !== 5 &&
          <div className='my-text-right btn-box'>
            {work.answer && <Button className='btn' size='large' onClick={this.changeEditorState}>取消</Button>}&emsp;
            {work.type === 4 &&
              <Button type='primary' className='btn' size='large' onClick={this.setWork}>提交答案</Button>
            }
            {work.type === 3 &&
              <Upload
                name='file'
                action={'/api/work/workFileComplete/' + courseId + '/' + work.id}
                showUploadList={false}
                onChange={(file, filelist, event) => this.uploadChange(file, filelist, event)}
              >
                <Button type='primary' size='large'>上传作业答案</Button>
              </Upload>
            }
          </div>
          }
          {!editorState &&
          <div className='my-text-right btn-box'>
            {this.renderEvaluate()}
            <a href={'/learn/answerlist/' + courseId + '/' + work.id} target='_blank'><Button type='primary' className='btn' size='large'>查看其他同学的回答</Button></a>
            {work.type !== 5 && this.state.evaluateObj === null && <span>&emsp;<Button className='btn' size='large' onClick={this.changeEditorState}>修改答案</Button></span>}
            {work.type === 5 && <small>&emsp;注：只能在移动端修改录音作业</small>}
          </div>
          }
        </div>
        <style jsx>{`
          .title {
            color: ${ThemeConfig.color.primary};
          }
          .work {
            padding: 15px 0 0;
          }
          .question {
            line-height: 26px;
          }
          .question img {
            max-width: 100%;
          }
          .answer {
            word-wrap: break-word;
            line-height: 26px;
          }
          .answer img {
            max-width: 100%;
          }
          .text-content {
            width: 100%;
            height: 200px;
            border-color: ${ThemeConfig.color.border};
            word-wrap: break-word;
            word-break: break-all;
          }
          .btn-box {
          }
          .question, .answer, .btn-box {
            margin: 15px 0;
          }
          .editor-content {
            display: none;
          }
          .work-img {
            width: auto;
            max-width: 100%;
          }
          .work-audio-block {
            position: relative;
          }
          .work-audio {
            width: 100%;
            height: 32px;
          }
          .hidden-download {
            position: absolute;
            right: 0;
            background-color: #fff;
            height: 32px;
            width: 32px;
          }
        `}</style>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
