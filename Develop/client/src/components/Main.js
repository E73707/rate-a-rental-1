import React, { useCallback, useState } from "react";
import NavTabs from "./NavTabs";
import Home from "../pages/Home";
import Portfolio from "../pages/Portfolios";
import Todo from "../pages/Todo";
import AboutMe from "../pages/Contact";
import SignupForm from "../pages/SignUpForm";
import LoginForm from "../pages/LoginForm";
import SearchResult from "../pages/SearchResult";
import ClaimPropertyTab from "../pages/ClaimPropertyTab";

export default function Main() {
  const [currentTab, setCurrentTab] = useState("Home");
  const [propertyData, setPropertyData] = useState("");
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
      return (
        <SearchResult
          handleTabChange={handleTabChange}
          address={searchAddress}
        />
      );
    }
    if (currentTab === "ClaimPropertyTab") {
      return <ClaimPropertyTab propertyData={propertyData} />;
    }
    if (currentTab === "Todo") return <Todo />;
  };

  const handleTabChange = useCallback((page, address, propData) => {
    setCurrentTab(page);
    if (address) {
      setSearchAddress(address);
    }
    if (propData) {
      setPropertyData(propData);
    }
  }, []);

  return (
    <div>
      <NavTabs currentTab={currentTab} handleTabChange={handleTabChange} />
      {render()}
    </div>
  );
}
