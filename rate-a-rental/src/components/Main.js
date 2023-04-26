import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolios";
import Resume from "./pages/Resume";
import AboutMe from "./pages/Contact";

export default function Main() {
  const [currentTab, setCurrentTab] = useState("Home");

  const render = () => {
    if (currentTab === "Home") {
      return <Home />;
    }
    if (currentTab === "Contact") {
      return <AboutMe />;
    }
    if (currentTab === "Portfolio") {
      return <Portfolio />;
    }
    return <Resume />;
  };

  const handleTabChange = (page) => setCurrentTab(page);

  return (
    <div>
      <NavTabs currentTab={currentTab} handleTabChange={handleTabChange} />
      {render()}
    </div>
  );
}
