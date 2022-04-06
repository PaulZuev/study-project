import React from "react"
import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import ArrowRight from "../../images/arrowRight.svg";
import ArrowLeft from "../../images/arrowLeft.svg";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Slider = ({ children }) =>{

  return(
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        loop
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="pt-10 pb-10"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1068: {
            slidesPerView: 3,
          },
        }}
      >
        { children }
        <div className="flex flex-row justify-between mt-5 md:mt-10">
          <div className="prev cursor-pointer flex items-center arrow-button rounded">
          <ArrowLeft className="h-5 w-5"/> Prev
          </div>
          <div className="next cursor-pointer flex items-center arrow-button rounded">
            Next <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </Swiper>
    </>
  )
}
export default Slider