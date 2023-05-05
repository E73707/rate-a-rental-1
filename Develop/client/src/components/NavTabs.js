import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import "../styles/navTabs.css";
import Auth from "../utils/auth";
import { GET_CURRENT_ADMIN } from "../utils/queries";

function NavTabs({ currentTab, handleTabChange }) {
  const [currentAdmin, setCurrentAdmin] = useState({});
  const {
    loading: adminLoading,
    error: adminError,
    data: adminData,
  } = useQuery(GET_CURRENT_ADMIN);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDocumentClick = (event) => {
    const navMenu = event.target.closest(".nav-menu");
    if (
      (!event.target.closest(".burger-icon") &&
        !event.target.closest(".nav-menu")) ||
      (navMenu && navMenu.classList.contains("expanded"))
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (adminData) {
      setCurrentAdmin(adminData.getCurrentAdmin);
    }
    if (!adminData) {
      console.log("No admin data");
    }
    console.log(adminData);
  }, [adminData]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <header className={`page-header ${isScrolled ? "scrolled" : ""}`}>
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

        <div
          className={`nav-menu ${
            isMenuOpen
              ? isScrolled
                ? "open expanded scrolled"
                : "open expanded"
              : ""
          }`}
        >
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
          {adminData ? (
            <div className="nav-item">
              <a
                href="#Todo"
                onClick={() => handleTabChange("Todo")}
                className={
                  currentTab === "Todo" ? "nav-link active" : "nav-link"
                }
              >
                Todo List
              </a>
            </div>
          ) : (
            ""
          )}
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
