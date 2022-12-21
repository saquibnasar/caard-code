import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Helmet } from "react-helmet-async";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import TextLoader from "./TextLoader";
import CardSection from "./CardSection";
import ImgSlider from "./Links/ImgSlider";
import MetaDecorator from "./MetaDecorator";
import { CSSTransition } from "react-transition-group";
import NeumorphicContainer from "./NeumorphicContainer";
export default function Home() {
  const { linkType, userId } = useParams();
  const [data, setData] = useState();
  const [modeData, setModeData] = useState();
  const [theme, setTheme] = useState();
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

          if (StandardLinks.length) {
            const filterStandardLinks = StandardLinks.filter(
              (value) => value.isActive === true
            );
            if (filterStandardLinks.length) {
              let filterStandardLink = `https://${filterStandardLinks[0].URL}`;
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
              let filterCustomLink = `https://${filterCustomLinks[0].URL}`;
              window.location.replace(filterCustomLink);
            }
          }
        } else if (linkType === "personal") {
          setModeData(data.PersonalLinks);
        } else if (linkType === "business") {
          setModeData(data.BusinessLinks);
        }
        setTheme(data.Theme.toLowerCase());
        setData(data.PersonalInfo);
      });
  }, [userId]);

  let hero;
  let spanText;
  let headingText;
  let testThme = "seven";

  if (!(data === undefined)) {
    hero = JSON.parse(data.CoverImageLocation);
    const testDF = document.querySelector(".animationMOde");
    testDF.classList.add("d-none");
    if (data.Name) {
      let primaryText = data.Name.trim().split(" ");
      if (!(primaryText.length === 1)) {
        spanText = primaryText[primaryText.length - 1];
        primaryText.pop();
      }
      headingText = primaryText.join(" ");
    }
  }
  //
  return (
    <>
      <div className={`main-container theme-${testThme}`}>
        <Loader className="animationMOde" mode="home" />
        {modeData === undefined ? (
          <Loader />
        ) : (
          <>
            <CSSTransition
              in={true}
              appear={true}
              timeout={1000}
              classNames="fade"
            >
              {testThme === "neuMorphism_light" ||
              testThme === "neuMorphism_dark" ? (
                <NeumorphicContainer
                  containerclassName="neumorphic-container p-2"
                  subcontainerclasses="sub-container round-25 p-2"
                  isLayer={true}
                >
                  <div className="primary_container round-25 p-relative">
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
                            hero.length && data.ImageLocation ? "mt-5" : "mt-3"
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
                              containerclassName="p-1 round-25 mt-3"
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
                    <MetaDecorator />
                    <CardSection modeData={modeData} mode={testThme} />
                    <Footer theme={theme} mode={testThme} />
                  </div>
                </NeumorphicContainer>
              ) : (
                <div className="primary_container p-relative">
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
                          hero.length && data.ImageLocation ? "mt-2rem" : "mt-3"
                        }
                      >
                        <h1>
                          {headingText} <span>{spanText ? spanText : ""} </span>
                        </h1>
                        <h2>{data.Work}</h2>
                        <h3>
                          {data.Location}
                          {data.Country ? `, ${data.Country}` : ""}
                        </h3>
                        {data.Bio.trim() ? (
                          <div
                            className={
                              testThme === "seven" ? "d-none" : "hero-detail"
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
                  <MetaDecorator />
                  {testThme === "seven" ? (
                    <CardSection
                      modeData={modeData}
                      mode={testThme}
                      heroData={data.Bio}
                    />
                  ) : (
                    <CardSection modeData={modeData} mode={testThme} />
                  )}

                  <Footer theme={theme} mode={testThme} />
                </div>
              )}
            </CSSTransition>
          </>
        )}
      </div>
    </>
  );
}
