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
        <section className="loading-section d-flex" id="loader">
          <img width="40" height="60" alt="loading" src={logo} />
          <div className="loading"></div>
        </section>
      )}
    </>
  );
}
