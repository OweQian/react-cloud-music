import React, { useState, useRef, useEffect } from 'react'
import Scroll from '../Scroll/index'
import PropTypes from 'prop-types'

const Horizen = props => {
  return ()
}

Horizen.propTypes = {
  // 列表数据
  list: PropTypes.array,
  // 当前 item 值
  oldVal: PropTypes.string,
  // 列表左侧标题
  title: PropTypes.string,
  // 点击不同的 item 执行的方法
  handleClick: PropTypes.func
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}