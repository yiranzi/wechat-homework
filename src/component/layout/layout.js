import React from 'react'
import {HomeWorkProvider} from '../../context/homeworkContext'
import '../../static/zao.css'

export default class Layout extends React.Component {
  render () {
    return <HomeWorkProvider>
      {this.props.children}
    </HomeWorkProvider>
  }
}
