import React from "react";
import logo from "../assets/images/logo.svg";
import { CSSTransition } from "react-transition-group";
export default function Loader({ mode, className }) {
  return (
    <>
      {mode === "home" ? (
        <section className={`loading-section d-flex ${className}`} id="loader">
          <CSSTransition
            in={true}
            appear={true}
            timeout={2000}
            classNames={"slide_Fade"}
          >
            <div>
              <img width="40" height="60" alt="loading" src={logo} />
              <div className="loading"></div>
            </div>
          </CSSTransition>
        </section>
      ) : (
        <>
          {mode === "document" ? (
            <section
              className="loading-section d-flex"
              id="loader"
              style={{
                position: "absolute",
                left: "0px",
                top: "0",
                zIndex: 7,
                height: "300px",
              }}
            >
              <div className="loading"></div>
            </section>
          ) : (
            <section className="loading-section d-flex" id="loader">
              <img width="40" height="60" alt="loading" src={logo} />
              <div className="loading"></div>
            </section>
          )}
        </>
      )}
    </>
  );
}
