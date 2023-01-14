import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

export default function ImgSlider(props) {
  return (
    <>
      <div className={`swiper mySwiper ${props.border} ${props.className}`}>
        <div className={`swiper-wrapper ${props.className}`}>
          <Slider {...props.settings}>
            {props.sliderImg.map((value, id) => {
              if (value.isActive) {
                return (
                  <div key={id} className="swiper-slide">
                    <img className="img-fluid" src={value.URL} alt="" />
                  </div>
                );
              } else if (value.isActive === undefined) {
                return (
                  <div key={id} className="swiper-slide">
                    <img className="img-fluid" src={value.URL} alt="" />
                  </div>
                );
              }
              return "";
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}
