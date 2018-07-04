import React from 'react'
import Layout from '../layoutN'
import {Alert} from 'antd'

class Learn401 extends React.Component {
  render () {
    return (
      <Layout>
        <Alert message='登录已过期，请重新登录' type='warning' showIcon />
      </Layout>
    )
  }
}

export default Learn401
