import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import Loading from '../../components/loading'
import Homework from './homework'
import OtherHomework from './otherhomework'
// import Loading from './otherhomework'
import ThemeConfig from '../config/theme'
import Header from '../../src/component/learn/homework/header'
import util from '../../src/util/util'
import {HomeWorkConsumer} from '../context/homeworkContext'

const colorStyle = '#EA9108'

export class HomeWorkPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.updateAnswer()
    }
  }

  componentDidMount = async () => {
    this.updateAnswer()
  }

  updateAnswer = async () => {
    console.log('updateAnswer')
    let params = util.geUrlParams(this.props.location.search)
    let {courseId, workId} = params
    this.setState({
      courseId, workId
    })
    // 获取问题
    let works = await this.props.homeworkContext.ajax.getWork(courseId, workId)
    if (works.answer) {
      this.props.homeworkContext.ajax.getSelfAnswer(courseId, workId)
    }
  }

  render () {
    return (<Switch>
      <Route path={this.props.match.path + '/me'} render={props => (<Homework homeworkContext={this.props.homeworkContext} {...props} />)} />
      <Route path={this.props.match.path + '/other'} render={props => (<OtherHomework homeworkContext={this.props.homeworkContext} {...props} />)} />
    </Switch>)
  }
}

export default function (props) {
  return <HomeWorkConsumer>
    {homeworkContext => (<HomeWorkPage homeworkContext={homeworkContext} {...props} />)}
  </HomeWorkConsumer>
}




