/* eslint-disable react/prop-types */
import { navLinks } from "../constants/index.jsx"; // Ensure this is .js, not .jsx
import { useState } from "react";

const NavItems = ({ isMobile, toggleMenu }) => {
  return (
    <ul 
      className={`flex flex-col md:flex-row md:mr-[300px] text-xl font-semibold gap-4 md:gap-[200px] justify-between ${
        isMobile ? "mt-8" : ""
      }`}
    >
      {navLinks.map(({ id, href, name, icon }) => (
        <li
          key={id}
          className="relative text-center flex items-center space-x-2 hover:text-white transition-all duration-300 ease-in-out group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <a 
            href={href} 
            className="hover:underline group-hover:text-yellow-400" 
            onClick={isMobile ? toggleMenu : undefined} // Close menu on link click (for mobile)
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="absolute left-0 right-0 z-40 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
        <nav className="flex items-center justify-between p-4 text-white">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/">
              <img 
                src="/logo.png" 
                alt="Time Capsule Logo" 
                className="w-[200px] h-auto" 
              />
            </a>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-3xl focus:outline-none hover:text-yellow-400 transition-colors duration-300"
            >
              {isMenuOpen ? "✕" : "☰"} {/* X or hamburger icon */}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex">
            <NavItems />
          </div>
        </nav>

        {/* Mobile Navigation Links */}
        <div 
          className={`md:hidden bg-blue-700 text-white px-4 pb-4 fixed top-0 right-0 h-full w-3/4 transform transition-transform duration-500 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Close Button inside the sliding menu */}
          <button 
            onClick={toggleMenu} 
            className="absolute top-4 right-4 text-3xl focus:outline-none hover:text-yellow-400 transition-colors duration-300"
          >
            ✕
          </button>
          <div className="mt-[100px]">

          <NavItems isMobile={true} toggleMenu={toggleMenu} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
