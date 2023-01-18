import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import TextLoader from "./TextLoader";
import CardSection from "./CardSection";
import ImgSlider from "./Links/ImgSlider";
import { CSSTransition } from "react-transition-group";
import NeumorphicContainer from "./NeumorphicContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { RWebShare } from "react-web-share";
export default function Home() {
  const { linkType, userId } = useParams();
  const [data, setData] = useState();
  const [modeData, setModeData] = useState();
  const [theme, setTheme] = useState();
  const [mode, setMode] = useState();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    fetch(
      `https://7drkndiu7g.execute-api.ap-south-1.amazonaws.com/v1/previewprofile/${userId}`
    )
      .then((res) => res)
      .then((res) => res.json())
      .then((data) => {
        if (linkType === "direct") {
          const StandardLinks = JSON.parse(
            data.DirectLinks.StandardLinks.Links
          );
          const CustomLinks = JSON.parse(data.DirectLinks.CustomLinks.Links);
          const sliders = JSON.parse(data.DirectLinks.Slider.Links);
          let isSliderValueTrue = false;
          for (const slider of sliders) {
            if (slider.isActive) {
              isSliderValueTrue = slider.isActive;
            }
          }

          if (
            isSliderValueTrue ||
            data.DirectLinks.Document.isActive ||
            data.DirectLinks.FeaturedVideo.isActive
          ) {
            setModeData(data.DirectLinks);
          } else if (StandardLinks.length) {
            const filterStandardLinks = StandardLinks.filter((value) => {
              return value.isActive === true;
            });

            if (filterStandardLinks.length) {
              let filterStandardLink = filterStandardLinks[0].URL;

              if (filterStandardLinks[0].Name === "Phone") {
                filterStandardLink = `tel:${filterStandardLinks[0].URL}`;
              } else if (filterStandardLinks[0].Name === "Whatsapp") {
                filterStandardLink = `https://wa.me/${filterStandardLinks[0].URL}`;
              } else if (filterStandardLinks[0].Name === "Gmail") {
                filterStandardLink = `mailto:${filterStandardLinks[0].URL}`;
              }

              window.location.replace(filterStandardLink);
            } else {
              const filterCustomLinks = CustomLinks.filter(
                (value) => value.isActive === true
              );

              let filterCustomLink = filterCustomLinks[0].URL;
              window.location.replace(filterCustomLink);
            }
          }
        } else if (linkType === "personal") {
          setModeData(data.PersonalLinks);
        } else if (linkType === "business") {
          setModeData(data.BusinessLinks);
        }
        setTheme(data.Theme.toLowerCase().split(" ")[0]);
        setMode(linkType);
        setData(data.PersonalInfo);
      });
  }, [userId]);

  let hero;
  let spanText;
  let headingText;

  if (!(data === undefined)) {
    hero = JSON.parse(data.CoverImageLocation);

    window.addEventListener("scroll", () => {
      const TopBar = document.querySelector(".TopBar");
      if (window.scrollY > 266) {
        TopBar.classList.remove("d-none");
      } else {
        TopBar.classList.add("d-none");
      }
    });

    if (data.Name) {
      let primaryText = data.Name.trim().split(" ");
      if (!(primaryText.length === 1)) {
        spanText = primaryText[primaryText.length - 1];
        primaryText.pop();
      }
      headingText = primaryText.join(" ");
    }
  }

  return (
    <>
      <div className={`main-container theme-${theme}`}>
        {modeData === undefined ? (
          <Loader />
        ) : (
          <>
            {mode === "direct" ? (
              <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
              >
                {theme === "riorpad" || theme === "buwayne" ? (
                  <NeumorphicContainer
                    containerclassName="neumorphic-container round-25"
                    subcontainerclasses="sub-container round-25 p-2"
                    isLayer={true}
                  >
                    <div className="primary_container round-25 p-relative h-100vh">
                      {/* <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames={modeData === undefined ? "" : "slide"}
                      >
                        <Loader mode="home" />
                      </CSSTransition> */}
                      <div className="TopBar d-none">
                        {data.ImageLocation ? (
                          <div
                            className={
                              hero.length ? "logo" : "logo-only text-center"
                            }
                          >
                            <img
                              className="img-fluid"
                              src={data.ImageLocation}
                              alt=""
                            />
                          </div>
                        ) : (
                          ""
                        )}

                        <h1>
                          {headingText} <span>{spanText ? spanText : ""} </span>
                        </h1>
                        <a className="share">
                          <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        </a>
                      </div>
                      <CardSection
                        modeData={modeData}
                        theme={theme}
                        mode={mode}
                      />
                      <Footer theme={theme} mode={theme} userName={data.Name} />
                    </div>
                  </NeumorphicContainer>
                ) : (
                  <div className="primary_container p-relative h-100vh">
                    {/* <CSSTransition
                      in={true}
                      appear={true}
                      timeout={1000}
                      classNames={modeData === undefined ? "" : "slide"}
                    >
                      <Loader mode="home" />
                    </CSSTransition> */}
                    <div className="TopBar d-none">
                      {data.ImageLocation ? (
                        <div
                          className={
                            hero.length ? "logo" : "logo-only text-center"
                          }
                        >
                          <img
                            className="img-fluid"
                            src={data.ImageLocation}
                            alt=""
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <h1>
                        {headingText} <span>{spanText ? spanText : ""} </span>
                      </h1>
                      <a className="share">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </a>
                    </div>
                    <CardSection
                      modeData={modeData}
                      theme={theme}
                      mode={mode}
                    />

                    <Footer theme={theme} mode={theme} userName={data.Name} />
                  </div>
                )}
              </CSSTransition>
            ) : (
              <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
              >
                <>
                  {theme === "riorpad" || theme === "buwayne" ? (
                    <NeumorphicContainer
                      containerclassName="neumorphic-container"
                      subcontainerclasses="sub-container round-25 p-2"
                      isLayer={true}
                    >
                      <div className="primary_container round-25 p-relative">
                        {/* <CSSTransition
                          in={true}
                          appear={true}
                          timeout={1000}
                          classNames={modeData === undefined ? "" : "slide"}
                        >
                          <Loader mode="home" />
                        </CSSTransition> */}
                        <section className="hero">
                          {hero.length ? (
                            <div className="slider border-none">
                              <ImgSlider
                                settings={settings}
                                sliderImg={hero}
                                className="round-0"
                                border="slick-list-border-0"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          {data.ImageLocation ? (
                            <div
                              className={
                                hero.length ? "logo" : "logo-only text-center"
                              }
                            >
                              <NeumorphicContainer
                                containerclassName="rounded-circle p-1px"
                                subcontainerclasses="rounded-circle p-1 d-flex"
                                isLayer={false}
                              >
                                <img
                                  className="img-fluid"
                                  src={data.ImageLocation}
                                  alt=""
                                />
                              </NeumorphicContainer>
                            </div>
                          ) : (
                            ""
                          )}

                          <div
                            className={
                              data.ImageLocation && !hero.length
                                ? "container text-center"
                                : "container"
                            }
                          >
                            <div
                              className={
                                hero.length && data.ImageLocation
                                  ? "mt-5"
                                  : "mt-3"
                              }
                            >
                              <h1>
                                {headingText}{" "}
                                <span>{spanText ? spanText : ""} </span>
                              </h1>
                              <h2>{data.Work}</h2>
                              <h3>
                                {data.Location}
                                {data.Country ? `, ${data.Country}` : ""}
                              </h3>
                              {data.Bio.trim() ? (
                                <NeumorphicContainer
                                  containerclassName="round-25 mt-3"
                                  subcontainerclasses="border-none mt-0 round-25 w-100"
                                >
                                  <div className="hero-detail">
                                    <pre id="hero__para">
                                      <TextLoader
                                        text={data.Bio}
                                        id="hero__para"
                                        characterNumber="200"
                                        btnClass="hero__btn"
                                      />
                                    </pre>
                                  </div>
                                </NeumorphicContainer>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </section>
                        <div className="TopBar d-none">
                          {data.ImageLocation ? (
                            <div
                              className={
                                hero.length ? "logo" : "logo-only text-center"
                              }
                            >
                              <img
                                className="img-fluid"
                                src={data.ImageLocation}
                                alt=""
                              />
                            </div>
                          ) : (
                            ""
                          )}

                          <h1>
                            {headingText}{" "}
                            <span>{spanText ? spanText : ""} </span>
                          </h1>
                          <a className="share">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                          </a>
                        </div>
                        <CardSection modeData={modeData} theme={theme} />
                        <Footer
                          theme={theme}
                          mode={theme}
                          userName={data.Name}
                        />
                      </div>
                    </NeumorphicContainer>
                  ) : (
                    <div className="primary_container p-relative">
                      {/* <CSSTransition
                        in={true}
                        appear={true}
                        timeout={1000}
                        classNames={modeData === undefined ? "" : "slide"}
                      >
                        <Loader mode="home" />
                      </CSSTransition> */}
                      <section className="hero">
                        {hero.length ? (
                          <div className="slider border-none round-0 box-shadow-none">
                            <ImgSlider
                              settings={settings}
                              sliderImg={hero}
                              className="round-0"
                              border="slick-list-border-0"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {data.ImageLocation ? (
                          <div
                            className={
                              hero.length ? "logo" : "logo-only text-center"
                            }
                          >
                            <img
                              className="img-fluid"
                              src={data.ImageLocation}
                              alt=""
                            />
                          </div>
                        ) : (
                          ""
                        )}

                        <div
                          className={
                            data.ImageLocation && !hero.length
                              ? "container text-center"
                              : "container"
                          }
                        >
                          <div
                            className={
                              hero.length && data.ImageLocation
                                ? "mt-2rem"
                                : "mt-3"
                            }
                          >
                            <h1>
                              {headingText}{" "}
                              <span>{spanText ? spanText : ""} </span>
                            </h1>
                            <h2>{data.Work}</h2>
                            <h3>
                              {data.Location}
                              {data.Country ? `, ${data.Country}` : ""}
                            </h3>

                            {data.Bio.trim() ? (
                              <div
                                className={
                                  theme === "etyne" || theme === "dahwoo"
                                    ? "d-none"
                                    : "hero-detail"
                                }
                              >
                                <pre id="hero__para">
                                  <TextLoader
                                    text={data.Bio}
                                    id="hero__para"
                                    characterNumber="200"
                                    btnClass="hero__btn"
                                  />
                                </pre>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </section>
                      <div className="TopBar d-none">
                        {data.ImageLocation ? (
                          <div
                            className={
                              hero.length ? "logo" : "logo-only text-center"
                            }
                          >
                            <img
                              className="img-fluid"
                              src={data.ImageLocation}
                              alt=""
                            />
                          </div>
                        ) : (
                          ""
                        )}

                        <h1>
                          {headingText} <span>{spanText ? spanText : ""} </span>
                        </h1>
                        <RWebShare
                          data={{
                            url: window.location.href,
                          }}
                        >
                          <button className="share cursor_pointer">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                          </button>
                        </RWebShare>
                      </div>
                      {theme === "etyne" || theme === "dahwoo" ? (
                        <CardSection
                          modeData={modeData}
                          theme={theme}
                          heroData={data.Bio}
                        />
                      ) : (
                        <CardSection modeData={modeData} theme={theme} />
                      )}

                      <Footer mode={mode} userName={data.Name} />
                    </div>
                  )}
                </>
              </CSSTransition>
            )}
          </>
        )}
      </div>
    </>
  );
}
