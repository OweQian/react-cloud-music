import { axiosInstance } from '../config/index'

export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

export const getSingerListRequest = (type, area, alpha, count) => {
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha}&offset=${count}`)
}

export const getRankListRequest = () => {
  return axiosInstance.get('/toplist')
}