import React from 'react'
import MoreContent from './moreContent'
import DateUtil from '../../../util/date'
import ToolsUtil from '../../../util/tools'
import { Rate } from 'antd'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: true,
      starClick: false,
      contentHeight: undefined
    }
  }

  componentDidMount () {
    this.setState({
      contentHeight: this.refs.answer.scrollHeight
    })
  }

  renderByType (answer) {
    let {answerDataType} = this.props
    // type = 3
    switch (answerDataType) {
      case 3:
        return (this.renderImg(answer))
      case 5:
        return (this.renderImg(answer))
      default:
        return (this.renderTxt(answer))
    }
  }

  // 图片路径
  isImg = (str) => {
    return str.match(/.*png$/) || str.match(/.*jpg$/) || str.match(/.*jpeg$/)
  }

  // 渲染图片、文件
  renderImg (imgUrl) {
    if (this.isImg(imgUrl)) {
      return (
        <div className='img-container'>
          <img src={ToolsUtil.ossFile() + '/workFile/' + imgUrl} />
          <style jsx>{`
          .img-container {
            text-align: center;
            width: 100%;
          }
          .img-container img{
            max-width: 90%;
          }
        `}</style>
        </div>
      )
    } else {
      return <div>
        <a target='_blank' href={ToolsUtil.ossFile() + '/workFile/' + imgUrl}>点击下载该答案</a>
        <style jsx>{`
          div {
            margin-top: 10px;
            margin-bottom: 10px;
          }
          div a {
            color: #F0A200;
          }
        `}</style>
      </div>
    }
  }

  // 渲染文字
  renderTxt (content) {
    if (content) {
      // eslint-disable-next-line
      return <MoreContent height={5}><div className='answer-content-text' dangerouslySetInnerHTML={{__html: content.replace(new RegExp('\n', 'gm'), '<br />')}} /></MoreContent>
    }
  }

  renderScore (score) {
    let result
    const score2Svg = [
      {
        color: '#71D954',
        text: '继续努力'
      },
      {
        color: '#658EFF',
        text: '还不错'
      },
      {
        color: '#F20E0E',
        text: '优秀'
      }
    ]
    // 0,1
    // 2,3
    // 4,5
    if (!score || score < 0) {
      return null
    } else if (score <= 1) {
      result = 0
    } else if (score <= 3) {
      result = 1
    } else {
      result = 2
    }
    return (
      <div style={{fill: score2Svg[result].color, color: score2Svg[result].color}} >
        <svg width='20px' height='22px' viewBox='0 0 20 22' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <g stroke='none' strokeWidth='1' fillRule='evenodd'>
            <g transform='translate(-1190.000000, -640.000000)'>
              <g transform='translate(1190.000000, 637.000000)' fillRule='nonzero'>
                <path d='M7.20427149,24.3147908 C6.97542766,24.3147908 6.747416,24.2266813 6.58264844,24.0520356 C4.4182019,21.7604003 0.917307412,21.7383729 0.844909547,21.7383729 C0.842413069,21.7383729 0.842413069,21.7383729 0.83991659,21.7383729 C0.383061093,21.7383729 0.0102536934,21.3898682 0.0069250559,20.957974 C0.0035964184,20.5237197 0.371410862,20.1697081 0.829930678,20.164988 C1.00301983,20.1563344 5.13801976,20.1602678 7.82423023,23.0041612 C8.13046488,23.3282785 8.10050714,23.8254681 7.75765748,24.114971 C7.5995472,24.2487087 7.40149326,24.3147908 7.20427149,24.3147908 Z M12.7847323,24.3132175 C12.5825175,24.3132175 12.3794706,24.2439885 12.2188639,24.1031706 C11.8818393,23.8081609 11.8610354,23.3101845 12.1739273,22.9915741 C14.9558361,20.1516142 19.0067879,20.154761 19.1665625,20.1610545 C19.6267466,20.1657747 19.9953932,20.5213597 19.9904003,20.9556139 C19.9854073,21.3875081 19.6142643,21.7344395 19.1582409,21.7344395 C19.1557444,21.7344395 19.1540801,21.7344395 19.1515836,21.7344395 L19.1515836,21.7344395 C19.0825144,21.7344395 15.6523535,21.7556802 13.3947051,24.0606892 C13.2316018,24.2290414 13.007751,24.3132175 12.7847323,24.3132175 Z M11.3176353,20.3120995 L8.68052222,20.3120995 C8.59647413,20.3120995 8.51492251,20.3002991 8.43753169,20.277485 C5.62233652,19.9360605 3.22987832,18.3917831 1.68788699,15.9152752 C-0.102087822,13.0391274 -0.512342394,9.31256511 0.668491759,6.64174412 C0.795812144,6.35460136 1.09039656,6.16500847 1.41993167,6.15871493 L1.67041165,6.15635485 C3.25567526,6.15635485 4.73608679,6.43956415 6.08335281,6.9996892 C7.05697928,5.31695397 8.16874421,4.04015206 9.39451497,3.19681771 C9.4594234,3.14332263 9.53348558,3.09848115 9.61586936,3.06544007 L9.61586936,3.06544007 C9.87300661,2.96002328 10.1717518,2.98283736 10.4072529,3.12758878 C10.4480287,3.15276294 10.4863081,3.18108386 10.5212588,3.21255156 C11.7503582,4.06532622 12.8313332,5.32324751 13.8099526,7.0413839 C15.1838477,6.4545113 16.6983778,6.15714154 18.3252494,6.15714154 L18.5798902,6.15950162 C18.9094253,6.16579516 19.2040097,6.35538805 19.3313301,6.64253081 C20.5121642,9.3141385 20.1027418,13.0407008 18.3111027,15.9168485 C16.7691114,18.3917831 14.3774853,19.9368472 11.5631223,20.2790584 C11.4840672,20.2995124 11.4025155,20.3120995 11.3176353,20.3120995 Z M8.82864659,18.7387145 L11.1695109,18.7387145 C11.1869863,18.7355677 11.2052938,18.7332076 11.2236013,18.7308476 C14.2326896,18.4145972 15.9585881,16.5902573 16.8764599,15.1167823 C18.2819771,12.8581882 18.7080427,9.90651794 17.9823997,7.73367329 C16.4678697,7.78008815 15.0798278,8.13095299 13.8523927,8.7791876 C13.6518423,8.8846044 13.4146769,8.90663179 13.1974833,8.84369639 C12.9794576,8.7791876 12.798879,8.63207611 12.6981877,8.43776306 C11.8543781,6.80616285 10.9498208,5.60567011 9.94623663,4.78750992 C8.94182027,5.60409673 8.0172912,6.81324308 7.1917891,8.39134821 C7.09109782,8.58330118 6.91301571,8.72805259 6.69665427,8.79256138 C6.48029284,8.85785685 6.24728821,8.83582946 6.04756996,8.73355944 C4.84593182,8.11600584 3.4903442,7.78008815 2.01658995,7.73445998 C1.29094697,9.90730463 1.71701257,12.8589748 3.12252976,15.1167823 C4.04040155,16.5902573 5.76546793,18.4138105 8.77372407,18.7308476 C8.79203158,18.7332076 8.81033909,18.7355677 8.82864659,18.7387145 Z M9.99283756,25 C9.53348558,25 9.16067818,24.6483485 9.16067818,24.2133075 L9.16067818,19.525407 C9.16067818,19.090366 9.53348558,18.7387145 9.99283756,18.7387145 C10.4521895,18.7387145 10.8249969,19.090366 10.8249969,19.525407 L10.8249969,24.2133075 C10.8241648,24.6483485 10.4521895,25 9.99283756,25 Z' id='Shape' />
              </g>
            </g>
          </g>
        </svg>
        <span>{score2Svg[result].text}</span>
        <style jsx>{`
          div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span {
            font-size: 20px;
            height: 20px;
            line-height: 20px;
          }
          svg {
            margin-right: 10px;
          }
        `}</style>
      </div>
    )
  }

  renderContent (answerInfo, type) {
    let time, answer
    let {headimgurl, nickname, score} = answerInfo
    if (type === 'student') {
      answer = answerInfo.answer
      time = answerInfo.updateTime
    } else {
      answer = answerInfo.evaluate
      time = answerInfo.createTime
    }
    return (
      <div style={type === 'student' ? {} : {border: 'none'}} className='answer-content-div'>
        <div className='answer-user-info'>
          <img className='head-img' src={headimgurl} alt='' />
          <div className='user-info'>
            <span className='name'>{nickname}</span>
            <span className='date'>{time && DateUtil.format(time, 'yyyy-MM-dd hh:mm:ss')}</span>
          </div>
          {type === 'student' && this.renderScore(score)}
        </div>
        {type === 'student' && this.renderByType(answer)}
        {type === 'teacher' && <div className='answer-content-text' dangerouslySetInnerHTML={{__html: answer.replace(new RegExp('\n', 'gm'), '<br />')}} />}
        <style jsx>{`
          .answer-content-div {
            border-bottom: 1px solid #E6E6E6;
          }
          .answer-user-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            align-items: center;
          }

          .head-img {
            width: 50px;
            height: 50px;
            display: inline-block;
            border-radius: 50%;
            margin-right: 14px;
          }
          .answer-content-div .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 50px;
          }
          .user-info .name {
            font-size:16px;
            font-family:PingFangSC-Medium;
          }
          .user-info .date {
            font-size:15px;
            color: #666666;
          }
          .answer-content-div .score-img {
            width: 110px;
            height: 28px;
          }
        `}</style>
        <style jsx global>{`
          .answer-content-text {
            font-family:PingFangSC-Regular;
            line-height: 26px;
            font-size: 15px;
          }
        `}</style>
      </div>
    )
  }

  answerClickStar (workAnswerId) {
    // 发送请求。
    this.props.clickStar(workAnswerId)
    // 无论成功否
    this.setState({
      starClick: true
    })
  }

  giveStar (starCount, star, id) {
    if (id) {
      // 如果已经点击
      if (this.state.starClick) {
        return (<div className='comment-title-good'>
          <img className='agree-icon' src='/static/img/learn/agree.svg' alt='' />
          <span>{starCount + 1}点赞</span>
        </div>)
      }
      // 如果未点击 但是有star
      if (star) {
        return (<div className='comment-title-good'>
          <img className='agree-icon' src='/static/img/learn/agree.svg' alt='' />
          <span>{starCount}点赞</span>
        </div>)
      } else {
        return (<div onClick={() => { this.answerClickStar(id) }} className='comment-title-good'>
          <div className='hover-div'>
            <svg width='15px' height='15px' viewBox='0 0 15 15' version='1.1' xmlns='http://www.w3.org/2000/svg'>
              <g stroke='none' strokeWidth='1'fillRule='evenodd'>
                <g transform='translate(-1190.000000, -904.000000)' fillRule='nonzero'>
                  <g transform='translate(1190.000000, 902.000000)'>
                    <path d='M9.16771224,17 C5.83015566,17 0.509317346,17 0.509317346,17 C0.169602677,17 0,16.7584036 0,16.4643095 L0,8.42895202 C0,8.13485793 0.237851208,7.89326152 0.509317346,7.89326152 L3.56522141,7.89326152 C3.84178075,7.89326152 4.3368372,7.99504272 4.51102374,8.19592666 C5.10285049,7.68112808 6.67052928,6.07780641 6.67052928,3.54345467 C6.67052928,2.02477211 8.09967376,2.01673675 8.09967376,2.01673675 C8.09967376,2.01673675 10.6875152,1.54747187 10.6875152,5.57854288 C10.6875152,6.45332546 10.1863469,7.89326152 10.1863469,7.89326152 L11.714299,7.89326152 C11.714299,7.89326152 16.0277076,7.10793925 14.770203,12.1787855 C13.6349347,16.7578679 12.5251322,17 9.16771224,17 L9.16771224,17 Z M1.01863469,8.96464251 L1.01863469,15.928619 L3.05590408,15.928619 L3.56522141,15.928619 L3.56522141,8.96464251 L3.56522141,8.96464251 L1.01863469,8.96464251 Z M11.714299,8.96464251 L8.14907754,8.96464251 C8.14907754,8.96464251 9.73458243,7.38328417 9.73458243,5.32408989 C9.73458243,3.26489561 8.88147588,3.0345487 8.33803428,3.0345487 C7.79459267,3.0345487 7.62346204,3.21721915 7.62346204,3.54345467 C7.62346204,7.35114274 4.5838561,9.50033301 4.5838561,9.50033301 L4.5838561,15.928619 C4.5838561,15.928619 6.59922486,15.928619 9.16771224,15.928619 C11.7361996,15.928619 12.8241015,15.8530866 13.7515683,12.1787855 C14.7712217,8.14075054 11.714299,8.96464251 11.714299,8.96464251 L11.714299,8.96464251 Z' id='Shape' />
                  </g>
                </g>
              </g>
            </svg>
            <span>{starCount}点赞</span>
          </div>
        </div>)
      }
    }
  }

  teacherEvaluateIcon () {
    return (
      <div className={this.state.show ? 'icon-press' : 'hover-div'} onClick={() => { this.setState({show: !this.state.show}) }}>
        <svg width='15px' height='15px' viewBox='0 0 15 15' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <g id='最终版' stroke='none' strokeWidth='1' fillRule='evenodd'>
            <g id='答案列表' transform='translate(-1181.000000, -1336.000000)' fillRule='nonzero'>
              <g id='导师-copy' transform='translate(1181.000000, 1333.000000)'>
                <g id='人员' transform='translate(0.000000, 3.000000)'>
                  <path d='M7.5,9 C5.13255495,9 3.21428571,6.98581731 3.21428571,4.5 C3.21428571,2.01418269 5.13255495,0 7.5,0 C9.86744505,0 11.7857143,2.01418269 11.7857143,4.5 C11.7857143,6.98581731 9.86744505,9 7.5,9 Z M7.5,7.61538462 C9.13804945,7.61538462 10.467033,6.21995192 10.467033,4.5 C10.467033,2.78004808 9.13804945,1.38461538 7.5,1.38461538 C5.86195055,1.38461538 4.53296703,2.78004808 4.53296703,4.5 C4.53296703,6.21995192 5.86195055,7.61538462 7.5,7.61538462 Z M5.77129121,6.11610577 C5.64972527,5.97331731 5.66002747,5.75480769 5.79601648,5.62716346 C5.93200549,5.49951923 6.14010989,5.51033654 6.26167582,5.653125 C6.58516484,6.02956731 7.04258242,6.23076923 7.66483516,6.23076923 C8.00274725,6.23076923 8.44162088,6.00360577 8.73626374,5.65528846 C8.85782967,5.5125 9.06593407,5.49951923 9.20192308,5.62716346 C9.33791209,5.75480769 9.35027473,5.97331731 9.22870879,6.11610577 C8.8125,6.60721154 8.19848901,6.92524038 7.66277473,6.92524038 C6.8592033,6.92307692 6.22252747,6.64182692 5.77129121,6.11610577 L5.77129121,6.11610577 Z' id='Shape' />
                  <path d='M1.47441221,13.3791667 C1.46304676,13.4958333 1.45622749,13.575 1.45622749,13.6375 C1.55851655,13.6541667 1.69490196,13.6645833 1.86765681,13.6645833 L13.5058785,13.6645833 C13.5513403,13.5729167 13.5513403,13.4416667 13.5354287,13.2958333 C12.6580159,10.975 10.2689981,9.33333333 7.68449459,9.33333333 C4.86813585,9.33333333 2.45184099,10.9229167 1.48350457,13.2791667 C1.48123148,13.3083333 1.4766853,13.3395833 1.47441221,13.3791667 L1.47441221,13.3791667 Z M0.0469115756,13 C1.13117559,10.1291667 4.06346193,8 7.68449459,8 C11.0145717,8 13.9491311,10.1333333 14.9583832,13 C15.0652184,13.66875 15.0834031,15 13.5036055,15 L1.86538372,15 C-0.378156288,15 0.0128152229,13.6645833 0.0469115756,13 Z' id='Shape' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>导师点评（已评）</span>
        <style jsx>{`
          .icon-press {
            color: #F0A200;
            fill: #F0A200;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span {
            font-size: 14px;
            height: 15px;
            line-height: 15px;
          }
          svg {
            margin-right: 10px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    let {answerInfo = {}} = this.props
    let {starCount, star, id: starId, learningWorkAnswerEvaluate: teacherEvaluate} = answerInfo
    return (
      <div className='answer-content'>
        {this.renderContent(answerInfo, 'student')}
        <div className='footer-menu'>
          {this.giveStar(starCount, star, starId)}
          {teacherEvaluate && this.teacherEvaluateIcon()}
        </div>
        <div ref={'answer'} className='evaluate-div' style={this.state.show ? {height: this.state.contentHeight} : {height: '0px'}}>
          {teacherEvaluate &&
          <div className='evaluate'>
            {this.renderContent(teacherEvaluate, 'teacher')}
          </div>
          }
        </div>
        {teacherEvaluate && teacherEvaluate.score && this.state.show && <div className='give-score'>
          <span>反馈：</span>
          <Rate value={teacherEvaluate.score} disabled />
        </div>}
        <style jsx>{`
          .answer-content {
            color:rgba(51,51,51,1);
          }
          .card-div-inner {
            width: 95%;
            margin: auto;
            padding: 10px
            background:rgba(255,255,255,1);
            border-radius: 2px ;
            margin: 20px auto;
          }
          .footer-menu {
            margin-top: 18px;
            display: flex;
          }
          .evaluate-div {
            margin-top: 10px;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(.645,.045,.355,1);
          }
          .evaluate {
            background-color: #FEFAF2;
            padding: 10px;
            margin-top: 10px;
          }
          .give-score {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 5px;
          }
        `}</style>
        <style jsx global>{`
          .comment-title-good {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            color: #666666;
            margin-right: 70px;
          }
          .comment-title-good span {
            height: 15px;
            line-height: 15px;
          }
          .hover-div {
            transition: all 0.3s cubic-bezier(.645,.045,.355,1);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .hover-div:hover {
            color: #F0A200;
            fill: #F0A200;
          }
          .comment-title-good img{
            width: 15px;
            height: 15px;
            margin-right: 10px;
          }
          .comment-title-good svg {
            width: 15px;
            height: 15px;
            margin-right: 10px;
          }
          .ant-card-body {
            padding: 20px 20px 10px 20px;
          }
        `}</style>
      </div>
    )
  }
}
