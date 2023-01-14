import React from "react";
import logo from "../assets/images/logo.svg";
import { CSSTransition } from "react-transition-group";
export default function Loader({ mode, className, theme }) {
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
            <div className="hero_loading d-flex justify-content-center flex-direction-column">
              <img
                className="m-auto"
                // width="81"
                // height="78"
                alt="loading"
                src={logo}
              />
              <h2>Flax.ai</h2>
              <div className="loading"></div>
            </div>
          </CSSTransition>
        </section>
      ) : (
        <>
          {mode === "document" ? (
            <>
              {theme === "etyne" ? (
                <section
                  className="loading-section d-flex slider"
                  id="loader"
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0",
                    zIndex: 7,
                    height: "306px",
                  }}
                >
                  <div className="loading"></div>
                </section>
              ) : (
                <section
                  className="loading-section d-flex"
                  id="loader"
                  style={{
                    position: "absolute",
                    left: "0px",
                    top: "0",
                    zIndex: 7,
                    height: "306px",
                  }}
                >
                  <div className="loading"></div>
                </section>
              )}{" "}
            </>
          ) : (
            <section className="loading-section d-flex" id="loader">
              <div className="hero_loading d-flex justify-content-center flex-direction-column">
                <img
                  className="m-auto"
                  width="81"
                  height="78"
                  alt="loading"
                  src={logo}
                />
                <h2>Flax.ai</h2>
                <div className="loading"></div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
