const CLUSTER_COLORS = [
    "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
    "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

export default function SentimentBars({ clusters }) {
    if (!clusters || clusters.length === 0) return null;

    return (
        <div className="sentbars-wrap">
            <h3 className="viz-heading">Sentiment Comparison</h3>
            <div className="sentbars-list">
                {clusters.map((cluster, idx) => {
                    const sent = cluster.avg_sentiment; // 0 to 1, 0.5 = neutral
                    const offset = (sent - 0.5) * 100; // -50 to +50
                    const barWidth = Math.abs(offset);
                    const isPositive = offset >= 0;
                    const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];

                    return (
                        <div key={cluster.id} className="sentbar-row">
                            <span className="sentbar-label">{cluster.label}</span>
                            <div className="sentbar-track">
                                <div className="sentbar-center"></div>
                                <div
                                    className="sentbar-fill"
                                    style={{
                                        width: barWidth + "%",
                                        left: isPositive ? "50%" : (50 - barWidth) + "%",
                                        background: color,
                                    }}
                                ></div>
                            </div>
                            <span className="sentbar-value" style={{ color }}>
                                {sent > 0.6 ? "+" : ""}{((sent - 0.5) * 2).toFixed(2)}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="sentbar-axis">
                <span>Negative</span>
                <span>Neutral</span>
                <span>Positive</span>
            </div>
        </div>
    );
}
