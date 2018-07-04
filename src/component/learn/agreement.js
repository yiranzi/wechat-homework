import React from 'react'
import PropTypes from 'prop-types'
import ThemeConfig from '../../../config/theme'
import {Modal, Input, Button} from 'antd'
import LearnCourseAction from '../../action/learn/course'

export default class Work extends React.Component {
  static propTypes = {
    courseId: PropTypes.string,
    isClick: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.state = {
      agreeTxt: '我已阅读保密协议并同意',
      showModal: false,
      showerr: false
    }
  }

  componentDidMount () {
    const {isClick} = this.props
    if (!isClick) {
      this.checkAgreement()
    } else {
      // 把自己交出去，外面调用检查是否同意协议（checkAgreement）
      this.props.onRef && this.props.onRef(this)
    }
  }

  checkAgreement = async (msg) => {
    const {courseId} = this.props
    if (courseId) {
      try {
        const isAgreeJson = await LearnCourseAction.signedAgreement(courseId, msg)
        this.setState({showModal: !isAgreeJson.response})
        return isAgreeJson.response
      } catch (err) {
        console.error(err)
      }
    }
    return false
  }

  submitAgreement () {
    if (this.state.agreeTxt !== this.state.agreeInputValue) {
      this.setState({
        showerr: true
      })
    } else {
      this.checkAgreement(this.state.agreeInputValue)
    }
  }

  onInputHandle (e) {
    this.setState({
      agreeInputValue: e.target.value
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false
    })
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .agree-input {
          width: 400px;
        }
      `}</style>
    )
  }

  render () {
    const {showerr, agreeTxt, showModal} = this.state
    return (
      <div className={showModal ? '' : 'hide'}>
        <Modal closable={false} maskClosable={this.props.isClick} visible={showModal} onCancel={this.hideModal}
          footer={null} width={800}>
          <div className='content'>
            <h3 className='my-text-center'>保密协议</h3>
            <p><b>北京大视界精英信息科技有限公司</b>(以下称“小灶”)负责组织“线上学徒项目”活动及提供相关服务，由小灶推荐学员至合作的企业（以下称“企业”），完成企业组织的实战项目。为保障项目的正常运作，保护小灶、学员和企业三方的合法权益，现就学员保守商业保密事宜约定如下：</p>
            <ul className='ul'>
              <li>商业秘密，是指不为公众知悉，能为权利人带来经济利益，具有实用性，并经权利人采取保密措施的技术信息和经营信息。</li>
              <li>学员参加项目所知悉企业的商业秘密，应当履行保密义务，具体为：
                <ul>
                  <li>a) 学员应当尊重和遵守企业的保密制度和保密规范；</li>
                  <li>b) 学员不得泄露企业的商业秘密，不得出售、使用或允许他人使用获悉的商业秘密；</li>
                  <li>c) 项目结束后，学员应当归还载有商业秘密的资料或文件，删除载有商业秘密的电子文件。</li>
                </ul>
              </li>
              <li>学员参加项目活动结束后，仍应当继续履行本协议约定的保密义务。保密义务不因项目结束而终止。</li>
              <li>学员违反本协议约定的保密义务，企业或小灶有权向学员追究泄露商业秘密的法律责任，给企业或小灶造成的损失的应当全额赔偿。构成犯罪的，企业有权提出控告，追究泄密者的刑事责任。</li>
              <li>协议签订后，在协议有效期内，双方应本着友好协商的原则解决问题，任何一方不得擅自解除协议。如甲方不能向乙方提供本协议规定的任一阶段的课程内容，需向乙方退回该阶段相应的课程费用。如乙方单方面要求解除协议，甲方不予退还任何费用。</li>
              <li>学员确认，已经完整阅读本协议，并充分理解各条款的含义和法律后果。</li>
              <li>因本协议产生的争议，任何一方可以向小灶所在地有管辖权的人民法院提起诉讼。</li>
              <li>本协议经小灶和学员签署后生效。</li>
            </ul>
            <div className='my-text-center'>
              <p className='agree-text'>{agreeTxt}</p>
              <p><Input placeholder='请输入上述文字，然后点击确认' className='agree-input my-text-center' onChange={e => this.onInputHandle(e)} value={this.state.agreeInputValue} /></p>
              <p className='red'>{showerr && '请输入正确的文字，然后再点击确认'}&nbsp;</p>
              <p><Button type='primary' onClick={e => this.submitAgreement(e)}> 确 &emsp; 认 </Button></p>
            </div>
          </div>
        </Modal>
        <style jsx>{`
          .hide {
            display: none;
          }
          .content {
            line-height: 28px;
            padding: 15px;
          }
          .ul {
            list-style: decimal;
          }
          .agree-text {
            color: ${ThemeConfig.color.primary}
          }
          .red {
            color: red;
            font-size: 12px;
          }
        `}</style>
        {this.renderGlobalCss()}
      </div>
    )
  }
}
