import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Home from "../pages/Home";
import Portfolio from "../pages/Portfolios";
import Resume from "../pages/Resume";
import AboutMe from "../pages/Contact";
import SignupForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import SearchResult from "../pages/SearchResult";

export default function Main() {
  const [currentTab, setCurrentTab] = useState("Home");

  const [searchAddress, setSearchAddress] = useState("");

  const render = () => {
    if (currentTab === "Home") {
      return <Home handleTabChange={handleTabChange} />;
    }
    if (currentTab === "Contact") {
      return <AboutMe />;
    }
    if (currentTab === "Portfolio") {
      return <Portfolio />;
    }
    if (currentTab === "SignUp") {
      return <SignupForm />;
    }
    if (currentTab === "SignIn") {
      return <LoginForm />;
    }
    if (currentTab === "SearchResult") {
      return <SearchResult address={searchAddress} />;
    }
    if (currentTab === "") return <Resume />;
  };

  const handleTabChange = (page, address) => {
    setCurrentTab(page);
    if (address) {
      setSearchAddress(address);
    }
  };

  return (
    <div>
      <NavTabs currentTab={currentTab} handleTabChange={handleTabChange} />
      {render()}
    </div>
  );
}
