import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TextLoader from "../TextLoader";
import { CSSTransition } from "react-transition-group";
import NeumorphicContainer from "../NeumorphicContainer";
export default function CardLinks({ title, linkHandler, mode }) {
  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={600}
        classNames={"card_link"}
      >
        {mode === "riorpad" || mode === "buwayne" ? (
          <div className="content_operator">
            <button
              className="w-100 cursor_pointer mt-4 border-none"
              onClick={linkHandler}
            >
              <NeumorphicContainer
                containerclassName="round-10 d-flex"
                subcontainerclasses="card border-none mt-0 round-10 w-100"
              >
                <p>
                  <TextLoader
                    text={title}
                    id="youtube__para"
                    characterNumber="50"
                  />
                </p>
                <NeumorphicContainer
                  containerclassName="round-10 d-flex svgIcon"
                  subcontainerclasses="content_operator-icon round-10"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </NeumorphicContainer>
              </NeumorphicContainer>
            </button>
          </div>
        ) : (
          <div className="">
            <button
              className="card w-100 cursor_pointer card_link"
              onClick={linkHandler}
            >
              <p>
                <TextLoader
                  text={title}
                  id="youtube__para"
                  characterNumber="50"
                />
              </p>
              <div className="svgIcon">
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </button>
          </div>
        )}
      </CSSTransition>
    </>
  );
}
