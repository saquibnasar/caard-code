import React from "react";
import TextLoader from "./TextLoader";
import ImgSlider from "./ImgSlider";
export default function Slider({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="slider mt-4">
        <ImgSlider settings={settings} sliderImg={data} />
        <div className="swiper-content round-0">
          <h4>{data[0].Title}</h4>
        </div>
        <div className="swiper-content">
          <p id="slider__para">
            <TextLoader
              text={data[0].Title}
              id="slider__para"
              wordNumber="15"
              btnClass="slider__btn"
            />
          </p>
        </div>
      </div>
    </>
  );
}
