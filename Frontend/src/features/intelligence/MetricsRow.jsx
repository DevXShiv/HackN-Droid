export default function MetricsRow({ coverage, sentiment, extremity }) {
  return (
    <div className="metrics-row">
      <div className="metric">
        <span className="metric-label">Coverage</span>
        <span className="metric-value">{coverage}%</span>
      </div>

      <div className="metric">
        <span className="metric-label">Sentiment</span>
        <span className="metric-value">{sentiment}</span>
      </div>

      <div className="metric">
        <span className="metric-label">Extremity</span>
        <span className="metric-value">{extremity}</span>
      </div>
    </div>
  );
}