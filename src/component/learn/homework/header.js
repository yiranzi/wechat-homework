import React from 'react'
import { Icon } from 'antd'
import ThemeConfig from '../../../config/theme'

export default (props) => {
  if (props.isH5) {
    return (
      <div className='homework-header' onClick={() => { props.goRouter ? props.goRouter() : window && window.history.go(-1) }}>
        <Icon type='up' />{props.title || '返回学习页面'}
        <style jsx>{`
        .homework-header {
          height: 70px;
          font-size: ${ThemeConfig.size.title};
          color: ${ThemeConfig.color.black};
          text-align: center;
          background: ${ThemeConfig.color.white};
          box-shadow: 0 1px 6px rgba(0,0,0,.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
        <style global jsx>{`
        .homework-header .anticon {
          display: block;
          margin-bottom: 4px;
        }
      `}</style>
      </div>
    )
  } else {
    return null
  }
}
