import React from 'react'
import PropTypes from 'prop-types'
import { Button, Affix, Row, Col } from 'antd'
import ThemeConfig from '../../../config/theme'
import Work from '../../../src/component/learn/work'
import Video from '../../../src/component/video'
import Traning from '../../component/learn/traning'
import DomUtil from '../../util/dom'
import CommonUtil from '../../util/common'

export default class Content extends React.Component {
  static propTypes = {
    courseId: PropTypes.string,
    sectionId: PropTypes.number,
    content: PropTypes.string,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    pageNumber: PropTypes.number,
    pageCount: PropTypes.number,
    skipPage: PropTypes.func,
    work: PropTypes.object,
    setWork: PropTypes.func,
    setSection: PropTypes.func,
    overSection: PropTypes.bool,
    videoList: PropTypes.array
  }

  componentDidMount () {
    // 如果没有完成自动标识完成
    if (this.props.pageNumber === this.props.pageCount && !this.props.overSection) {
      this.props.setSection()
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
          .content table {
            border-collapse: collapse;
            width: 100%;
          }
          .content table td {
            border: 1px solid ${ThemeConfig.color.border};
          }
          .content img {
            max-width: 100% !important;
            height: auto !important;
          }
          .content blockquote {
            margin-left: 0;
            padding-left: 10px;
            border-left: 5px solid #efefef;
          }
          .content ol,
          .content ul {
            margin-left: 1rem !important;
          }
          .prev, .next {
            width: 150px;
          }
          .prev .ant-btn, .next .ant-btn {
            font-weight: bold;
            position: fixed;
            top: 300px;
          }
        `}</style>
    )
  }

  renderContent () {
    const {content} = this.props
    if (content) {
      const course = DomUtil.parseHtml(content)
      const courseElement = course.map((item, index) => {
        return (
          <div key={`course_${index}`}>
            {item.hasOwnProperty('html') && <div dangerouslySetInnerHTML={{__html: item.html.content}} />}
            {item.hasOwnProperty('traning') && <Traning id={item.traning.id} />}
          </div>
        )
      })
      return courseElement
    }
  }

  render () {
    const {courseId, sectionId, content, pageNumber, pageCount, skipPage, work, isFirstPage, isLastPage, setWork, videoList} = this.props
    return (
      <div className='box'>
        <div className='prev'>
          <Button disabled={isFirstPage ? 'disabled' : ''} className='btn' size='large'
            onClick={skipPage.bind(null, -1)}>&larr; {pageNumber == 1 ? '上一节' : '上一页'}</Button>
        </div>
        <div className='content'>
          {/* <div dangerouslySetInnerHTML={{__html: content}} /> */}
          {this.renderContent()}
          {work && <Work courseId={courseId} work={work} setWork={setWork} />}
          {/*<Affix*/}
            {/*style={{position: 'absolute', bottom: 0, width: '800px', background: '#fff', padding: '1rem'}}>*/}
            {/*<Row>*/}
              {/*<Col span={8}>*/}
                {/*<a href={'/learn/resource/' + courseId} target='_blank'>*/}
                  {/*<Button type='primary' className='btn' size='large'>资料下载</Button>*/}
                {/*</a>*/}
              {/*</Col>*/}
              {/*<Col span={8} offset={8}>*/}
                {/*<a href={'/learn/questionlist/' + sectionId + '/' + pageNumber} target='_blank'>*/}
                  {/*<Button type='primary' className='btn' size='large'>对学习内容有疑问？点击查看导师答疑</Button>*/}
                {/*</a>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          {/*</Affix>*/}
        </div>
        <div className='next'>
          <Button disabled={isLastPage ? 'disabled' : ''} className='btn' size='large'
            onClick={skipPage.bind(null, 1)}>{pageNumber == pageCount ? '下一节' : '下一页'} &rarr;</Button>
        </div>
        {videoList.map(function (item, index) {
          if (item && CommonUtil.isMp4(item.src)) {
            return <Video key={index} playerId={item.playerId} type='mp4' src={item.src} height='380px' />
          } else {
            return <Video key={index} playerId={item.playerId} type='m3u8' src={item.src} height='380px' />
          }
        })}
        <style jsx>{`
            .box {
              max-width: 1200px;
              margin: 30px auto;
              display: flex;
              justify-content: space-around;
            }
            .content {
              width: 800px;
              line-height: 28px;
              margin: 15px;
              font-size: 15px;
              margin-bottom: 80px;
            }
            .pagination {
              border-top: 1px solid ${ThemeConfig.color.border};
            }
            .pagination .prev,.pagination .next {
              width: 50%;
              text-align: center;
              padding: 30px 0;
            }
            .btn {
              font-size: 16px;
            }
            .other-content {
              margin-top: 15px;
            }
            .end-study {
              background-color: ${ThemeConfig.color.bg_gray};
              padding: 15px 0;
              border: 1px solid #ddd;
              margin: 15px 0;
            }
            .tip {
              margin: 15px 30px 15px 30px;
            }
          `}</style>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
