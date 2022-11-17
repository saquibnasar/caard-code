import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "./Loader";
import Video from "./Video";
import Footer from "./Footer";
import ImgSlider from "./ImgSlider";
import Documents from "./Documents";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import TextLoader from "./TextLoader";

export default function Home() {
  const { userId } = useParams();
  const [data, setData] = useState();

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
        setData(data);
      });
  }, [userId]);

  let modeData;
  let theme;
  let hero;
  let logo;
  // let mainText;
  // let primaryText;
  // let subText;
  if (!(data === undefined)) {
    theme = data.Theme.toLowerCase();
    modeData = data.BusinessLinks;
    hero = JSON.parse(data.PersonalInfo.CoverImageLocation);
    logo = data.PersonalInfo.ImageLocation;

    // let bioText = data.PersonalInfo.Bio.trim().split(" ");

    // primaryText = [];
    // subText = [];
    // bioText.map((value) => {
    //   if (primaryText.length > 35) {
    //     subText.push(value.trim());
    //   } else {
    //     primaryText.push(value.trim());
    //   }
    //   return value;
    // });

    // mainText = primaryText.join(" ");

    if (data.Mode === "Personal") {
      modeData = data.PersonalLinks;
    } else if (data.Mode === "Direct") {
      modeData = data.DirectLinks;
    }
  }

  // const sliderBtn = document.querySelector(".hero-detail .extra-btn");
  // const heroDetail = document.querySelector(".hero-detail p");

  // const showHeroDetail = () => {
  //   sliderBtn.classList.add("d-none");
  //   heroDetail.textContent = primaryText.join(" ") + " " + subText.join(" ");
  // };

  // if (sliderBtn) {
  //   console.log("sliderBTn");
  //   sliderBtn.addEventListener("click", showHeroDetail);
  // }
  // console.log(sliderBtn);

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
              {logo ? (
                <div className={hero.length ? "logo" : "logo-only text-center"}>
                  <img
                    className="img-fluid"
                    src={data.PersonalInfo.ImageLocation}
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
              <div
                className={
                  logo && !hero.length ? "container text-center" : "container"
                }
              >
                <div className={hero.length && logo ? "mt-2rem" : "mt-3"}>
                  <h1>{data.PersonalInfo.Name}</h1>
                  <h2>{data.PersonalInfo.Work}</h2>
                  <h3>
                    {data.PersonalInfo.Location}
                    {data.PersonalInfo.Country
                      ? `, ${data.PersonalInfo.Country}`
                      : ""}
                  </h3>
                  <div className="hero-detail">
                    <p id="hero__para">
                      {/* {mainText}
                      {subText.length ? (
                        <button className="extra-btn">...more</button>
                      ) : (
                        ""
                      )} */}
                      <TextLoader
                        text={data.PersonalInfo.Bio}
                        id="hero__para"
                        wordNumber="35"
                        btnClass="hero__btn"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="card-section">
              <div className="container">
                {JSON.parse(modeData.StandardLinks.Links).length ||
                JSON.parse(modeData.CustomLinks.Links).length ? (
                  <Card
                    StandardLinks={JSON.parse(modeData.StandardLinks.Links)}
                    CustomLinks={JSON.parse(modeData.CustomLinks.Links)}
                  />
                ) : (
                  ""
                )}
                {JSON.parse(modeData.Slider.Links).length ? (
                  <ImgSlider data={JSON.parse(modeData.Slider.Links)} />
                ) : (
                  ""
                )}
                {modeData.Document.URL && modeData.Document.isActive ? (
                  <Documents data={modeData.Document} />
                ) : (
                  ""
                )}
                {modeData.FeaturedVideo && modeData.FeaturedVideo.isActive ? (
                  <Video data={modeData.FeaturedVideo} />
                ) : (
                  ""
                )}
              </div>
            </section>
            <Footer theme={theme} />
          </>
        )}
      </div>
    </>
  );
}
