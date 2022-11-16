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
  let dumitext = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo rem voluptatem inventore quidem ab quisquam qui quia! Corporis, possimus ducimus!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo rem voluptatem inventore quidem ab quisquam qui quia! Corporis, possimus ducimus!`;

  let bioText = dumitext.trim().split(" ");

  let primaryText = [];
  let subText = [];

  bioText.map((value) => {
    if (primaryText.length > 25) {
      subText.push(value.trim());
    } else {
      primaryText.push(value.trim());
    }
    return value;
  });

  let mainText = primaryText.join(" ");
  const sliderBtn = document.querySelector(".extra-btn");
  const swipeContent = document.querySelector(".swiper-content p");

  const showText = () => {
    sliderBtn.classList.add("d-none");
    swipeContent.textContent = primaryText.join(" ") + " " + subText.join(" ");
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
            {mainText}
            {subText.length ? (
              <button className="extra-btn">...more</button>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
    </>
  );
}
