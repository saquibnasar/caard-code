import React, { useState } from "react";
import TextLoader from "../TextLoader";
import CloseBtn from "./CloseBtn";
import ImgSlider from "./ImgSlider";
import { CSSTransition } from "react-transition-group";
import NeumorphicContainer from "../NeumorphicContainer";
export default function Slider({ data, linkHandler, isClosed, theme, mode }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [title, setTitle] = useState(data[0].Title);
  const [subTitle, setSubTitle] = useState(data[0].SubTitle);
  const [sliderUrl, setSliderUrl] = useState(data[0].SliderUrl);

  const changeTextHandler = (tupe) => {
    setTitle(data[tupe].Title);
    setSubTitle(data[tupe].SubTitle);
    setSliderUrl(data[tupe].SliderUrl);
  };

  const changeTextDoteHandler = () => {
    setTitle(data[currentPage].Title);
    setSubTitle(data[currentPage].SubTitle);
    setSliderUrl(data[currentPage].SliderUrl);
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
      {mode ? (
        <>
          <div
            className={
              isClosed === "etyne" ||
              isClosed === "shencho" ||
              isClosed === "consmy"
                ? "mt-4 round-20"
                : "mt-4"
            }
          >
            <CSSTransition
              in={true}
              appear={true}
              timeout={600}
              classNames={"slider_height_up"}
            >
              <div className="slider__text__change d-flex flex-direction-column">
                {theme === "riorpad" || theme === "buwayne" ? (
                  <>
                    <div className="slider imgSliderDirect">
                      <NeumorphicContainer
                        containerclassName="round-25 d-flex"
                        subcontainerclasses="border-none mt-0 p-2 round-25 w-100"
                      >
                        <ImgSlider settings={settings} sliderImg={data} />
                      </NeumorphicContainer>
                      {title && title.trim() ? (
                        <div className="swiper-content">
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

                      {subTitle && subTitle.trim() ? (
                        <div className="swiper-content">
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
                    </div>
                  </>
                ) : (
                  <>
                    <div className="imgSliderDirect">
                      <div
                        className={
                          theme === "etyne" ||
                          theme === "dahwoo" ||
                          theme === "phiverse"
                            ? "slider overflow-hidden d-flex flex-direction-column"
                            : "slider overflow-hidden"
                        }
                      >
                        <div className={isClosed ? "order-2" : ""}>
                          <ImgSlider
                            settings={settings}
                            sliderImg={data}
                            className="round-0"
                          />
                        </div>
                      </div>
                      {title && title.trim() ? (
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
                      {subTitle && subTitle.trim() ? (
                        <div
                          className={
                            isClosed
                              ? `${
                                  sliderUrl && sliderUrl.trim() ? "round-0" : ""
                                } swiper-content order-3`
                              : `${
                                  sliderUrl && sliderUrl.trim() ? "round-0" : ""
                                } swiper-content`
                          }
                        >
                          <pre
                            className={
                              theme === "dahwoo" ? "slider_bottom-para" : ""
                            }
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
                    </div>
                  </>
                )}
              </div>
            </CSSTransition>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              isClosed === "etyne" ||
              isClosed === "shencho" ||
              isClosed === "consmy"
                ? "mt-4 round-20"
                : "mt-4"
            }
          >
            <CSSTransition
              in={true}
              appear={true}
              timeout={600}
              classNames={"slider_height_up"}
            >
              <div className="slider__text__change d-flex flex-direction-column">
                {theme === "riorpad" || theme === "buwayne" ? (
                  <>
                    <div className="slider">
                      <NeumorphicContainer
                        containerclassName="round-25 d-flex"
                        subcontainerclasses="border-none mt-0 p-2 round-25 w-100"
                      >
                        <ImgSlider settings={settings} sliderImg={data} />
                        {title && title.trim() ? (
                          <div className="swiper-content">
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
                        {subTitle && subTitle.trim() ? (
                          <div className="swiper-content">
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
                        {sliderUrl && sliderUrl.trim() ? (
                          <div className="download mt-3">
                            <NeumorphicContainer
                              containerclassName="p-1px d-flex round-25"
                              subcontainerclasses="border-none mt-0 round-25 w-100 download_btn"
                            >
                              <a href={sliderUrl} target="_black">
                                learn more
                              </a>
                            </NeumorphicContainer>
                          </div>
                        ) : (
                          ""
                        )}
                      </NeumorphicContainer>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={
                        theme === "etyne" ||
                        theme === "dahwoo" ||
                        theme === "phiverse"
                          ? "slider overflow-hidden d-flex flex-direction-column"
                          : "slider overflow-hidden"
                      }
                    >
                      <div className={isClosed ? "order-2" : ""}>
                        <ImgSlider
                          settings={settings}
                          sliderImg={data}
                          className="round-0"
                        />
                      </div>
                      {title && title.trim() ? (
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
                      {subTitle && subTitle.trim() ? (
                        <div
                          className={
                            isClosed
                              ? `${
                                  sliderUrl && sliderUrl.trim() ? "round-0" : ""
                                } swiper-content order-3`
                              : `${
                                  sliderUrl && sliderUrl.trim() ? "round-0" : ""
                                } swiper-content`
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
                      {sliderUrl && sliderUrl.trim() ? (
                        <div
                          className={
                            mode === "shencho" || mode === "consmy"
                              ? "download pb-4 order-3"
                              : "download pb-4 order-4"
                          }
                        >
                          <a
                            href={sliderUrl}
                            target="_black"
                            className="download_btn"
                          >
                            learn more
                          </a>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className={
                        theme === "shencho" || theme === "consmy"
                          ? "order-4"
                          : "order-3"
                      }
                    >
                      {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
                    </div>
                  </>
                )}
              </div>
            </CSSTransition>
          </div>
        </>
      )}
    </>
  );
}
