import React from 'react'
import ThemeConfig from '../../../config/theme'
import CommonUtil from '../../../util/common'
import ToolsUtil from '../../../util/tools'
import { Input, Upload, Icon } from 'antd'

const { TextArea } = Input

export class MyTextArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      size: this.props.defaultValue.length,
      value: ''
    }
  }
  handleChange (value) {
    this.setState({size: value.length, value: value}, () => {
      this.props.onChange(value)
    })
  }
  renderTextArea () {
    const {defaultValue} = this.props
    return (
      <div className='work-group'>
        <TextArea
          maxLength={5000}
          placeholder='写下你的答案…'
          defaultValue={this.state.value || defaultValue}
          onChange={({target}) => { this.handleChange(target.value) }}
          autosize
          rows={4}
        />
        <div className='warning'>已输入 {this.state.size}/5000</div>
        <style jsx>{`
          .warning {
            font-size: ${ThemeConfig.size.title};
            color: #999999;
            margin-top: 30px;
            text-align: right;
            padding-right: 160px;
            white-space: nowrap;
          }
        `}</style>
        <style global jsx>{`
          .work-group .ant-input:hover {
            border-color: #E6E6E6;
          }
          .work-group .ant-input:focus {
            border-color: #E6E6E6;
            box-shadow: none;
          }
          .work-group textarea.ant-input {
            font-size: 15px;
            color: #666;
            min-height: 100px;
          }
        `}</style>
      </div>
    )
  }
  renderShowText () {
    const {defaultValue} = this.props
    return (
      <div className='work-group'>
        <div className='title'>我的回答</div>
        <TextArea
          defaultValue={this.state.value || defaultValue}
          rows={4}
          autosize
          disabled
        />
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
          .answer {
            font-size: 15px;
            color: ${ThemeConfig.color.black};
            word-wrap: break-word;
            word-break: break-all;
          }
        `}</style>
        <style global jsx>{`
          .work-group .ant-input[disabled] {
            background-color: transparent;
            color: ${ThemeConfig.color.black};
            min-height: 100px;
          }
          .work-group .ant-input {
            font-size: 15px;
            border: none;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {defaultValue, isEdit} = this.props

    if (CommonUtil.isEmpty(defaultValue) || isEdit) {
      return this.renderTextArea()
    } else {
      return this.renderShowText()
    }
  }
}

export class MyUploader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: [],
      defaultValue: this.props.defaultValue,
      loading: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.isEdit !== nextProps.isEdit) {
      this.setState({fileList: []})
    }
  }
  handleChange = ({ file, fileList, event }) => {
    this.setState({loading: true})
    if (file.status === 'done') {
      this.setState({ fileList: fileList, defaultValue: file.response.response }, () => {
        this.props.onChange()
      })
    }
    this.setState({loading: false})
  }

  renderUpload () {
    const { fileList, loading } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />上传作业答案
      </div>
    )
    return (
      <div className='work-group'>
        <Upload
          action={`/api/work/workFileComplete/${this.props.courseId}/${this.props.workId}`}
          listType='picture-card'
          onChange={this.handleChange}
          onPreview={() => { return false }}
        >
          {fileList.length >= 1 || loading ? null : uploadButton}
        </Upload>
        <style jsx>{`
          .work-group {
            background: #FEFAF2;
            padding: 50px 0;
            text-align: center;
          }
        `}</style>
        <style global jsx>{`
          /* 上传按钮样式 */
          .work-group .ant-upload.ant-upload-select-picture-card {
            width: 156px;
            height: 44px;
            margin: 0;
            background: #F0A200;
            color: #fff;
            border: none;
          }
          /* 上传按钮文字样式 */
          .work-group .ant-upload.ant-upload-select-picture-card>.ant-upload {
            font-size: 16px;
            padding: 0;
            line-height: 44px;
          }
          /* 上传图片后的样式 */
          .work-group .ant-upload-list-picture-card .ant-upload-list-item {
            float: none;
            width: 100%;
            height: auto;
            margin: 0;
            border: none;
            padding: 0;
          }
          /* 预览样式 */
          .work-group .ant-upload-list-picture-card .ant-upload-list-item-info:before {
            display: none
          }
        `}</style>
      </div>
    )
  }

  renderShowUpload () {
    const {defaultValue} = this.state
    let isImg = CommonUtil.isImg(defaultValue)
    return (
      <div className='work-group'>
        {isImg && <img src={`${ToolsUtil.ossFile()}/workFile/${defaultValue}`} style={{width: '100%'}} />}
        {!isImg && (
          <div className='answer'>
            <a href={`${ToolsUtil.ossFile()}/workFile/${defaultValue}`}>下载该答案</a>
          </div>
        )}
        <style jsx>{`
          .work-group {
            text-align: center;
          }
          .answer {
            background: #FEFAF2;
            padding: 50px 0;
          }
          a {
            font-size: ${ThemeConfig.size.title};
            color: #F0A200;
            text-decoration: underline;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {isEdit} = this.props
    if (isEdit) {
      return this.renderUpload()
    } else {
      return this.renderShowUpload()
    }
  }
}
