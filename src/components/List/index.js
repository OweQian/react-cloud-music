import React from 'react'
import { ListWrapper, List, ListItem } from './style'
import { getCount } from '../../utils'

const RecommendList = props => {
  const { recommendList } = props
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map(recommend => {
            return (
              <ListItem key={recommend.id}>
                <div className="img_wrapper">
                  <div className="decorate"/>
                  <img src={`${recommend.picUrl}?param=300*300`} width="100%" height="100%" alt="music"/>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(recommend.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{recommend.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)