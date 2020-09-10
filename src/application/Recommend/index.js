import React, { useEffect } from 'react'
import Slider from '../../components/Slider/index'
import RecommendList from '../../components/List/index'
import Scroll from '../../baseUI/Scroll/index'
import Loading from '../../baseUI/Loading/index'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import {
  getBannerList,
  getRecommendList
} from './store/actionCreators'
import { Content } from './style'
const Recommend = props => {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerListDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    if (!bannerList.size) {
      getBannerListDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
    //eslint-disable-next-line
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      { enterLoading && <Loading/>}
      <Scroll className="list" onScroll={forceCheck}>
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
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => ({
  getBannerListDataDispatch () {
    dispatch(getBannerList())
  },
  getRecommendListDataDispatch () {
    dispatch(getRecommendList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))