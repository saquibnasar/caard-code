import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NeumorphicContainer from "../NeumorphicContainer";
export default function CloseBtn({ linkHandler, mode }) {
  return (
    <>
      {mode ? (
        <div className="cursor_pointer" onClick={linkHandler}>
          <NeumorphicContainer
            containerclassName="cursor_pointer rounded-circle neumorphic-btn d-flex justify-content-center align-items-center"
            subcontainerclasses="d-flex justify-content-center align-items-center rounded-circle w-51px h-51px"
          >
            <button className="cursor_pointer">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </NeumorphicContainer>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button className="close_btn cursor_pointer" onClick={linkHandler}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </>
  );
}
