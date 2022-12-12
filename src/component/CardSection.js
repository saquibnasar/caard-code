import React, { useState } from "react";
import Card from "./Links/Card";
import Video from "./Links/Video";
import Slider from "./Links/Slider";
import Documents from "./Links/Documents";
import CardLinks from "./Links/CardLinks";
import { CSSTransition } from "react-transition-group";
export default function CardSection({ modeData }) {
  const [documentsIsTrue, setDocumentsIsTrue] = useState(true);
  const [videoIsTrue, setVideoIsTrue] = useState(true);
  const [sliderIsTrue, setSliderIsTrue] = useState(true);

  const linkHandler = (value) => {
    if (value === "document") {
      setDocumentsIsTrue(!documentsIsTrue);
    }
    if (value === "video") {
      setVideoIsTrue(!videoIsTrue);
    }
    if (value === "slider") {
      setSliderIsTrue(!sliderIsTrue);
    }
  };

  return (
    <>
      <section className="card-section">
        <div className="container">
          {JSON.parse(modeData.StandardLinks.Links).length ||
          JSON.parse(modeData.CustomLinks.Links).length ? (
            <>
              <Card
                StandardLinks={JSON.parse(modeData.StandardLinks.Links)}
                CustomLinks={JSON.parse(modeData.CustomLinks.Links)}
              />
            </>
          ) : (
            ""
          )}
          {JSON.parse(modeData.Slider.Links).length ? (
            <>
              {sliderIsTrue ? (
                <CardLinks
                  title={JSON.parse(modeData.Slider.Links)[0].Title}
                  linkHandler={linkHandler.bind(this, "slider")}
                />
              ) : (
                <Slider
                  data={JSON.parse(modeData.Slider.Links)}
                  linkHandler={linkHandler.bind(this, "slider")}
                />
              )}
            </>
          ) : (
            ""
          )}

          {modeData.Document.URL && modeData.Document.isActive ? (
            <>
              <div className="testbita">
                {documentsIsTrue ? (
                  <CardLinks
                    title={modeData.Document.Title}
                    linkHandler={linkHandler.bind(this, "document")}
                  />
                ) : (
                  <Documents
                    data={modeData.Document}
                    linkHandler={linkHandler.bind(this, "document")}
                  />
                )}
              </div>
            </>
          ) : (
            ""
          )}

          {modeData.FeaturedVideo && modeData.FeaturedVideo.isActive ? (
            <>
              {videoIsTrue ? (
                <CardLinks
                  title={modeData.FeaturedVideo.Title}
                  linkHandler={linkHandler.bind(this, "video")}
                />
              ) : (
                <Video
                  data={modeData.FeaturedVideo}
                  linkHandler={linkHandler.bind(this, "video")}
                />
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}
