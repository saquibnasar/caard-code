import React from "react";

export default function Footer({ theme }) {
  return (
    <>
      <footer className="footer text-center">
        <div className="contaier">
          <img
            className="img-fluid"
            src={theme === "dark" ? "/logo-white.png" : "/logo-black.png"}
            alt=""
          />
          <h4>CREATE YOUR MICROSITE</h4>
        </div>
      </footer>
    </>
  );
}
