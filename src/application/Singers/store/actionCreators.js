import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import { getSingerListRequest } from '../../../api/request'

export const changeSingerList = (data) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data)
})

export const changePageCount = (data) => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

// 滑到底部
export const changePullUpLoading = (data) => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
})

// 顶部下拉
export const changePullDownLoading = (data) => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
})

// 第一次加载对应类别的歌手
export const getSingerList = (type, area, alpha) => {
  return (dispatch) => {
    getSingerListRequest(type, area, alpha, 0).then(data => {
      dispatch(changeSingerList(data.artists))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}

// 加载更多歌手
export const refreshMoreSingerList = (type, area, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getSingerListRequest(type, area, alpha, pageCount).then(data => {
      dispatch(changeSingerList([...singerList, ...data.artists]))
      dispatch(changePullUpLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}

