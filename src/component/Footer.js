import React from "react";

export default function Footer({ theme }) {
  return (
    <>
      <footer className="footer text-center">
        <div className="contaier">
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
              src={theme === "dark" ? "/arrow-white.svg" : "/arrow-black.svg"}
              alt=""
            />
          </a>
        </div>
      </footer>
    </>
  );
}
