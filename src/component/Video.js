import React from "react";

export default function Video({ data }) {
  let url;
  if (data.URL.split("/")) {
    url = data.URL.split("/")[data.URL.split("/").length - 1].toString();
  } else if (!(data.URL.split("=")[0].length === 31)) {
    url = data.URL.split("embed")[1].split("/")[1].split("?")[0];
  } else {
    url = data.URL.split("=")[1].toString().split("&")[0];
  }

  return (
    <>
      <div className="youtube mt-4 slider">
        <iframe
          className="youtube_video"
          src={`https://www.youtube-nocookie.com/embed/${url}?mute=1&modestbranding=0"`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className="swiper-content">
          <h4>{data.Title ? data.Title : data.Name}</h4>
        </div>
      </div>
    </>
  );
}
