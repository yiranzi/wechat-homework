import React from 'react'
import CommonUtil from '../../util/common'

export default class extends React.Component {
  renderMaterialItem (item) {
    if (!item) { return item }
    // 图片材料
    if (CommonUtil.isImg(item)) {
      return <img src={item} />
    } else if (CommonUtil.isString(item)) {
      // 文字材料
      return <div dangerouslySetInnerHTML={{__html: item}} />
    }
  }
  renderMaterial (material) {
    const _this = this
    try {
      // meterial 返回结果有两种，一种是文字材料(字符串)，另一种是“['mp3', 'img', 'mp4']”
      // eslint-disable-next-line
      let meterialArray = eval(material)
      if (meterialArray) {
        // 是一个数组
        return meterialArray.map((item, index) => {
          return (
            <div key={index} className='meterial-item'>
              {_this.renderMaterialItem(item)}
            </div>
          )
        })
      } else {
        // 字符串
        return (
          <div className='meterial-item'>
            {_this.renderMaterialItem(material)}
          </div>
        )
      }
    } catch (e) {
      return (
        <div className='meterial-item'>
          {_this.renderMaterialItem(material)}
        </div>
      )
    }
  }
  render () {
    return (
      <div className='material'>
        {this.renderMaterial(this.props.content)}
        <style jsx>{`
          .material {
            word-wrap: break-word;
          }
        `}</style>
        <style global jsx>{`
          .material img {
            width: auto;
            height: auto !important;
            max-width: 100% !important;
          }
        `}</style>
      </div>
    )
  }
}
