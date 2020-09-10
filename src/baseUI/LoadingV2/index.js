import React from 'react'
import { Loading } from './style'

const LoadingV2 = props => {
  return (
    <Loading>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <span> 拼命加载中...</span>
    </Loading>
  )
}

export default React.memo(LoadingV2)