import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ChatBot from "./components/ChatBot.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import ServiceForm from "./pages/ServiceForm.jsx";
import BookNow from "./pages/BookNow.jsx";
import Ourwork from "./pages/OurWork.jsx";
import FAQ from "./pages/FAQ.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";



function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const isAdminAuth = localStorage.getItem("adminAuth") === "true";

  return (
    <div className="min-h-screen bg-white transition-opacity duration-1000 opacity-100">
      {/* 🌍 Navbar only for public pages */}
      {!isDashboardRoute && <Navbar />}

      <ScrollToTop />

      <main className="page-transition">
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ourwork" element={<Ourwork />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-form" element={<ServiceForm />} />
          <Route path="/book/:service?" element={<BookNow />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

        </Routes>
      </main>

      {!isDashboardRoute && <ChatBot />}
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
