import React, { useState, useRef } from "react";
import "../styles/Home.css";
import Illustration from "./illustration";
import { GET_PROPERTY } from "../utils/queries";
import { ADD_PROPERTY } from "../utils/mutations";
import PropertyNews from "./propertyNews";
import { Autocomplete } from "@react-google-maps/api";
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
  const newsApiKey = process.env.REACT_APP_PROPERTY_NEWS_API_KEY;
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

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    const address = place.address_components
      .map((item) => item.long_name)
      .join(", ");
    setSearchResult(address);
    handleTabChange("SearchResult", address);
  };

  const autoCompleteRef = useRef();

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
              <Autocomplete
                onLoad={(ref) => (autoCompleteRef.current = ref)}
                onPlaceChanged={handlePlaceChanged}
                options={{
                  componentRestrictions: {
                    country: "AU",
                  },
                  types: ["address"],
                }}
              >
                <input
                  type="text"
                  className="input"
                  placeholder="search"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </Autocomplete>
            </LoadScript>
            <div className={`close-btn${isSearchSelected ? " active" : ""}`}>
              &times;
            </div>
          </div>
        </div>
        <Illustration />
      </div>
      <div className="property-news-container">
        <PropertyNews />
      </div>
    </main>
  );
}
