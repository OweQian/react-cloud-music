import React, { useState, useEffect } from 'react'
import { SliderContainer } from './style'
import 'swiper/swiper-bundle.css'
import Swiper from 'swiper'

const Slider = props => {
  const [sliderSwiper, setSliderSwiper ] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay:3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before"/>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} alt="推荐" width="100%" height="100%"/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"/>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)