import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./pages/Protected";

const Layout = React.lazy(() => import("./pages/Layout"));
const FlightListComponent = React.lazy(() => import("./pages/FlightList"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/Signup"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/flights" element={<FlightListComponent />} />
        </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;