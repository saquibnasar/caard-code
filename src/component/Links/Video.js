import React from "react";
import CloseBtn from "./CloseBtn";
import { CSSTransition } from "react-transition-group";
import TextLoader from "../TextLoader";
import NeumorphicContainer from "../NeumorphicContainer";
export default function Video({ data, linkHandler, isClosed, mode }) {
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
      <CSSTransition
        in={true}
        appear={true}
        timeout={600}
        className={"video_height_up"}
      >
        <div className="">
          <div className="mt-4 h-100 overflow-hidden slider">
            <div className="youtube">
              {mode === "neuMorphism_light" || mode === "neuMorphism_dark" ? (
                <>
                  <NeumorphicContainer
                    containerclassName="p-2 round-25 d-flex"
                    subcontainerclasses="border-none mt-0 p-2 round-25 w-100 d-flex justify-content-center"
                  >
                    <iframe
                      className="youtube_video"
                      src={`https://www.youtube.com/embed/${url}?mute=1&showinfo=0`}
                      title="YouTube video player"
                      allowFullScreen
                    ></iframe>
                  </NeumorphicContainer>
                  <div className="d-flex justify-content-center mt-2">
                    <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                  </div>
                </>
              ) : (
                <>
                  {isClosed ? (
                    <div className="swiper-content border-none round-0">
                      <p className="slider_bottom-para" id="slider__para">
                        <TextLoader
                          text={data.Title}
                          id="slider__para"
                          characterNumber="95"
                          btnClass="slider__btn"
                        />
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <iframe
                    className="youtube_video"
                    src={`https://www.youtube.com/embed/${url}?mute=1&showinfo=0&modestbranding=3`}
                    allowFullScreen
                  />
                  {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
                </>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
