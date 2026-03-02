import useSearch from "../features/search/useSearch";
import SearchBar from "../features/search/SearchBar";
import IntelligencePanel from "../features/intelligence/IntelligencePanel";
import ArticlePanel from "../features/articles/ArticlePanel";
import ClusterGraph from "../features/visualizations/ClusterGraph";
import SentimentGauges from "../features/visualizations/SentimentGauges";
import SourceDonut from "../features/visualizations/SourceDonut";
import SentimentBars from "../features/visualizations/SentimentBars";
import BiasHeatmap from "../features/visualizations/BiasHeatmap";
import MediaGallery from "../features/visualizations/MediaGallery";
import SummaryPanel from "../features/visualizations/SummaryPanel";
import ChatBot from "../features/chat/ChatBot";

const SUGGESTED_TOPICS = [
  "AI Regulation",
  "Climate Policy",
  "Tech Layoffs",
  "Space Exploration",
  "Cybersecurity",
  "Global Elections",
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
      {data && !loading && data.clusters && data.clusters.length > 0 && (
        <div className="dash-results">

          {/* Row 1: Media Gallery (left) + Article Feed (right) */}
          <div className="dash-results-split">
            <div className="dash-left">
              <div className="panel dash-panel-full">
                <MediaGallery clusters={data.clusters} />
              </div>
            </div>
            <div className="dash-right">
              <div className="dash-right-sticky">
                <div className="panel">
                  <ArticlePanel clusters={data.clusters} />
                </div>
              </div>
            </div>
          </div>

          {/* Summary + Source Donut */}
          <div className="dash-section-label">Overview</div>
          <div className="dash-row-overview">
            <div className="panel dash-panel-summary">
              <SummaryPanel summary={data.summary} />
            </div>
            <div className="panel dash-panel-donut-sm">
              <SourceDonut clusters={data.clusters} />
            </div>
          </div>

          {/* Cluster Map */}
          <div className="dash-section-label">Cluster Visualization</div>
          <ClusterGraph nodes={data.graph_nodes} />

          {/* Sentiment — full width */}
          <div className="dash-section-label">Sentiment & Analysis</div>
          <div className="dash-row-sentiment">
            <div className="panel dash-panel-flex">
              <SentimentGauges clusters={data.clusters} />
            </div>
            <div className="panel dash-panel-flex">
              <SentimentBars clusters={data.clusters} />
            </div>
          </div>

          <div className="panel dash-panel-full">
            <IntelligencePanel clusters={data.clusters} />
          </div>

          {/* Bias — full width */}
          <div className="dash-section-label">Bias Analysis</div>
          <div className="panel dash-panel-full">
            <BiasHeatmap clusters={data.clusters} />
          </div>
        </div>
      )}

      {/* Empty State */}
      {!data && !loading && !error && (
        <div className="dash-empty">
          <div className="dash-empty-visual">
            <svg className="dash-empty-svg" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="url(#g1)" strokeWidth="1" strokeDasharray="4 6" opacity="0.2" />
              <circle cx="100" cy="100" r="65" stroke="url(#g1)" strokeWidth="0.8" opacity="0.12" />
              <circle cx="100" cy="100" r="6" fill="url(#g1)" opacity="0.6" />
              <circle cx="100" cy="100" r="12" stroke="url(#g1)" strokeWidth="0.5" opacity="0.3" />
              <circle cx="100" cy="20" r="3.5" fill="#667eea" opacity="0.8" />
              <circle cx="165" cy="60" r="3.5" fill="#a78bfa" opacity="0.8" />
              <circle cx="155" cy="145" r="3.5" fill="#ec4899" opacity="0.8" />
              <circle cx="45" cy="145" r="3.5" fill="#06b6d4" opacity="0.8" />
              <circle cx="35" cy="60" r="3.5" fill="#10b981" opacity="0.8" />
              <line x1="100" y1="20" x2="100" y2="88" stroke="#667eea" strokeWidth="0.6" opacity="0.2" />
              <line x1="165" y1="60" x2="112" y2="95" stroke="#a78bfa" strokeWidth="0.6" opacity="0.2" />
              <line x1="155" y1="145" x2="108" y2="108" stroke="#ec4899" strokeWidth="0.6" opacity="0.2" />
              <line x1="45" y1="145" x2="92" y2="108" stroke="#06b6d4" strokeWidth="0.6" opacity="0.2" />
              <line x1="35" y1="60" x2="88" y2="95" stroke="#10b981" strokeWidth="0.6" opacity="0.2" />
              <line x1="100" y1="20" x2="165" y2="60" stroke="#667eea" strokeWidth="0.3" opacity="0.1" />
              <line x1="165" y1="60" x2="155" y2="145" stroke="#a78bfa" strokeWidth="0.3" opacity="0.1" />
              <line x1="35" y1="60" x2="45" y2="145" stroke="#10b981" strokeWidth="0.3" opacity="0.1" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="200" y2="200">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h2 className="dash-empty-title">Analyze any narrative</h2>
          <p className="dash-empty-desc">
            Enter a topic above to uncover how different media sources frame the story — clusters, bias, and sentiment in real time.
          </p>

          <div className="dash-stats-row">
            <div className="dash-stat">
              <span className="dash-stat-num">50+</span>
              <span className="dash-stat-label">Sources analyzed</span>
            </div>
            <div className="dash-stat-divider"></div>
            <div className="dash-stat">
              <span className="dash-stat-num">5</span>
              <span className="dash-stat-label">Analysis types</span>
            </div>
            <div className="dash-stat-divider"></div>
            <div className="dash-stat">
              <span className="dash-stat-num">Real-time</span>
              <span className="dash-stat-label">Processing</span>
            </div>
          </div>

          <div className="dash-topics">
            <h3 className="dash-topics-heading">Try a topic</h3>
            <div className="dash-chips">
              {SUGGESTED_TOPICS.map((topic) => (
                <button key={topic} className="dash-chip" onClick={() => runSearch(topic)}>
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="dash-features">
            <div className="dash-feature">
              <svg className="dash-feature-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" />
                <line x1="9.5" y1="10.5" x2="6.5" y2="7.5" /><line x1="14.5" y1="10.5" x2="17.5" y2="7.5" /><line x1="9.5" y1="13.5" x2="6.5" y2="16.5" /><line x1="14.5" y1="13.5" x2="17.5" y2="16.5" />
              </svg>
              <h4>Neural Clustering</h4>
              <p>Group articles by semantic similarity to reveal distinct narrative patterns.</p>
            </div>
            <div className="dash-feature">
              <svg className="dash-feature-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <h4>Sentiment & Bias</h4>
              <p>Measure sentiment and extremity across clusters to detect framing bias.</p>
            </div>
            <div className="dash-feature">
              <svg className="dash-feature-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                <line x1="10" y1="6.5" x2="14" y2="6.5" /><line x1="6.5" y1="10" x2="6.5" y2="14" />
              </svg>
              <h4>Source Mapping</h4>
              <p>See which outlets push which narratives with source-vs-cluster analysis.</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot — fixed position */}
      {data && data.clusters && <ChatBot clusters={data.clusters} />}
    </div>
  );
}