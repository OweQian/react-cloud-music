import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

export const DataContext = createContext({})

export const CHANGE_TYPE = 'CHANGE_TYPE'
export const CHANGE_AREA = 'CHANGE_AREA'
export const CHANGE_ALPHA = 'CHANGE_ALPHA'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_TYPE:
      return state.set('type', action.data)
    case CHANGE_AREA:
      return state.set('area', action.data)
    case CHANGE_ALPHA:
      return state.set('alpha', action.data)
    default:
      return state
  }
}

const Data = props => {
  const [data, dispatch] = useReducer(reducer, fromJS({
    type: -1,
    area: -1,
    alpha: ''
  }))
  return (
    <DataContext.Provider value={{data, dispatch}}>
      {props.children}
    </DataContext.Provider>
  )
}

export default React.memo(Data)