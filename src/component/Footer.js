import React from "react";

export default function Footer({ theme }) {
  return (
    <>
      <footer className="footer text-center">
        <div className="contaier">
          <img
            className="img-fluid"
            src={theme === "dark" ? "/logo-white.svg" : "/logo-black.svg"}
            alt=""
          />
          <h4>© 2022 Powered by Caard Club, All rights reserved.</h4>
          <h4>CREATE YOUR MICROSITE</h4>
        </div>
      </footer>
    </>
  );
}
