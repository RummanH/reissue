import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const Layout = React.lazy(() => import("./pages/Layout"));
const FlightList = React.lazy(() => import("./pages/FlightList"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/flights" element={<FlightList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
