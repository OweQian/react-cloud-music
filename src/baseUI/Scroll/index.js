import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import Loading from '../Loading/index'
import LoadingV2 from '../LoadingV2/index'
import { debounce } from '../../utils'
import { ScrollContainer, PullDownLoading, PullUpLoading } from './style'
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState(null)
  const scrollContainerRef = useRef(null)
  const {
    direction,
    click,
    refresh,
    onScroll,
    pullUp,
    pullDown,
    bounceTop: top,
    bounceBottom: bottom,
    pullUpLoading,
    pullDownLoading,
  } = props

  // 创建 better-scroll
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top,
        bottom
      }
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    //eslint-disable-next-line
  }, [])

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  // 绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off('scroll')
    }
  }, [onScroll, bScroll])

  // 暴露刷新接口和bs实例
  useImperativeHandle(ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getScroll () {
      if (bScroll) {
        return bScroll
      }
    }
  }))

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp,300)
  }, [pullUp])

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 3000)
  }, [pullDown])

  // 上拉加载
  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY +100) {
        pullUpDebounce()
      }
    })
    return () => {
      bScroll.off('scrollEnd')
    }
  }, [pullUp, pullUpDebounce, bScroll])

  // 下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on('touchEnd', (pos) => {
      if (pos.y > 50) {
        pullDownDebounce()
      }
    })
    return () => {
      bScroll.off('touchEnd')
    }
  }, [pullDown, pullDownDebounce, bScroll])

  const PullUpDisplayStyle = pullUpLoading ? { display: ''} : { display: 'none'}
  const PullDownDisplayStyle = pullDownLoading ? { display: ''} : { display: 'none'}

  return (
    <ScrollContainer ref={scrollContainerRef}>
      { props.children }
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading/>
      </PullUpLoading>
      <PullDownLoading style={PullDownDisplayStyle}>
        <LoadingV2/>
      </PullDownLoading>
    </ScrollContainer>
  )
})

Scroll.propTypes = {
  // 滚动方向
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  // 是否支持点击
  click: PropTypes.bool,
  // 是否刷新
  refresh: PropTypes.func,
  // 滑动触发的回调函数
  onScroll: PropTypes.func,
  // 上拉加载
  pullUp: PropTypes.func,
  // 下拉加载
  pullDown: PropTypes.func,
  // 是否显示上拉 loading
  pullUpLoading: PropTypes.bool,
  // 是否显示下拉 loading
  pullDownLoading: PropTypes.bool,
  // 是否支持向上吸顶
  bounceTop: PropTypes.bool,
  // 是否支持向下吸顶
  bounceBottom: PropTypes.bool
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onscroll: null,
  pullUp: null,
  pullDown: null,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true
}
export default React.memo(Scroll)