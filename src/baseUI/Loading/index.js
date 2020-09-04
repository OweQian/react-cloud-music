import React from 'react'
import { LoadingWrapper } from './style'

const Loading = props => {
  return (
    <LoadingWrapper>
      <div/>
      <div/>
    </LoadingWrapper>
  )
}

export default React.memo(Loading)