import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function HomeMode() {
  const { userMode } = useParams();

  useEffect(() => {
    fetch(
      `https://7drkndiu7g.execute-api.ap-south-1.amazonaws.com/v1/previewprofile/${userMode}`
    )
      .then((res) => res)
      .then((res) => res.json())
      .then((data) => {
        if (data.Mode === "Direct") {
          window.location.replace(
            window.location.origin + `/direct/${userMode}`
          );
        } else if (data.Mode === "Personal") {
          window.location.replace(
            window.location.origin + `/personal/${userMode}`
          );
        } else if (data.Mode === "Business") {
          window.location.replace(
            window.location.origin + `/business/${userMode}`
          );
        }
      });
  }, []);
  return (
    <>
      <div className="main-container">
        <Loader />
      </div>
    </>
  );
}
