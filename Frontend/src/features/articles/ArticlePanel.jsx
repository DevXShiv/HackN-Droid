import { useState } from "react";

const CLUSTER_COLORS = [
  "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
  "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

export default function ArticlePanel({ clusters }) {
  const [activeTab, setActiveTab] = useState("all");

  if (!clusters) return null;

  // Flatten all articles with cluster info
  const allArticles = [];
  clusters.forEach((cluster, idx) => {
    cluster.articles.forEach((article, artIdx) => {
      allArticles.push({
        ...article,
        clusterLabel: cluster.label,
        clusterColor: CLUSTER_COLORS[idx % CLUSTER_COLORS.length],
        clusterId: idx,
        index: allArticles.length,
      });
    });
  });

  const filtered =
    activeTab === "all"
      ? allArticles
      : allArticles.filter((a) => a.clusterId === parseInt(activeTab));

  return (
    <div className="reddit-feed">
      <div className="reddit-header">
        <h3 className="viz-heading" style={{ marginBottom: 0 }}>Articles</h3>
        <span className="reddit-count">{allArticles.length} results</span>
      </div>

      {/* Cluster tabs */}
      <div className="reddit-tabs">
        <button
          className={`reddit-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        {clusters.map((cluster, idx) => (
          <button
            key={cluster.id}
            className={`reddit-tab ${activeTab === String(idx) ? "active" : ""}`}
            onClick={() => setActiveTab(String(idx))}
            style={{ "--tab-color": CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}
          >
            <span className="reddit-tab-dot" style={{ background: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}></span>
            {cluster.label}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div className="reddit-list">
        {filtered.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="reddit-item"
          >
            {/* Index number */}
            <div className="reddit-rank">{i + 1}</div>

            {/* Thumbnail */}
            {article.image ? (
              <div className="reddit-thumb">
                <img
                  src={article.image}
                  alt=""
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add("reddit-thumb-fallback");
                  }}
                />
              </div>
            ) : (
              <div className="reddit-thumb reddit-thumb-fallback">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}

            {/* Content */}
            <div className="reddit-content">
              <h4 className="reddit-title">{article.title}</h4>
              <div className="reddit-meta">
                <span
                  className="reddit-cluster-pill"
                  style={{ background: article.clusterColor + "18", color: article.clusterColor, borderColor: article.clusterColor + "30" }}
                >
                  {article.clusterLabel}
                </span>
                <span className="reddit-source">{article.source}</span>
                <span className="reddit-dot-sep"></span>
                <span className="reddit-domain">{new URL(article.url).hostname.replace("www.", "")}</span>
              </div>
            </div>

            {/* External link icon */}
            <div className="reddit-external">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}