import React, { useState, useRef } from "react";
import "../styles/Home.css";
import Illustration from "./illustration";
import { GET_PROPERTY } from "../utils/queries";
import { ADD_PROPERTY } from "../utils/mutations";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import SearchResult from "./SearchResult";

import {
  GoogleMap,
  StandaloneSearchBox,
  LoadScript,
} from "@react-google-maps/api";

export default function Home({ handleTabChange }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [searchBox, setSearchBox] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [isSearchSelected, setIsSearchSelected] = useState(false);

  const handleSearchFocus = () => {
    setIsSearchSelected(true);
  };

  const handleSearchBlur = (event) => {
    setIsSearchSelected(false);
    event.target.value = "";
  };

  const handlePlacesChanged = () => {
    const address = searchBox
      .getPlaces()[0]
      .address_components.map((item) => item.long_name)
      .join(", ");
    setSearchResult(address);
    handleTabChange("SearchResult", address);
  };

  return (
    <main>
      <div className="wrapper">
        <div className="search-container">
          <div className="container">
            <LoadScript
              id="script-loader"
              googleMapsApiKey={apiKey}
              libraries={["places"]}
            >
              <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={handlePlacesChanged}
              >
                <input
                  type="text"
                  className="input"
                  placeholder="search"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </StandaloneSearchBox>
            </LoadScript>
            <div className={`close-btn${isSearchSelected ? " active" : ""}`}>
              &times;
            </div>
          </div>
        </div>
        <Illustration />
      </div>
    </main>
  );
}
