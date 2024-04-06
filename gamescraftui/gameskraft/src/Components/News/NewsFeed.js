import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import jsonData from './dummynews.json'; // Import the JSON file

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(jsonData); // Set articles from the JSON data
  }, []);

  return (
    <div className="news-feed">
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </div>
  );
}

export default NewsFeed;