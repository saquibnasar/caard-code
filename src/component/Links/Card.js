import React from "react";
import NeumorphicContainer from "../NeumorphicContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import TextLoader from "../TextLoader";
export default function Card({ StandardLinks, CustomLinks, mode, heroData }) {
  return (
    <>
      <div className="cardItem">
        <div
          className={
            mode === "dahwoo" || mode === "etyne"
              ? "social_media d-flex justify-content-center align-items-center mt-4 gap-2"
              : ""
          }
        >
          {StandardLinks
            ? StandardLinks.map((value, id) => {
                if (!value.isActive) {
                  return "";
                }
                let link = `${value.URL}`;
                let url = value.Name;
                if (url === "Whatsapp group") {
                  url = "Whatsapp";
                } else if (url === "Messages") {
                  url = "Message";
                } else if (url === "Googlemaps") {
                  url = "Google_maps";
                } else if (url === "Googlereview") {
                  url = "Google_review";
                } else if (url === "Youtubemusic") {
                  url = "Youtube_music";
                } else if (url === "Viemo") {
                  url = "Vimeo";
                } else if (url === "Phone") {
                  link = `tel:${value.URL}`;
                } else if (url === "Whatsapp") {
                  link = `https://wa.me/${value.URL}`;
                } else if (url === "Gmail") {
                  link = `mailto:${value.URL}`;
                }

                if (mode === "riorpad" || mode === "buwayne") {
                  return (
                    <a
                      key={id}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NeumorphicContainer
                        containerclassName="mt-4 round-10 d-flex"
                        subcontainerclasses="card border-none mt-0 round-10 w-100"
                        isLayer={false}
                      >
                        <NeumorphicContainer
                          containerclassName="p-2px card_icon round-10"
                          subcontainerclasses="round-10 d-flex p-2 icon"
                          isLayer={false}
                        >
                          {/* <FontAwesomeIcon icon={faInstagram} /> */}
                          <img
                            className="img-fluid"
                            src={`/social_icon/${url.toLowerCase()}.svg`}
                            alt=""
                          />
                        </NeumorphicContainer>

                        <p>{value.Title ? value.Title : value.Name}</p>
                      </NeumorphicContainer>
                    </a>
                  );
                }
                if (mode === "dahwoo" || mode === "etyne") {
                  return (
                    <a
                      key={id}
                      href={link}
                      className={mode === "dahwoo" ? "theme_dahwoo-card" : ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="img-fluid"
                        src={`/social_icon/${url.toLowerCase()}.svg`}
                        alt=""
                      />
                    </a>
                  );
                }

                return (
                  <a
                    className="card"
                    key={id}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="card_icon bg-bannner">
                      <img
                        className="img-fluid"
                        src={`/social_icon/${url.toLowerCase()}.svg`}
                        alt=""
                      />
                    </div>

                    <p>{value.Title ? value.Title : value.Name}</p>
                  </a>
                );
              })
            : ""}
        </div>

        {heroData ? (
          <div className="hero">
            <div className="hero-detail">
              <pre id="hero__para">
                <TextLoader
                  text={heroData}
                  id="hero__para"
                  characterNumber="200"
                  btnClass="hero__btn"
                />
              </pre>
            </div>
          </div>
        ) : (
          ""
        )}
        {CustomLinks
          ? CustomLinks.map((value, id) => {
              if (!value.isActive) {
                return "";
              }
              if (mode === "riorpad" || mode === "buwayne") {
                return (
                  <a
                    key={id}
                    href={value.URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NeumorphicContainer
                      containerclassName="mt-4 round-10 d-flex"
                      subcontainerclasses={`border-none mt-0 round-10 w-100 ${
                        value.IconUrl === null
                          ? "customLinkCard"
                          : "card cardItem"
                      } `}
                      isLayer={false}
                    >
                      {!(value.IconUrl === null) ? (
                        <NeumorphicContainer
                          containerclassName="p-2px card_icon round-10"
                          subcontainerclasses="round-10 d-flex p-2 icon"
                          isLayer={false}
                        >
                          <img
                            className="img-fluid"
                            src={value.IconUrl}
                            alt=""
                          />
                        </NeumorphicContainer>
                      ) : (
                        ""
                      )}
                      <p>{value.Title ? value.Title : value.Name}</p>
                    </NeumorphicContainer>
                  </a>
                );
              }
              if (mode === "dahwoo" && !(value.IconUrl === null)) {
                return (
                  <div className="mt-4">
                    <a
                      key={id}
                      href={value.URL}
                      className="customCard_dahwoo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img className="img-fluid" src={value.IconUrl} alt="" />
                      <div className="customCard_dahwoo-bottom">
                        <p>{value.Title ? value.Title : value.Name}</p>
                        <FontAwesomeIcon icon={faLink} />
                      </div>
                    </a>
                  </div>
                );
              }
              return (
                <a
                  key={id}
                  href={value.URL}
                  className={
                    mode === "etyne" && value.IconUrl === null
                      ? "customLinkCard card"
                      : "card"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {!(value.IconUrl === null) ? (
                    <div className="card_icon bg-bannner">
                      <img className="img-fluid" src={value.IconUrl} alt="" />
                    </div>
                  ) : (
                    ""
                  )}
                  <p>{value.Title ? value.Title : value.Name}</p>
                </a>
              );
            })
          : ""}
      </div>
    </>
  );
}
