import React from 'react'
import WorkQuestion from './workQuestion'
import AnswerContent from './answerContent'
import { Tabs, Card } from 'antd'
const TabPane = Tabs.TabPane

const colorStyle = '#F0A200'

export default class extends React.Component {
  tabStyle = {
    width: '100%',
    margin: 'auto',
    background: 'rgba(255,255,255,1)',
    borderRadius: '2px',
    boxShadow: '0 1px 6px rgba(0,0,0,.2)'
  }
  constructor (props) {
    super(props)
    this.state = {
      currentTabSelect: '0'
    }
  }

  renderFooterBar () {
    let {totalSize} = this.props
    let pageNumber = parseInt(this.props.pageNumber)
    const perPageSize = 10
    let totalPageSize = Math.ceil(totalSize / perPageSize)
    let isFirst = pageNumber <= 1
    let isLast = pageNumber === totalPageSize
    if (totalPageSize > 0 && this.state.currentTabSelect === '0') {
      return (<div className='footer-bar'>
        <PageButton disabled={isFirst} callback={() => { this.props.clickPageNumber(-1) }}>上一页</PageButton>
        <span>{pageNumber}/{totalPageSize}</span>
        <PageButton disabled={isLast} callback={() => { this.props.clickPageNumber(1) }}>下一页</PageButton>
        <style jsx>{`
          .footer-bar {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            background:rgba(255,255,255,1);
            border-radius: 2px;
            margin: auto;
            text-align: center;
            display: flex;
            justify-content: center;
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            margin-top: 20px;
          }
          .footer-bar span {
            margin: auto;
            flex: 3;
          }
        `}</style>
      </div>)
    }
  }

  render () {
    let {work} = this.props
    let dom
    if (work) {
      let {answerList = [], totalSize, myAnswer} = this.props
      if (work.answer) {
        dom = (
          <div className='homework-page'>
            <div className='padding-container'>
              <WorkQuestion works={work} />
            </div>
            <Tabs tabBarStyle={this.tabStyle} defaultActiveKey={this.state.currentTabSelect} onChange={(index) => { this.setState({ currentTabSelect: index }) }}>
              <TabPane tab={`全部回答（${totalSize}）`} key='0'>
                {answerList.map((studentAnswer, index) => {
                  return (
                    <Card key={`answerlist-${index}`}>
                      <AnswerContent answerInfo={studentAnswer} answerDataType={work.type} clickStar={this.props.clickStar} />
                    </Card>
                  )
                })}
              </TabPane>
              <TabPane tab='我的回答' key='1'>
                <Card>
                  <AnswerContent answerInfo={myAnswer} answerDataType={work.type} clickStar={this.props.clickStar} />
                </Card>
              </TabPane>
            </Tabs>
            {this.renderFooterBar()}
            <style jsx>{`
              // 左右阴影需要padding
              .padding-container {
                padding: 0 5px;
                margin: auto -5px;
              }
            `}</style>
            <style jsx global>{`
              .ant-tabs-ink-bar {
                background-color: ${colorStyle};
                color: ${colorStyle};
              }
              .ant-tabs-nav .ant-tabs-tab-active,
              .ant-btn-danger:focus,
              .ant-btn-danger:hover,
              .ant-tabs-nav .ant-tabs-tab:hover {
                color: ${colorStyle};
              }
              .ant-tabs-nav {
                width: 100%;
              }
              .ant-tabs .ant-card {
                margin-top: 10px !important;
              }
              // tabbar 自适应
              .ant-tabs-nav .ant-tabs-tab {
                text-align: center;
                width: 240px;
                max-width: 50%;
                margin-right: 0px;
                padding-top: 12px;
                padding-bottom: 12px;
              }
              @media screen and (max-width: 640px) {
                .ant-tabs-nav .ant-tabs-tab {
                  width: 50%;
                }
                .ant-tabs-ink-bar {
                  width: 50% !important;
                }
              }
              .ant-tabs {
                padding: 0 5px 5px 5px;
                margin: 20px -5px auto -5px;
              }
            `}</style>
          </div>
        )
      } else {
        dom = <Card>没完成作业 无法查看</Card>
      }
    } else {
      dom = <Card>本课程暂无作业</Card>
    }
    return dom
  }
}

const PageButton = (props) => {
  let {children, callback, disabled} = props
  if (disabled) {
    return (
      <span className='able' style={disabled ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}>
        {children}
        <style jsx>{`
          .able {
            color: #999999;
            flex: 1;
          }
        `}</style>
      </span>
    )
  } else {
    return (
      <span className='disable' onClick={callback} style={disabled ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}>
        {children}
        <style jsx>{`
          .disable {
            color: #F0A200;
            flex: 1;
          }
        `}</style>
      </span>
    )
  }
}
