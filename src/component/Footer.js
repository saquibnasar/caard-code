import React from "react";

export default function Footer({ theme, mode }) {
  return (
    <>
      <footer className="footer text-center">
        <div className="contaier">
          {/* 
          {mode === "blue" ? (
            <div className="d-flex justify-content-center">
              <a
                href="https://caard.club"
                className="caardClub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="img-fluid" src="/logo-black.svg" alt="" />
                <p>CREATE YOUR MICROSITE</p>
              </a>
            </div>
          ) : (
            <>
              <img
                className="img-fluid logo"
                src={theme === "dark" ? "/logo-white.svg" : "/logo-black.svg"}
                alt=""
              />
              <h4>© 2022 Powered by Caard Club, All rights reserved.</h4>
              <a
                href="https://caard.club"
                className="caardClub"
                target="_blank"
                rel="noopener noreferrer"
              >
                CREATE YOUR MICROSITE
                <img
                  className="img-fluid"
                  src={
                    theme === "dark" ? "/arrow-white.svg" : "/arrow-black.svg"
                  }
                  alt=""
                />
              </a>
            </>
          )} */}

          <a
            href="https://caard.club"
            className="caardClub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4>powered by</h4>
            <h3>Flaxhub</h3>
            <img className="img-fluid" src="/Vector.svg" alt="" />
          </a>
        </div>
      </footer>
    </>
  );
}
