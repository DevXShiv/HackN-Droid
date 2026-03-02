const CLUSTER_COLORS = [
    "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
    "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

export default function SentimentGauges({ clusters }) {
    if (!clusters || clusters.length === 0) return null;

    return (
        <div className="gauges-wrap">
            <h3 className="viz-heading">Sentiment Analysis</h3>
            <div className="gauges-grid">
                {clusters.map((cluster, idx) => {
                    const raw = cluster.avg_sentiment; // 0–1 (0.5 = neutral)
                    const angle = -90 + raw * 180; // -90 to +90 degrees
                    const label =
                        raw > 0.6 ? "Positive" : raw < 0.4 ? "Negative" : "Neutral";
                    const color =
                        raw > 0.6 ? "#10b981" : raw < 0.4 ? "#ef4444" : "#f59e0b";

                    return (
                        <div key={cluster.id} className="gauge-card">
                            <svg viewBox="0 0 200 120" className="gauge-svg">
                                {/* Background arc */}
                                <path
                                    d="M 20 110 A 80 80 0 0 1 180 110"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.06)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                {/* Colored zones */}
                                <path
                                    d="M 20 110 A 80 80 0 0 1 66 32"
                                    fill="none"
                                    stroke="#ef444430"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 66 32 A 80 80 0 0 1 134 32"
                                    fill="none"
                                    stroke="#f59e0b30"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 134 32 A 80 80 0 0 1 180 110"
                                    fill="none"
                                    stroke="#10b98130"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />
                                {/* Needle */}
                                <line
                                    x1="100"
                                    y1="110"
                                    x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
                                    y2={110 + 60 * Math.sin((angle * Math.PI) / 180)}
                                    stroke={color}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                                {/* Center dot */}
                                <circle cx="100" cy="110" r="5" fill={color} />
                                {/* Label */}
                                <text
                                    x="100"
                                    y="95"
                                    textAnchor="middle"
                                    fill={color}
                                    fontSize="14"
                                    fontWeight="700"
                                >
                                    {label}
                                </text>
                            </svg>
                            <div className="gauge-info">
                                <span
                                    className="gauge-dot"
                                    style={{ background: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}
                                ></span>
                                <span className="gauge-label">{cluster.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
