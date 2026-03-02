import useSearch from "../features/search/useSearch";
import SearchBar from "../features/search/SearchBar";
import IntelligencePanel from "../features/intelligence/IntelligencePanel";
import ArticlePanel from "../features/articles/ArticlePanel";

export default function Dashboard() {
  const { data, loading, error, runSearch } = useSearch();

  return (
    <div className="app-container">
      <h1 className="page-title">Narrative Intelligence Dashboard</h1>

      <SearchBar onSearch={runSearch} />

      {data && (
        <div className="dashboard-grid">
          <div className="panel left-panel">
            <IntelligencePanel clusters={data.clusters} />
          </div>

          <div className="panel right-panel">
            <ArticlePanel clusters={data.clusters} />
          </div>
        </div>
      )}
    </div>
  );
}