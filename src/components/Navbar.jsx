import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    {path: "/ourwork", label: "Our Work" },
    { path: "/contact", label: "Contact Us" },
  ];

  const isHomePage = location.pathname === "/";
  const shouldBeTransparent = isHomePage && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldBeTransparent
          ? "bg-transparent py-6"
          : "bg-white/90 backdrop-blur-xl shadow-lg py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
  <img
    src="/logo_lightning.png" // ✅ replace this path with your logo file (e.g. in public/logo.png)
    alt="Lightning Cognitions Logo"
    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />
</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : shouldBeTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1.5 group"
          >
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                shouldBeTransparent ? "bg-white" : "bg-gray-900"
              } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                shouldBeTransparent ? "bg-white" : "bg-gray-900"
              } ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                shouldBeTransparent ? "bg-white" : "bg-gray-900"
              } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 py-6 space-y-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl animate-slide-down">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left px-6 py-3 text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50 rounded-xl"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
  