import React, { useEffect } from "react";
import { useState } from "react";

export default function TextLoader({ text, characterNumber, btnClass }) {
  let bioText = text.trim().split(" ");
  let primaryText = [];
  let subText = [];

  bioText.map((value) => {
    if (primaryText.join(" ").split("").length > characterNumber) {
      subText.push(value.trim());
    } else {
      primaryText.push(value.trim());
    }
    return value;
  });
  const [changeText, setChangeText] = useState(primaryText.join(" "));

  useEffect(() => {
    setChangeText(primaryText.join(" "));
  }, [text]);

  const showHeroDetail = (event) => {
    setChangeText(text);
    event.target.classList.add("d-none");
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
