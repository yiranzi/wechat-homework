import React from 'react'
import { Card } from 'antd'
import DateUtil from '../../../util/date'
import ThemeConfig from '../../../../config/theme'

const colorStyle = '#EA9108'

export default class extends React.Component {
  render () {
    const {works} = this.props
    return (
      <div className='work-question'>
        <Card className='title-card' bordered={false}>
          <h1>课程思考作业</h1>
          <div className='out-date'>作业截止时间：
            {works.endTime && <span className='date'>{!!works.endTime && DateUtil.format(works.endTime, 'yyyy-MM-dd hh:mm:ss')}</span>}
            {!works.endTime && <span>可随时提交</span>}
          </div>
        </Card>
        <Card bordered={false}>
          <div className='title'>{works.title}</div>
          <div className='question' dangerouslySetInnerHTML={{__html: works.question}} />
        </Card>
        <style jsx>{`
          .out-date {
            font-size: ${ThemeConfig.size.large};
            margin-top: 10px;
          }
          .date {
            display: inline-block;
            color: ${colorStyle};
          }
          .title {
            font-size: 15px;
            margin-bottom: 10px;
            color: ${ThemeConfig.color.black};
          }
        `}</style>
        <style global jsx>{`
          .work-question .ant-card .question img {
            max-width: 100%;
            height: auto !important;
          }
        `}</style>
      </div>
    )
  }
}
