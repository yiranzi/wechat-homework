/* eslint-disable */
import React from 'react'

export default class extends React.Component {
  LineHeight = 26
  timer
  constructor (props) {
    super(props)
    const {height} = this.props
    this.state = {
      style: {
        lineHeight: `${this.LineHeight}px`,
        maxHeight: `${height * this.LineHeight}px`,
        overflowY: 'hidden'
      },
      isShow: false
    }
  }

  componentDidMount = () => {
    this.timer = window.setTimeout(() => {
      this.setState({
        canRender: true
      })
    }, 100)
  }

  componentWillUnmount = () => {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  change () {
    let {isShow} = this.state
    if (isShow) {
      const {height} = this.props
      this.setState({
        isShow: false,
        style: {
          lineHeight: `${this.LineHeight}px`,
          height: `${height * this.LineHeight}px`,
          overflowY: 'hidden'
        }
      })
    } else {
      this.setState({
        isShow: true,
        style: {
          lineHeight: `${this.LineHeight}px`,
          height: this.refs.out.scrollHeight,
          maxHeight: this.refs.out.scrollHeight,
          overflowY: 'hidden'
        }
      })
    }
  }

  // 多行显示蒙版
  isShowModal () {
    let {out, inner} = this.refs
    if (!out || !inner) {
      return null
    }
    let dom
    if (inner.offsetHeight > this.LineHeight * this.props.height) {
      if (!this.state.isShow) {
        dom = <div>
          <div className='shadow' />
          <div className={'get-more-icon'}>
            <div className={'tag'}>更多</div>
            <svg width="20" height="20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"></style></defs><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z"></path></svg>
          </div>
        </div>
      } else {
        dom = <div>
          <div className='block-div' />
          <div className={'get-more-icon'}>
            <div className={'tag'}>收起</div>
            <svg width="20" height="20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"></style></defs><path d="M910.222222 796.444444c-17.066667 0-34.133333-5.688889-45.511111-17.066666L551.822222 409.6c-11.377778-5.688889-17.066667-11.377778-34.133333-11.377778-5.688889 0-22.755556 5.688889-28.444445 11.377778l-329.955555 364.088889c-22.755556 22.755556-56.888889 22.755556-79.644445 5.688889-22.755556-22.755556-22.755556-56.888889-5.688888-79.644445l329.955555-364.088889c28.444444-34.133333 73.955556-51.2 119.466667-51.2s85.333333 22.755556 119.466666 56.888889l312.888889 364.088889c22.755556 22.755556 17.066667 56.888889-5.688889 79.644445-11.377778 5.688889-28.444444 11.377778-39.822222 11.377777z"></path></svg>
          </div>
        </div>
      }
      return (
        <div className={'modal'} onClick={() => { this.change() }}>
          {dom}
          <style global jsx>{`
            .modal {
              position: absolute;
              left: 0;
              top: 0;
              text-align: center;
              width: 100%;
            }
            .shadow {
              height: 20px;
              z-index: 10;
              height: 20px;
              background: -moz-linear-gradient(bottom,rgba(255,255,255,.1),rgba(255,255,255,0));
              background: -webkit-gradient(linear,0 top,0 bottom,from(rgba(255,255,255,0.2)),to(rgba(255,255,255,1)));
            }
            .block-div {
              height: 20px;
              z-index: 10;
              height: 20px;
            }
            .tag {
              font-size: 15px;
              margin-right: 5px;
            }
            .get-more-icon {
              transition: all 0.3s cubic-bezier(.645,.045,.355,1);
              display: flex;
              justify-content: center;
              align-items: center;
              color: #666666;
              fill: #666666;
              margin-top: 10px;
            }
            .get-more-icon:hover {
              color: #F0A200;
              fill: #F0A200;
              cursor: pointer;
            }
          `}</style>
        </div>
      )
    }
  }

  render () {
    const {style} = this.state
    return (
      <div className='more'>
        <div className='title'>{this.props.title}</div>
        <div ref='out' className='content' style={style}><div className={'inner'} ref='inner'>{this.props.children}</div></div>
        <div className={'modal-out-div'}>
          {this.state.canRender && this.isShowModal()}
        </div>
        <style jsx>{`
          .modal-out-div {
            position: relative;
            top: -25px;
            height: 50px;
            margin-bottom: -10px;
          }
          .more .title {
            font-size: 15px;
            font-weight: bold;
            color: #242223;
          }
          .more .content {
            margin: 5px 0;
            color: #646464;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            word-break:break-all;
            text-overflow: ellipsis;
            transition: all 0.3s cubic-bezier(.645,.045,.355,1);
          }
        `}</style>
      </div>
    )
  }
}
