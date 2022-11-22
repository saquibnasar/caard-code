import React, { useState } from "react";
import TextLoader from "./TextLoader";
import ImgSlider from "./ImgSlider";
export default function Slider({ data }) {
  const [titleNum, setTitleNum] = useState(0);
  const changeTextHandler = (type) => {
    const slickSlides = document.querySelectorAll(".slick-slide");
    for (const slickSlide of slickSlides) {
      if (slickSlide.classList.contains("slick-active")) {
        if (type === "increase") {
          if (titleNum + 1 === data.length) {
            setTitleNum(0);
          } else {
            setTitleNum(parseInt(slickSlide.getAttribute("data-index")) + 1);
          }
        } else if (type === "decrease") {
          if (titleNum === 0) {
            setTitleNum(data.length - 1);
          } else {
            setTitleNum(parseInt(slickSlide.getAttribute("data-index")) - 1);
          }
        }
      }
    }
  };
  const changeTextDoteHandler = (event) => {
    setTitleNum(parseInt(event.target.textContent) - 1);
  };
  const slickDots = document.querySelector(".slick-dots");
  if (slickDots) {
    slickDots.addEventListener("click", changeTextDoteHandler);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        changeTextHandler("increase");
      } else {
        changeTextHandler("decrease");
      }
    }
    xDown = null;
    yDown = null;
  }

  return (
    <>
      <div className="slider mt-4">
        <ImgSlider settings={settings} sliderImg={data} />
        <div className="swiper-content round-0">
          <h4>
            {data[titleNum] === undefined
              ? data[0].Title
              : data[titleNum].Title}
          </h4>
        </div>
        <div className="swiper-content">
          <p id="slider__para">
            <TextLoader
              text={
                data[titleNum] === undefined
                  ? data[0].SubTitle
                  : data[titleNum].SubTitle
              }
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
