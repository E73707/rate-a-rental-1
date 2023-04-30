import React from "react";
import "../styles/star.css";

const Star = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return "#708090";
    } else if (!hoverRating && rating >= index) {
      return "#708090";
    }
    return "none";
  }, [rating, hoverRating, index]);

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 50 50"
      fill={fill}
      stroke="#708090"
      strokeWidth="3"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <path d="M25,1 L31.3,15.8 L47,18.2 L35,29.5 L37.5,45 L25,36.5 L12.5,45 L15,29.5 L3,18.2 L18.7,15.8 L25,1" />
    </svg>
  );
};

export default Star;
