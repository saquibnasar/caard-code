import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import MetaDecorator from "./component/MetaDecorator";
import HomeMode from "./component/HomeMode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <iframe
                  className="flax"
                  title="flax"
                  src="http://flax-ai-static-website.s3-website.ap-south-1.amazonaws.com/"
                ></iframe>
              </>
            }
          />
          <Route path="/:linkType/:userId" element={<Home />} />
          <Route path="/:userMode" element={<HomeMode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
