import React, { useState } from "react";
import Card from "./Links/Card";
import Video from "./Links/Video";
import Slider from "./Links/Slider";
import Documents from "./Links/Documents";
import CardLinks from "./Links/CardLinks";

export default function CardSection({ modeData, mode, heroData }) {
  const [documentsIsTrue, setDocumentsIsTrue] = useState(true);
  const [videoIsTrue, setVideoIsTrue] = useState(true);
  const [sliderIsTrue, setSliderIsTrue] = useState(true);

  const linkHandler = (value, event) => {
    if (!event.target.classList.contains("extra-btn")) {
      if (value === "document") {
        setDocumentsIsTrue(!documentsIsTrue);
      }
      if (value === "video") {
        setVideoIsTrue(!videoIsTrue);
      }
      if (value === "slider") {
        setSliderIsTrue(!sliderIsTrue);
      }
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
                mode={mode}
                heroData={heroData}
              />
            </>
          ) : (
            ""
          )}
          {mode === "phiverse" || mode === "dahwoo" || mode === "etyne" ? (
            <>
              {JSON.parse(modeData.Slider.Links).length ? (
                <>
                  <Slider
                    data={JSON.parse(modeData.Slider.Links)}
                    linkHandler={linkHandler.bind(this, "slider")}
                    isClosed={mode}
                    mode={mode}
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {JSON.parse(modeData.Slider.Links).length ? (
                <>
                  {sliderIsTrue ? (
                    <CardLinks
                      title={JSON.parse(modeData.Slider.Links)[0].Title}
                      linkHandler={linkHandler.bind(this, "slider")}
                      mode={mode}
                    />
                  ) : (
                    <Slider
                      data={JSON.parse(modeData.Slider.Links)}
                      linkHandler={linkHandler.bind(this, "slider")}
                      mode={mode}
                    />
                  )}
                </>
              ) : (
                ""
              )}
            </>
          )}

          {mode === "phiverse" || mode === "dahwoo" || mode === "etyne" ? (
            <>
              {modeData.Document.URL && modeData.Document.isActive ? (
                <>
                  <Documents
                    data={modeData.Document}
                    linkHandler={linkHandler.bind(this, "document")}
                    isClosed={mode}
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {modeData.Document.URL && modeData.Document.isActive ? (
                <>
                  {documentsIsTrue ? (
                    <CardLinks
                      title={modeData.Document.Title}
                      linkHandler={linkHandler.bind(this, "document")}
                      mode={mode}
                    />
                  ) : (
                    <Documents
                      data={modeData.Document}
                      linkHandler={linkHandler.bind(this, "document")}
                      mode={mode}
                    />
                  )}
                </>
              ) : (
                ""
              )}
            </>
          )}

          {mode === "phiverse" || mode === "dahwoo" || mode === "etyne" ? (
            <>
              {modeData.FeaturedVideo && modeData.FeaturedVideo.isActive ? (
                <>
                  <Video
                    data={modeData.FeaturedVideo}
                    linkHandler={linkHandler.bind(this, "video")}
                    isClosed={mode}
                  />
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {modeData.FeaturedVideo && modeData.FeaturedVideo.isActive ? (
                <>
                  {videoIsTrue ? (
                    <CardLinks
                      title={modeData.FeaturedVideo.Title}
                      linkHandler={linkHandler.bind(this, "video")}
                      mode={mode}
                    />
                  ) : (
                    <Video
                      data={modeData.FeaturedVideo}
                      linkHandler={linkHandler.bind(this, "video")}
                      mode={mode}
                    />
                  )}
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
