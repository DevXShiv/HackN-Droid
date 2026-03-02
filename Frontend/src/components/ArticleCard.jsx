import React from 'react';
import './ArticleCard.css'; // Create this CSS file for styling

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
