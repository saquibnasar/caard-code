import React from "react";

export default function TextLoader({ text, id, wordNumber, btnClass }) {
  let bioText = text.trim().split(" ");

  let primaryText = [];
  let subText = [];

  bioText.map((value) => {
    if (primaryText.length > wordNumber) {
      subText.push(value.trim());
    } else {
      primaryText.push(value.trim());
    }
    return value;
  });

  let mainText = primaryText.join(" ");

  const showHeroDetail = () => {
    let heroDetail = document.getElementById(id);
    heroDetail.textContent = primaryText.join(" ") + " " + subText.join(" ");
  };

  return (
    <>
      {mainText}
      {subText.length ? (
        <button className={`extra-btn ${btnClass}`} onClick={showHeroDetail}>
          ...more
        </button>
      ) : (
        ""
      )}
    </>
  );
}
