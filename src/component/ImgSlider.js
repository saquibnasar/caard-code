import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import TextLoader from "./TextLoader";
export default function ImgSlider({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const test =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aliquam eaque, quo vitae hic placeat eius ullam doloremque dicta sit iste ratione explicabo enim cum. Sint quo veritatis aliquid deserunt atque suscipit saepe reprehenderit repellendus ullam. Voluptatem doloremque nobis ex voluptatum repellendus ullam pariatur voluptate!";

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
          <p id="slider__para">
            <TextLoader
              text={test}
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
