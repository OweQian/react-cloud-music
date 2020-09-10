import React, { useEffect, useContext } from 'react'
import Horizen from '../../baseUI/HorizenItem/index'
import Scroll from '../../baseUI/Scroll/index'
import Loading from '../../baseUI/Loading/index'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { connect } from 'react-redux'
import { DataContext } from './data'
import { typeOptions, areaOptions, alphaOptions } from '../../mock'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from './style'
import {
  getSingerList,
  refreshMoreSingerList,
  changePullDownLoading,
  changePullUpLoading,
  changeEnterLoading,
  changePageCount
} from './store/actionCreators'
import {CHANGE_ALPHA, CHANGE_AREA, CHANGE_TYPE} from "./data";

const Singers = props => {
  // let [type, setType] = useState (-1)
  // let [area, setArea] = useState (-1)
  // let [alpha, setAlpha] = useState('')
  const { data, dispatch } = useContext(DataContext)
  const { type, area, alpha } = data.toJS()

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    getSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props

  useEffect(() => {
    if (!singerList.length) {
      getSingerDispatch(type, area, alpha)
    }
    // eslint-disable-next-line
  }, [])

  const handleUpdateType = (val) => {
    dispatch({type: CHANGE_TYPE, data: val})
    updateDispatch(val, area, alpha)
  }

  const handleUpdateArea = (val) => {
    dispatch({type: CHANGE_AREA, data: val})
    updateDispatch(type, val, alpha)
  }

  const handleUpdateAlpha = (val) => {
    dispatch({type: CHANGE_ALPHA, data: val})
    updateDispatch(type, area, val)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(type, area, alpha, pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(type, area, alpha)
  }

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    let list = singerList ? singerList.toJS() : []
    return (
      <List>
        {
          list.map (item => {
            return (
              <ListItem key={item.accountId}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen list={typeOptions}
                 title="分类:"
                 handleClick={handleUpdateType}
                 oldVal={type}/>
        <Horizen list={areaOptions}
                 title="地区:"
                 handleClick={handleUpdateArea}
                 oldVal={area}/>
        <Horizen list={alphaOptions}
                 title="首字母:"
                 handleClick={handleUpdateAlpha}
                 oldVal={alpha}/>
      </NavContainer>
      <ListContainer>
        { enterLoading && <Loading/>}
        <Scroll
          pullDown={handlePullDown}
          pullUp={handlePullUp}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
          onScroll={forceCheck}>
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </div>

  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => ({
  getSingerDispatch (type, area, alpha) {
    dispatch(getSingerList(type, area, alpha))
  },
  updateDispatch (type, area, alpha) {
    dispatch(changePageCount(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList(type, area, alpha))
  },
  pullUpRefreshDispatch (type, area, alpha, pageCount) {
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(pageCount + 1))
    dispatch(refreshMoreSingerList(type, area, alpha))
  },
  pullDownRefreshDispatch (type, area, alpha) {
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0))
    dispatch(getSingerList(type, area, alpha))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))