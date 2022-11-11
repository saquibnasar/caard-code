import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import SvgLayerExample from "./component/SvgLayerExample";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:userId" element={<Home />} />
        <Route path="/saquib/test" element={<SvgLayerExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
