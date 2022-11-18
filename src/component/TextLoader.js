import React from "react";
import { useState } from "react";

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

  const [changeText, setChangeText] = useState(primaryText.join(" "));

  const showHeroDetail = () => {
    setChangeText(changeText + subText.join(" "));
    const extraBtn = document.querySelector(`#${id} .extra-btn`);
    extraBtn.classList.add("d-none");
  };

  return (
    <>
      {changeText}
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
