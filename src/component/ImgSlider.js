import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
export default function ImgSlider({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderBtn = document.querySelector(".slider .sliderBtn");

  const showText = () => {
    const morePara = document.getElementById("more");
    sliderBtn.classList.add("d-none");
    morePara.classList.remove("d-none");
    morePara.classList.add("d-block");
  };

  if (!(sliderBtn === null) && sliderBtn) {
    sliderBtn.addEventListener("click", showText);
  }
  return (
    <>
      <div className="slider mt-4">
        <div className="swiper mySwiper">
          <div className="swiper-wrapper">
            <Slider {...settings}>
              {data.map((value, id) => {
                return (
                  <div key={id} className="swiper-slide">
                    <img src={value.URL} alt="" />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
        <div className="swiper-content round-0">
          <h4>{data[0].Title}</h4>
        </div>
        <div className="swiper-content">
          <p>
            Yes, even the drive to work, school or everyday essentials is a
            breeze when you are so much conveniently located in the steadily
            alive <button className="sliderBtn">...more</button>
            <span className="d-none" id="more">
              Yes, even the drive to work, school or everyday essentials is a
              breeze when you are so much conveniently located in the steadily
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
