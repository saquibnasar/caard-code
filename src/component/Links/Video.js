import React from "react";
import CloseBtn from "./CloseBtn";
import { CSSTransition } from "react-transition-group";
import TextLoader from "../TextLoader";
import NeumorphicContainer from "../NeumorphicContainer";
export default function Video({ data, linkHandler, isClosed, theme, mode }) {
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
      {mode ? (
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          className={"video_height_up"}
        >
          <div className="">
            <div className="mt-4 h-100 youtube slider videoDirect">
              {theme === "riorpad" || theme === "buwayne" ? (
                <>
                  <NeumorphicContainer
                    containerclassName="round-25"
                    subcontainerclasses="border-none mt-0 p-1 round-25 w-100 justify-content-center"
                  >
                    <div className="_username__featuredLink__MeYB7">
                      <div className="BaseEmbeddedLink_baseEmbeddedLinkWrapper__SlpfZ">
                        <div className="BaseEmbeddedLink_baseEmbeddedLink__WXu5a">
                          <div className="BaseEmbeddedLink_baseEmbeddedLinkContainer__SlSm5 BaseEmbeddedLink_baseEmbeddedLinkContainerEmbed__py5x8">
                            <div className="BaseEmbeddedLink_baseEmbeddedLinkItem__EDHSQ BaseEmbeddedLink_baseEmbeddedLinkItemVisible__63uQ_">
                              <div className="EmbeddedYouTube_embeddedYouTube__kZebg EmbeddedYouTube_featuredLinkEmbeddedVideo__GERzu">
                                <div>
                                  <iframe
                                    className="EmbeddedYouTube_embeddedVideoIframe__BnmH8"
                                    src={`https://www.youtube.com/embed/${url}?showinfo=0&amp;modestbranding=1&modestbranding=3&controls=0&rel=1&height="250"`}
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeumorphicContainer>
                  {data.Title.trim() ? (
                    <>
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
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <div className="_username__featuredLink__MeYB7">
                    <div className="BaseEmbeddedLink_baseEmbeddedLinkWrapper__SlpfZ">
                      <div className="BaseEmbeddedLink_baseEmbeddedLink__WXu5a">
                        <div className="BaseEmbeddedLink_baseEmbeddedLinkContainer__SlSm5 BaseEmbeddedLink_baseEmbeddedLinkContainerEmbed__py5x8">
                          <div className="BaseEmbeddedLink_baseEmbeddedLinkItem__EDHSQ BaseEmbeddedLink_baseEmbeddedLinkItemVisible__63uQ_">
                            <div className="EmbeddedYouTube_embeddedYouTube__kZebg EmbeddedYouTube_featuredLinkEmbeddedVideo__GERzu">
                              <div>
                                <iframe
                                  className="EmbeddedYouTube_embeddedVideoIframe__BnmH8"
                                  src={`https://www.youtube.com/embed/${url}?showinfo=0&amp;modestbranding=1&modestbranding=3&controls=0&rel=1&contore=1`}
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.Title.trim() ? (
                    <>
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
                    </>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </CSSTransition>
      ) : (
        <CSSTransition
          in={true}
          appear={true}
          timeout={600}
          className={"video_height_up"}
        >
          <div className="">
            <div className="mt-4 h-100 overflow-hidden youtube slider">
              {theme === "riorpad" || theme === "buwayne" ? (
                <>
                  <NeumorphicContainer
                    containerclassName="round-25"
                    subcontainerclasses="border-none mt-0 p-1 round-25 w-100 justify-content-center"
                  >
                    <div className="_username__featuredLink__MeYB7">
                      <div className="BaseEmbeddedLink_baseEmbeddedLinkWrapper__SlpfZ">
                        <div className="BaseEmbeddedLink_baseEmbeddedLink__WXu5a">
                          <div className="BaseEmbeddedLink_baseEmbeddedLinkContainer__SlSm5 BaseEmbeddedLink_baseEmbeddedLinkContainerEmbed__py5x8">
                            <div className="BaseEmbeddedLink_baseEmbeddedLinkItem__EDHSQ BaseEmbeddedLink_baseEmbeddedLinkItemVisible__63uQ_">
                              <div className="EmbeddedYouTube_embeddedYouTube__kZebg EmbeddedYouTube_featuredLinkEmbeddedVideo__GERzu">
                                <div>
                                  <iframe
                                    className="EmbeddedYouTube_embeddedVideoIframe__BnmH8"
                                    src={`https://www.youtube.com/embed/${url}?showinfo=0&amp;modestbranding=1&modestbranding=3&controls=0&rel=1&height="250"`}
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeumorphicContainer>
                  <div className="d-flex justify-content-center mt-2">
                    <CloseBtn linkHandler={linkHandler} mode="neuMorphism" />
                  </div>
                </>
              ) : (
                <>
                  {data.Title.trim() ? (
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
                    </>
                  ) : (
                    ""
                  )}
                  <div className="_username__featuredLink__MeYB7">
                    <div className="BaseEmbeddedLink_baseEmbeddedLinkWrapper__SlpfZ">
                      <div className="BaseEmbeddedLink_baseEmbeddedLink__WXu5a">
                        <div className="BaseEmbeddedLink_baseEmbeddedLinkContainer__SlSm5 BaseEmbeddedLink_baseEmbeddedLinkContainerEmbed__py5x8">
                          <div className="BaseEmbeddedLink_baseEmbeddedLinkItem__EDHSQ BaseEmbeddedLink_baseEmbeddedLinkItemVisible__63uQ_">
                            <div className="EmbeddedYouTube_embeddedYouTube__kZebg EmbeddedYouTube_featuredLinkEmbeddedVideo__GERzu">
                              <div>
                                <iframe
                                  className="EmbeddedYouTube_embeddedVideoIframe__BnmH8"
                                  src={`https://www.youtube.com/embed/${url}?showinfo=0&amp;modestbranding=1&modestbranding=3&controls=0&rel=1&contore=1`}
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isClosed ? <CloseBtn linkHandler={linkHandler} /> : ""}
                </>
              )}
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
}
