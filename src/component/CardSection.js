import React from "react";
import Card from "./Card";
import Video from "./Video";
import Slider from "./Slider";
import Documents from "./Documents";
export default function CardSection({ modeData }) {
  return (
    <>
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
            <Slider data={JSON.parse(modeData.Slider.Links)} />
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
    </>
  );
}
