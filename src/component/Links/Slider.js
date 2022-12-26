import React, { useState } from "react";
import TextLoader from "../TextLoader";
import CloseBtn from "./CloseBtn";
import ImgSlider from "./ImgSlider";
import { CSSTransition } from "react-transition-group";
import NeumorphicContainer from "../NeumorphicContainer";
export default function Slider({ data, linkHandler, isClosed, mode }) {
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
      <div
        className={
          !(isClosed === "etyne")
            ? "mt-4 h-100 overflow-hidden slider round-20"
            : "mt-4 h-100 overflow-hidden slider"
        }
      >
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"slider_height_up"}
        >
          <div className="slider__text__change d-flex flex-direction-column">
            {mode === "riorpad" || mode === "buwayne" ? (
              <>
                <NeumorphicContainer
                  containerclassName="round-25 d-flex"
                  subcontainerclasses="border-none mt-0 p-2 round-25 w-100"
                >
                  <ImgSlider settings={settings} sliderImg={data} />
                </NeumorphicContainer>
                <div className="d-flex justify-content-center mt-2">
                  <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                </div>
              </>
            ) : (
              <>
                <div className={isClosed ? "order-2" : ""}>
                  <ImgSlider
                    settings={settings}
                    sliderImg={data}
                    className="round-0"
                  />
                </div>
                {title.trim() ? (
                  <div
                    className={
                      isClosed
                        ? "swiper-content round-0 order-1"
                        : "swiper-content round-0"
                    }
                  >
                    <h4 id="slider__title">
                      <TextLoader
                        text={title}
                        id="slider__title"
                        characterNumber="50"
                        btnClass="slider__btn"
                      />
                    </h4>
                  </div>
                ) : (
                  ""
                )}
                {subTitle.trim() ? (
                  <div
                    className={
                      isClosed ? "swiper-content order-3" : "swiper-content"
                    }
                  >
                    <pre
                      className={isClosed ? "slider_bottom-para" : ""}
                      id="slider__para"
                    >
                      <TextLoader
                        text={subTitle}
                        id="slider__para"
                        characterNumber="104"
                        btnClass="slider__btn"
                      />
                    </pre>
                  </div>
                ) : (
                  ""
                )}
                {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
              </>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
