import React from 'react';
import './NewsItem.css'; // Import your CSS for styling

function NewsItem({ article }) {
  const { title, image, description, url } = article;

  return (
    <div className="news-item">
      <a href={url} target="_blank" rel="noreferrer">
        <img src={image} alt={title} />
      </a>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default NewsItem;
