import React, { useEffect, useRef } from 'react'
import Scroll from '../Scroll/index'
import PropTypes from 'prop-types'
import { List, ListItem } from './style'
const Horizen = props => {
  const {list, oldVal, title} = props
  const {handleClick} = props
  const Category = useRef (null)

// 加入初始化内容宽度的逻辑
  useEffect (() => {
    let categoryDOM = Category.current
    let tagElems = categoryDOM.querySelectorAll ('span')
    let totalWidth = 0
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])
  return (
    <Scroll direction="horizental">
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}>
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
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

export default React.memo(Horizen)