import React, { useState } from "react";
import "../styles/Home.css";
import Illustration from "./illustration";

export default function Home() {
  const [isSearchSelected, setIsSearchSelected] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchSelected(true);
  };

  const handleSearchBlur = (event) => {
    setIsSearchSelected(false);
    event.target.value = "";
  };

  return (
    <main>
      <div className="wrapper">
        <div className="container">
          <input
            type="text"
            className="input"
            placeholder="search"
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          ></input>
          <div className={`close-btn${isSearchSelected ? " active" : ""}`}>
            &times;
          </div>
          <Illustration />
        </div>
      </div>
    </main>
  );
}
