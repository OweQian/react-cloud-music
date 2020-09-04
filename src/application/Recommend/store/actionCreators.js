import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (value) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(value),
})

export const changeRecommendList = (value) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(value),
})

export const changeEnterLoading = (value) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data: value
})

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.banners))
    }).catch(() => {
      console.log('轮播数据获取失败')
    })
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.result))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('推荐歌单数据传输错误')
    })
  }
}

