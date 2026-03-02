import React, { useState } from 'react';
import { fetchArticles } from '../services/api';
import SearchBox from '../components/SearchBox';
import ArticleCard from '../components/ArticleCard';  // Create this component

const Dashboard = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const articles = await fetchArticles(query);
    setResults(articles);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <SearchBox onSearch={handleSearch} />
      <div className="articles-container">
        {results.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          results.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
