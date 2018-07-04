import React from 'react'
import {LibProvider} from '../../context/componentsLib'

export default class Layout extends React.Component {
  render () {
    return <LibProvider>
      {this.props.children}
    </LibProvider>
  }
}
