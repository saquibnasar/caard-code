import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

export default function ImgSlider({ sliderImg, settings }) {
  return (
    <>
      <div className="swiper mySwiper round-0 slick-list-border-0">
        <div className="swiper-wrapper round-0">
          <Slider {...settings}>
            {sliderImg.map((value, id) => {
              return (
                <div key={id} className="swiper-slide">
                  <img className="img-fluid" src={value.URL} alt="" />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
