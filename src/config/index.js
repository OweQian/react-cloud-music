import axios from 'axios'

export const baseURL = 'http://127.0.0.1:4000'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.response.use(
  res => res.data,
  error => {
    console.log(error, '网络错误')
  }
)

export {
  axiosInstance
}