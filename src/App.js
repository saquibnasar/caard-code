import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:linkType/:userId" element={<Home />} />
        {/* <Route path="/direct/:userId" element={<Home />} />
        <Route path="/business/:userId" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
