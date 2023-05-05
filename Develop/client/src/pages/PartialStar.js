import React from "react";

const PartialStar = ({ index, fillPercentage, width }) => {
  return (
    <svg
      width={width ? width : 20}
      height={width ? width : 20}
      viewBox="0 0 50 50"
      fill="none"
      stroke="#708090"
      strokeWidth="3"
    >
      <defs>
        <clipPath id={`star-mask-${index}`}>
          <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
        </clipPath>
      </defs>
      <path
        d="M25,1 L31.3,15.8 L47,18.2 L35,29.5 L37.5,45 L25,36.5 L12.5,45 L15,29.5 L3,18.2 L18.7,15.8 L25,1"
        clipPath={`url(#star-mask-${index})`}
        fill="#708090"
      />
      <path
        d="M25,1 L31.3,15.8 L47,18.2 L35,29.5 L37.5,45 L25,36.5 L12.5,45 L15,29.5 L3,18.2 L18.7,15.8 L25,1"
        fill="none"
      />
    </svg>
  );
};

export default PartialStar;
