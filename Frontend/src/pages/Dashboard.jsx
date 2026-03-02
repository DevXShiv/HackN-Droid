import useSearch from "../features/search/useSearch";
import SearchBar from "../features/search/SearchBar";
import IntelligencePanel from "../features/intelligence/IntelligencePanel";
import ArticlePanel from "../features/articles/ArticlePanel";

const SUGGESTED_TOPICS = [
  { label: "AI Regulation", icon: "🤖" },
  { label: "Climate Policy", icon: "🌍" },
  { label: "Tech Layoffs", icon: "📉" },
  { label: "Space Exploration", icon: "🚀" },
  { label: "Cybersecurity", icon: "🔒" },
  { label: "Global Elections", icon: "🗳️" },
];

export default function Dashboard() {
  const { data, loading, error, runSearch } = useSearch();

  return (
    <div className="app-container">
      <h1 className="page-title">Narrative Intelligence Dashboard</h1>

      <SearchBar onSearch={runSearch} />

      {/* Loading */}
      {loading && (
        <div className="dash-loading">
          <div className="dash-spinner"></div>
          <p>Analyzing narratives...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="dash-error">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {/* Results */}
      {data && !loading && (
        <div className="dashboard-grid">
          <div className="panel left-panel">
            <IntelligencePanel clusters={data.clusters} />
          </div>

          <div className="panel right-panel">
            <ArticlePanel clusters={data.clusters} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data && !loading && !error && (
        <div className="dash-empty">
          <div className="dash-empty-visual">
            <svg className="dash-empty-svg" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="55" stroke="url(#g1)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
              <circle cx="60" cy="60" r="38" stroke="url(#g1)" strokeWidth="1.5" opacity="0.2" />
              <circle cx="60" cy="60" r="8" fill="url(#g1)" opacity="0.8" />
              <circle cx="60" cy="15" r="4" fill="#667eea" />
              <circle cx="100" cy="45" r="4" fill="#a78bfa" />
              <circle cx="95" cy="90" r="4" fill="#ec4899" />
              <circle cx="25" cy="90" r="4" fill="#06b6d4" />
              <circle cx="20" cy="45" r="4" fill="#10b981" />
              <line x1="60" y1="15" x2="60" y2="52" stroke="#667eea" strokeWidth="1" opacity="0.35" />
              <line x1="100" y1="45" x2="68" y2="58" stroke="#a78bfa" strokeWidth="1" opacity="0.35" />
              <line x1="95" y1="90" x2="66" y2="65" stroke="#ec4899" strokeWidth="1" opacity="0.35" />
              <line x1="25" y1="90" x2="54" y2="65" stroke="#06b6d4" strokeWidth="1" opacity="0.35" />
              <line x1="20" y1="45" x2="52" y2="58" stroke="#10b981" strokeWidth="1" opacity="0.35" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="120" y2="120">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="dash-empty-title">Start exploring narratives</h2>
          <p className="dash-empty-desc">
            Search any topic to discover media clusters, detect bias patterns, and reveal the stories behind the headlines.
          </p>

          <div className="dash-topics">
            <h3 className="dash-topics-heading">Trending Topics</h3>
            <div className="dash-chips">
              {SUGGESTED_TOPICS.map((t) => (
                <button key={t.label} className="dash-chip" onClick={() => runSearch(t.label)}>
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="dash-features">
            <div className="dash-feature">
              <div className="dash-feature-icon">🧠</div>
              <h4>Neural Clustering</h4>
              <p>Group related articles by semantic similarity to reveal narrative patterns.</p>
            </div>
            <div className="dash-feature">
              <div className="dash-feature-icon">📊</div>
              <h4>Bias Detection</h4>
              <p>Identify media bias and sentiment across different sources and outlets.</p>
            </div>
            <div className="dash-feature">
              <div className="dash-feature-icon">🔗</div>
              <h4>Source Mapping</h4>
              <p>Trace how narratives propagate across the global media landscape.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}