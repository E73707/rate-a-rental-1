import React, { useState, useEffect } from "react";
import "../styles/navTabs.css";
import Auth from "../utils/auth";

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
          {Auth.loggedIn() ? (
            <a className="signout-link" onClick={() => Auth.logout()}>
              logout
            </a>
          ) : (
            <>
              <a
                className={
                  currentTab === "SignIn"
                    ? "login-link nav-link active"
                    : "login-link nav-link"
                }
                href="#signin"
                onClick={() => handleTabChange("SignIn")}
              >
                Login
              </a>
              <a
                className={
                  currentTab === "SignUp"
                    ? "signup-link nav-link active"
                    : "signup-link nav-link"
                }
                href="#signup"
                onClick={() => handleTabChange("SignUp")}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavTabs;
