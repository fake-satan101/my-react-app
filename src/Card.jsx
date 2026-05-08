import React from 'react';

function Card({ name, img, rating, genre, summary }) {
  return (
    <div className="card">
      <img src={img} alt={name} className="card-img" />
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-name">{name}</h3>
          <span className="card-rating">⭐ {rating}</span>
        </div>
        <div className="card-genres">
          {genre}
        </div>
        <p className="card-summary">{summary.substring(0, 100)}...</p>
      </div>
    </div>
  );
}

export default Card;