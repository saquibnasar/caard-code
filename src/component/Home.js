import React, { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "./Loader";
import Video from "./Video";
import ImgSlider from "./ImgSlider";
import Documents from "./Documents";
import { useParams } from "react-router-dom";
// import SlidePresentationExample from "./SlidePresentationExample";

export default function Home() {
  const { userId } = useParams();
  const [data, setData] = useState();
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
  if (!(data === undefined)) {
    theme = data.Theme.toLowerCase();
    modeData = data.BusinessLinks;
    hero = JSON.parse(data.PersonalInfo.CoverImageLocation);
    logo = data.PersonalInfo.ImageLocation;

    if (data.Mode === "Personal") {
      modeData = data.PersonalLinks;
    } else if (data.Mode === "Direct") {
      modeData = data.DirectLinks;
    }
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
                <img className="img-fluid" src={hero} alt="" />
              ) : (
                ""
              )}

              <div
                className={
                  logo && !hero.length ? "container text-center" : "container"
                }
              >
                {logo ? (
                  <div className="hero-top">
                    <div
                      className={
                        hero.length
                          ? "logo-only text-center"
                          : "logo-only text-center"
                      }
                    >
                      <img
                        className="img-fluid"
                        src={data.PersonalInfo.ImageLocation}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  className={
                    hero || logo ? "hero-bottom mt-3" : "hero-bottom mt-5"
                  }
                >
                  <h1>{data.PersonalInfo.Name}</h1>
                  <h2>{data.PersonalInfo.Work}</h2>
                  <h3>
                    {data.PersonalInfo.Location}
                    {data.PersonalInfo.Country
                      ? `, ${data.PersonalInfo.Country}`
                      : ""}
                  </h3>
                  <div className="hero-detail">
                    <p>{data.PersonalInfo.Bio} </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="card-section">
              <div className="container">
                {JSON.parse(modeData.StandardLinks.Links).length ? (
                  <Card data={JSON.parse(modeData.StandardLinks.Links)} />
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
            <footer className="footer text-center">
              <div className="contaier">
                <img
                  className="img-fluid"
                  src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
                  alt=""
                />
                <h4>CREATE YOUR MICROSITE</h4>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}
