import React, { useEffect, useState } from "react";
import Loader from "./Loader";

import Footer from "./Footer";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import TextLoader from "./TextLoader";
import CardSection from "./CardSection";

export default function Home() {
  const { userId } = useParams();
  const [data, setData] = useState();
  const [modeData, setModeData] = useState();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetch(
      `https://7drkndiu7g.execute-api.ap-south-1.amazonaws.com/v1/previewprofile/${userId}`
    )
      .then((res) => res)
      .then((res) => res.json())
      .then((data) => {
        if (data.Mode === "Direct") {
          const StandardLinks = JSON.parse(
            data.DirectLinks.StandardLinks.Links
          );
          const CustomLinks = JSON.parse(data.DirectLinks.CustomLinks.Links);
          if (StandardLinks.length) {
            window.location.replace(StandardLinks[0].URL);
          } else if (CustomLinks.length) {
            window.location.replace(CustomLinks[0].URL);
          }
        }
        setModeData(data.BusinessLinks);
        if (data.Mode === "Personal") {
          setModeData(data.PersonalLinks);
        }
        setData(data);
      });
  }, [userId]);

  let theme;
  let hero;
  let PersonalInfo;
  if (!(data === undefined)) {
    theme = data.Theme.toLowerCase();
    hero = JSON.parse(data.PersonalInfo.CoverImageLocation);
    PersonalInfo = data.PersonalInfo;
  }

  return (
    <>
      <div className={`main-container theme-${theme}`}>
        {data === undefined ? (
          <Loader />
        ) : (
          <>
            <section className="hero">
              {hero.length ? (
                <div className="slider round-0">
                  <div className="swiper mySwiper round-0 slick-list-border-0">
                    <div className="swiper-wrapper round-0">
                      <Slider {...settings}>
                        {hero.map((value, id) => {
                          return (
                            <div key={id} className="swiper-slide">
                              <img
                                className="img-fluid"
                                src={value.URL}
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {PersonalInfo.ImageLocation ? (
                <div className={hero.length ? "logo" : "logo-only text-center"}>
                  <img
                    className="img-fluid"
                    src={PersonalInfo.ImageLocation}
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
              <div
                className={
                  PersonalInfo.ImageLocation && !hero.length
                    ? "container text-center"
                    : "container"
                }
              >
                <div
                  className={
                    hero.length && PersonalInfo.ImageLocation
                      ? "mt-2rem"
                      : "mt-3"
                  }
                >
                  <h1>{PersonalInfo.Name}</h1>
                  <h2>{PersonalInfo.Work}</h2>
                  <h3>
                    {PersonalInfo.Location}
                    {PersonalInfo.Country ? `, ${PersonalInfo.Country}` : ""}
                  </h3>
                  <div className="hero-detail">
                    <p id="hero__para">
                      <TextLoader
                        text={PersonalInfo.Bio}
                        id="hero__para"
                        wordNumber="35"
                        btnClass="hero__btn"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <CardSection modeData={modeData} />
            <Footer theme={theme} />
          </>
        )}
      </div>
    </>
  );
}
