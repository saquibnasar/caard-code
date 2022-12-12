import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function CloseBtn({ linkHandler }) {
  return (
    <>
      <div className="d-flex justify-content-center">
        <button className="close_btn" onClick={linkHandler}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </>
  );
}
