import React from "react";
export default function Card({ data }) {
  return (
    <>
      <div className="cardItem">
        {data.map((value, id) => {
          if (!value.isActive) {
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
        })}
      </div>
    </>
  );
}
