import useSearch from "../features/search/useSearch";
import SearchBar from "../features/search/SearchBar";
import IntelligencePanel from "../features/intelligence/IntelligencePanel";
import ArticlePanel from "../features/articles/ArticlePanel";
import "./Dashboard.css";

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
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <span className="dashboard-logo">MediaMind</span>
          <span className="dashboard-logo-ai">AI</span>
        </div>
        <div className="dashboard-header-right">
          <div className="header-status">
            <span className="status-dot"></span>
            <span className="status-text">Live</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1 className="dashboard-title">Narrative Intelligence Dashboard</h1>
        <p className="dashboard-subtitle">
          Analyze media narratives, detect bias, and uncover story clusters in real-time.
        </p>

        <SearchBar onSearch={runSearch} />

        {/* Loading State */}
        {loading && (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Analyzing narratives...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="dashboard-error">
            <span className="error-icon">⚠️</span>
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

        {/* Empty State — shown when no search has been made */}
        {!data && !loading && !error && (
          <div className="dashboard-empty">
            {/* Hero illustration area */}
            <div className="empty-hero">
              <div className="empty-icon-grid">
                <div className="empty-orb orb-1"></div>
                <div className="empty-orb orb-2"></div>
                <div className="empty-orb orb-3"></div>
                <svg className="empty-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="55" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
                  <circle cx="60" cy="60" r="38" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.3" />
                  <circle cx="60" cy="60" r="8" fill="url(#grad1)" opacity="0.9" />
                  {/* Nodes */}
                  <circle cx="60" cy="15" r="4" fill="#667eea" />
                  <circle cx="100" cy="45" r="4" fill="#a78bfa" />
                  <circle cx="95" cy="90" r="4" fill="#ec4899" />
                  <circle cx="25" cy="90" r="4" fill="#06b6d4" />
                  <circle cx="20" cy="45" r="4" fill="#10b981" />
                  {/* Lines to center */}
                  <line x1="60" y1="15" x2="60" y2="52" stroke="#667eea" strokeWidth="1" opacity="0.4" />
                  <line x1="100" y1="45" x2="68" y2="58" stroke="#a78bfa" strokeWidth="1" opacity="0.4" />
                  <line x1="95" y1="90" x2="66" y2="65" stroke="#ec4899" strokeWidth="1" opacity="0.4" />
                  <line x1="25" y1="90" x2="54" y2="65" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
                  <line x1="20" y1="45" x2="52" y2="58" stroke="#10b981" strokeWidth="1" opacity="0.4" />
                  <defs>
                    <linearGradient id="grad1" x1="0" y1="0" x2="120" y2="120">
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="empty-title">Start exploring narratives</h2>
              <p className="empty-desc">
                Search any topic to discover media clusters, detect bias patterns, and reveal the stories behind the headlines.
              </p>
            </div>

            {/* Suggested Topics */}
            <div className="suggested-section">
              <h3 className="suggested-heading">Trending Topics</h3>
              <div className="suggested-chips">
                {SUGGESTED_TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    className="suggested-chip"
                    onClick={() => runSearch(topic.label)}
                  >
                    <span className="chip-icon">{topic.icon}</span>
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats / Feature Cards */}
            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #667eea33, #667eea11)" }}>
                  <span>🧠</span>
                </div>
                <h4>Neural Clustering</h4>
                <p>Group related articles by semantic similarity to reveal narrative patterns.</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #a78bfa33, #a78bfa11)" }}>
                  <span>📊</span>
                </div>
                <h4>Bias Detection</h4>
                <p>Identify media bias and sentiment across different sources and outlets.</p>
              </div>
              <div className="feature-card">
                <div className="feature-card-icon" style={{ background: "linear-gradient(135deg, #06b6d433, #06b6d411)" }}>
                  <span>🔗</span>
                </div>
                <h4>Source Mapping</h4>
                <p>Trace how narratives propagate across the global media landscape.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}