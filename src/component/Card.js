import React from "react";
export default function Card({ StandardLinks, CustomLinks }) {
  return (
    <>
      <div className="cardItem">
        {StandardLinks
          ? StandardLinks.map((value, id) => {
              if (!value.isActive) {
                return "";
              }
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
              }

              return (
                <a key={id} href="/" className="card">
                  <div className="card_icon bg-bannner">
                    <img
                      className="img-fluid"
                      src={`/social_icon/${url.toLowerCase()}.svg`}
                      alt=""
                    />
                  </div>
                  {value.Title ? value.Title : value.Name}
                </a>
              );
            })
          : ""}

        {CustomLinks
          ? CustomLinks.map((value, id) => {
              if (!value.isActive) {
                return "";
              }
              console.log(value.URL);
              return (
                <a key={id} href="/" className="card">
                  <div className="card_icon bg-bannner">
                    <img className="img-fluid" src={value.URL} alt="" />
                  </div>
                  {value.Title ? value.Title : value.Name}
                </a>
              );
            })
          : ""}
      </div>
    </>
  );
}
