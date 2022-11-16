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
  let mainText;
  let subText;
  if (data.Title) {
    let bioText = data.Title.trim().split(" ");

    let primaryText = [];
    subText = [];

    bioText.map((value) => {
      if (primaryText.length > 16) {
        subText.push(value.trim());
      } else {
        primaryText.push(value.trim());
      }
      return value;
    });

    mainText = primaryText.join(" ");

    const youtubeBtn = document.querySelector(".youtube .extra-btn");
    const swipeContent = document.querySelector(".youtube .swiper-content h4");

    const showText = () => {
      youtubeBtn.classList.add("d-none");
      swipeContent.textContent =
        primaryText.join(" ") + " " + subText.join(" ");
    };

    if (!(youtubeBtn === null) && youtubeBtn) {
      youtubeBtn.addEventListener("click", showText);
    }
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
          <h4 className="w-100">
            {mainText ? mainText : "Please add title"}
            {subText.length ? (
              <button className="extra-btn">...more</button>
            ) : (
              ""
            )}
          </h4>
        </div>
      </div>
    </>
  );
}
