import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'antd'
import ThemeConfig from '../../config/theme'
import CommonUtil from '../../util/common'
import Material from './material'
import CourseAction from '../../action/learn/course'

export default class extends React.Component {
  static propTypes = {
    id: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      train: {},
      show: false
    }
  }
  componentDidMount = async () => {
    this.loadTraining()
  }

  loadTraining = async () => {
    let id = this.props.id
    try {
      let train = await CourseAction.getTraining(id)
      this.setState({
        train: train.response
      })
    } catch (err) {
      console.error(err)
    }
  };

  toggle () {
    this.setState({show: !this.state.show})
  }
  render () {
    const {train, show} = this.state
    if (CommonUtil.isEmpty(train)) return null
    return (
      <div className='training-item'>
        <div className='header'><img src='/static/img/icon/exercise.png' />练习</div>
        <div className='content'>
          <div className='question' dangerouslySetInnerHTML={{__html: train.content}} />
          <Button style={{background: ThemeConfig.color.red, margin: '1rem 0'}} size='small' onClick={() => { this.toggle() }}>{show ? '隐藏答案及解析' : '显示答案及解析'}</Button>
          {show && <Material content={train.analysis} />}
        </div>
        <style jsx>{`
          .training-item {
            background: #fff;
            margin-left: -1rem;
            padding-right: -1rem;
            padding: 2rem 1rem;
          }
          .header img {
            width: 1rem !important;
            margin-right: 0.5rem;
          }
          .content {
            padding: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
