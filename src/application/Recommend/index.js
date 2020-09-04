import React, { useEffect } from 'react'
import Slider from '../../components/Slider/index'
import RecommendList from '../../components/List/index'
import Scroll from '../../baseUI/Scroll/index'
import { connect } from 'react-redux'
import * as actionCreators from './store/actionCreators'
import { Content } from './style'
const Recommend = props => {
  const { bannerList, recommendList } = props
  const { getBannerListDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    getBannerListDataDispatch()
    getRecommendListDataDispatch()
    //eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS}/>
          <RecommendList recommendList={recommendListJS}/>
        </div>
      </Scroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
})

const mapDispatchToProps = (dispatch) => ({
  getBannerListDataDispatch () {
    dispatch(actionCreators.getBannerList())
  },
  getRecommendListDataDispatch () {
    dispatch(actionCreators.getRecommendList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))