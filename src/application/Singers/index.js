import React, { useState } from 'react'
import Horizen from '../../baseUI/HorizenItem/index'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'
const Singers = props => {
  let [category, setCategory] = useState (null)
  let [alpha, setAlpha] = useState (null)

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  let handleUpdateCatetory = (val) => {
    setCategory(val)
  }

  return (
    <NavContainer>
      <Horizen list={categoryTypes}
               title="分类 (默认热门):"
               handleClick={handleUpdateCatetory}
               oldVal={category}></Horizen>
      <Horizen list={alphaTypes}
               title="首字母:"
               handleClick={val => handleUpdateAlpha (val)}
               oldVal={alpha}></Horizen>
    </NavContainer>
  )
}

export default React.memo(Singers)