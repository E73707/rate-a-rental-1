import React, { useState, useEffect } from "react";
import "../styles/navTabs.css";

function NavTabs({ currentTab, handleTabChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth > 1120) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="page-header">
      <div className="header-content">
        {window.innerWidth < 1120 && (
          <div
            className={`burger-icon ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <a className="name">
          <img className="logo-image" src="/images/rrr.png"></img>
          Rate a Rental
        </a>

        <div className={`nav-menu ${isMenuOpen ? "open expanded" : ""}`}>
          <div className="nav-item">
            <a
              href="#home"
              onClick={() => handleTabChange("Home")}
              className={currentTab === "Home" ? "nav-link active" : "nav-link"}
            >
              Home
            </a>
          </div>
          <div className="nav-item">
            <a
              href="#Contact"
              onClick={() => handleTabChange("Contact")}
              className={
                currentTab === "Contact" ? "nav-link active" : "nav-link"
              }
            >
              Contact Me
            </a>
          </div>
          <div className="nav-item">
            <a
              href="#portfolio"
              onClick={() => handleTabChange("Portfolio")}
              className={
                currentTab === "Portfolio" ? "nav-link active" : "nav-link"
              }
            >
              Portfolio
            </a>
          </div>
          <div className="nav-item">
            <a
              href="#resume"
              onClick={() => handleTabChange("Resume")}
              className={
                currentTab === "Resume" ? "nav-link active" : "nav-link"
              }
            >
              Resume
            </a>
          </div>
        </div>
        <div className="user-header">
          <a className="login-link">Login</a>
          <a className="signup-link">Sign Up</a>
        </div>
      </div>
    </header>
  );
}

export default NavTabs;
