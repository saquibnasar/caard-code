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
              let link = `https://${value.URL}`;
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

              return (
                <a
                  key={id}
                  href={link}
                  className="card"
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

        {CustomLinks
          ? CustomLinks.map((value, id) => {
              if (!value.isActive) {
                return "";
              }
              return (
                <a key={id} href={value.URL} className="card" target="_blank">
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
