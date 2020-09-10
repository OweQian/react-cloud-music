import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import { getRankListRequest } from '../../../api/request'

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const changeRankList = (data) => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data)
})

export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then(data => {
      dispatch(changeRankList(data.list))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('排行榜数据获取失败')
    })
  }
}