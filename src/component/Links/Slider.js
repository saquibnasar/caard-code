import React, { useState } from "react";
import TextLoader from "../TextLoader";
import CloseBtn from "./CloseBtn";
import ImgSlider from "./ImgSlider";
import { CSSTransition } from "react-transition-group";
export default function Slider({ data, linkHandler }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState(data[0].Title);
  const [subTitle, setSubTitle] = useState(data[0].SubTitle);

  const changeTextHandler = (tupe) => {
    setTitle(data[tupe].Title);
    setSubTitle(data[tupe].SubTitle);
  };

  const changeTextDoteHandler = () => {
    setTitle(data[currentPage].Title);
    setSubTitle(data[currentPage].SubTitle);
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
    afterChange: (current) => {
      changeTextHandler(current);
      setCurrentPage(current);
    },
  };

  return (
    <>
      <div className="mt-4 h-100 overflow-hidden">
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"slider_height_up"}
        >
          <div className="slider slider__text__change">
            <ImgSlider settings={settings} sliderImg={data} />
            <div className="swiper-content round-0">
              <h4 id="slider__title">
                <TextLoader
                  text={title}
                  id="slider__title"
                  wordNumber="15"
                  btnClass="slider__btn"
                />
              </h4>
            </div>
            <div className="swiper-content">
              <p id="slider__para">
                <TextLoader
                  text={subTitle}
                  id="slider__para"
                  wordNumber="15"
                  btnClass="slider__btn"
                />
              </p>
            </div>
            <CloseBtn linkHandler={linkHandler} />
          </div>
        </CSSTransition>
      </div>
    </>
  );
}