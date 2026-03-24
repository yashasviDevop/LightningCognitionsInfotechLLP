import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/lightningcognitions" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/admin.lightning.infotech" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* LOGO SECTION */}
          <div className="space-y-6">
  <img
    src="/logo_white-llp.png" // ✅ replace this path with your logo file (e.g. in public/logo.png)
    alt="Lightning Cognitions Logo"
    className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
  />
            <p className="text-gray-400 leading-relaxed">
              Empowering businesses through innovative technology solutions and digital transformation.
            </p>
          </div>

          {/* QUICK LINKS SECTION */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/contact", label: "Contact Us" },
                {to: "/ourwork", label: "Our Work" },
                {to: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-left capitalize"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* SOCIAL MEDIA SECTION */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold tracking-wide">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-blue-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} Lightning Cognitions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
           
               <Link
    to="/privacy-policy"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    Privacy Policy
  </Link>
              <Link
    to="/terms"
    className="hover:text-blue-400 transition-colors duration-300"
  >
    Terms of Service
  </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
