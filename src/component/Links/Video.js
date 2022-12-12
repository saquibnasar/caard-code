import React from "react";
import CloseBtn from "./CloseBtn";
import { CSSTransition } from "react-transition-group";
export default function Video({ data, linkHandler }) {
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
      <div className="mt-4 h-100 overflow-hidden">
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          classNames={"video_height_up"}
        >
          <div className="youtube">
            <iframe
              className="youtube_video"
              src={`https://www.youtube-nocookie.com/embed/${url}?mute=1&modestbranding=0"`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <CloseBtn linkHandler={linkHandler} />
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
