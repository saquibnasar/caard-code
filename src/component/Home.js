import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Helmet } from "react-helmet-async";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import TextLoader from "./TextLoader";
import CardSection from "./CardSection";
import ImgSlider from "./ImgSlider";
import MetaDecorator from "./MetaDecorator";

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
  if (!(data === undefined)) {
    hero = JSON.parse(data.CoverImageLocation);
  }

  return (
    <>
      <div className={`main-container theme-${theme}`}>
        {modeData === undefined ? (
          <Loader />
        ) : (
          <>
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
                <div className={hero.length ? "logo" : "logo-only text-center"}>
                  <img className="img-fluid" src={data.ImageLocation} alt="" />
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
                  <h1>{data.Name}</h1>
                  <h2>{data.Work}</h2>
                  <h3>
                    {data.Location}
                    {data.Country ? `, ${data.Country}` : ""}
                  </h3>
                  <div className="hero-detail">
                    <p id="hero__para">
                      <TextLoader
                        text={data.Bio}
                        id="hero__para"
                        wordNumber="35"
                        btnClass="hero__btn"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <MetaDecorator />
            <CardSection modeData={modeData} />
            <Footer theme={theme} />
          </>
        )}
      </div>
    </>
  );
}
