import React from "react"
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = ({ children }) =>{
  return(
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={40}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="pt-10 pb-10"
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        1068: {
          slidesPerView: 3,
        },
      }}
    >
      { children }
    </Swiper>
  )
}
export default Slider