import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Top, Tab, TabItem } from './style'
import { NavLink } from 'react-router-dom'

const Home = props => {
  const { route } = props
  const Tabs = [
    {
      id: 1,
      path: '/recommend',
      name: '推荐'
    },
    {
      id: 2,
      path: '/singers',
      name: '歌手'
    },
    {
      id: 3,
      path: '/rank',
      name: '排行榜'
    }
  ]
  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        {
          Tabs.map(tab => {
            return (
              <NavLink key={tab.id} to={tab.path} activeClassName="selected">
                <TabItem>
                  <span> {tab.name} </span>
                </TabItem>
              </NavLink>
            )
          })
        }
      </Tab>
      { renderRoutes(route.routes) }
    </>
  )
}

export default React.memo(Home)