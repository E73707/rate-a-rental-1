// CardRow.js
import React from "react";

function CardRow(props) {
  return (
    <div className="card-row">
      {props.cards.map((card, index) => (
        <a
          key={index}
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          <div
            className="card"
            style={{
              backgroundImage: `url(${card.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CardRow;
