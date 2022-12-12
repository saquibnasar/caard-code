import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCropSimple } from "@fortawesome/free-solid-svg-icons";
import TextLoader from "../TextLoader";
import { CSSTransition } from "react-transition-group";
export default function CardLinks({ title, linkHandler }) {
  // const cardLink = document.querySelectorAll(".card_link");

  // if (cardLink) {
  //   if (cardLink.length) {
  //     console.log(cardLink[0]);
  //     cardLink.map((value, id) => {
  //       console.log(value.offsetHeight);
  //       return value;
  //     });
  //   }
  // }

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={600}
        classNames={"card_link"}
      >
        <div className="">
          <button
            className="card w-100 cursor_pointer card_link"
            onClick={linkHandler}
          >
            <p>
              <TextLoader text={title} id="youtube__para" wordNumber="16" />
            </p>
            <div className="svgIcon">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </button>
        </div>
      </CSSTransition>
    </>
  );
}
