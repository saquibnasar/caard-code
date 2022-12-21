import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NeumorphicContainer from "../NeumorphicContainer";
export default function CloseBtn({ linkHandler, mode }) {
  return (
    <>
      {mode ? (
        <div className="" onClick={linkHandler}>
          <NeumorphicContainer
            containerclassName="rounded-circle neumorphic-btn d-flex justify-content-center align-items-center"
            subcontainerclasses="d-flex justify-content-center align-items-center rounded-circle w-51px h-51px"
          >
            <button>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </NeumorphicContainer>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button className="close_btn" onClick={linkHandler}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
    </>
  );
}
