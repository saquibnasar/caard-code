import React from "react";

export default function Footer(props) {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <>
      <footer
        className={
          props.mode === "direct"
            ? "footer text-center footer_bottom"
            : "footer text-center"
        }
      >
        <div className="contaier">
          <div className="">
            <a
              href="https://flax.ai/"
              className="caardClub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="img-fluid" src="/logo.svg" alt="" />
              <p>Made with Flax.ai</p>
            </a>
            <p className="mt-2 text-center">
              Copyright © {year} {props.userName}, All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
