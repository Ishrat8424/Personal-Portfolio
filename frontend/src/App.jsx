import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Loader from "./components/Loader";
import ScrollTop from "./components/ScrollTop";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/Dashboard/Dashboard";
import Portfolio from "./pages/Dashboard/Portfolio";
import Projects from "./pages/Dashboard/Projects";
import Experience from "./pages/Dashboard/Experience";
import Contacts from "./pages/Dashboard/Contacts";
import DashboardHome from "./pages/Dashboard/Home";
import Skills from "./pages/Dashboard/Skills";

function App() {
  const [loading, setLoading] = useState(true);

//  Loader (Enable if needed)
  
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 8000);

  return () => clearTimeout(timer);
}, []);
  

useEffect(() => {
  AOS.init({
    duration: 8000,
    easing: "ease-in-out",
    once: false,
    offset: 0,
    disable: "mobile",
  });
}, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ScrollTop />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;