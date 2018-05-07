import React from 'react';

const Card = props => (
  <div className="card my-2">
    <div className="card-image">
      <img
        src={`${props.card.urlToImage}`}
        className="img-responsive"
        alt={`${props.card.description}`}
      />
    </div>
    <div className="card-header">
      <div className="card-title h5">
        <a href={`${props.card.url}`}>{props.card.title}</a>
      </div>
      <div className="card-subtitle text-gray">{props.card.author}</div>
    </div>
    <div className="card-body">
      <h6>{props.card.description}</h6>
    </div>
  </div>
);

export default Card;
