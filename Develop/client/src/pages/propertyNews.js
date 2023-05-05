import React from "react";
import "../styles/propertyNews.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Navigation]);

export default function PropertyNews() {
  const apikey = process.env.REACT_APP_PROPERTY_NEWS_API_KEY;
  const apiUrl = `https://newsdata.io/api/1/news?apikey=${apikey}&q=Real%20estate%2C%20property&country=au`;

  const [newsData, setNewsData] = useState([]);

  const [slidesPerView, setSlidesPerView] = useState(3);

  // Update slidesPerView based on screen width
  const updateSlidesPerView = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setSlidesPerView(5);
    } else if (screenWidth >= 768) {
      setSlidesPerView(5);
    } else if (screenWidth >= 500) {
      setSlidesPerView(3.5);
    } else {
      setSlidesPerView(2.2);
    }
  };

  const placeholderImg = "/images/placeholder.png";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const jsonResponse = await response.json();
      const { results } = jsonResponse;

      // Store data and timestamp in localStorage
      localStorage.setItem("propertyNewsData", JSON.stringify(results));
      localStorage.setItem("propertyNewsFetchTimestamp", Date.now());

      setNewsData(results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateSlidesPerView();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateSlidesPerView);
    return () => {
      window.removeEventListener("resize", updateSlidesPerView);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("propertyNewsData");
    const storedTimestamp = localStorage.getItem("propertyNewsFetchTimestamp");

    if (storedData && storedTimestamp) {
      const timeDifference = Date.now() - storedTimestamp;
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      if (hoursDifference > 24) {
        // Fetch new data if older than 24 hours
        fetchData();
      } else {
        // Use stored data
        setNewsData(JSON.parse(storedData));
      }
    } else {
      // Fetch new data if not present in localStorage
      fetchData();
    }
  }, []);

  return (
    <div className="property-news-wrapper">
      <div className="news-wrapper">
        <Swiper
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {newsData.map((news) => {
            return (
              <SwiperSlide>
                <a
                  className="news-card-link"
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="news-card">
                    <div className="news-card-img-wrapper">
                      <img
                        src={news.image_url ? news.image_url : placeholderImg}
                        alt="News"
                      />
                    </div>

                    <div className="news-card-title-wrapper">
                      <p>{news.title}</p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
