import React, { useState, useEffect } from "react";
import "../styles/illustration.css";

const illustration = () => {
  return (
    <div className="main-body-wrapper">
      <div className="main-illustration">
        <div className="circle-container">
          <div className="big-circle">
            <img className="people-image" src="./images/people.png" alt="" />
            <img className="man-image" src="./images/man.png" alt="" />
            <img
              className="text-bubble"
              id="text-bubble-1"
              src="./images/chat-bubble.png"
              alt="Text bubble"
            />
            <img
              className="text-bubble"
              id="text-bubble-2"
              src="./images/chat-bubble-2.png"
              alt="Text bubble"
            />
          </div>
          <div className="small-circle" id="circle1"></div>
          <div className="small-circle" id="circle2"></div>
          <div className="small-circle" id="circle3"></div>
        </div>
        <div className="svg-wrapper">
          <div className="custom-shape-divider-bottom-1679047371">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
            <div className="tree-container">
              <div className="blue-trees">
                <img
                  className="tree-2"
                  id="tree2"
                  src="./images/blue-tree.png"
                  alt=""
                />
                <img
                  className="tree"
                  id="tree"
                  src="./images/blue-tree.png"
                  alt=""
                />
                <img
                  className="tree-3"
                  id="tree3"
                  src="./images/yellow-tree.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="custom-shape-divider-top-1679048525">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default illustration;
