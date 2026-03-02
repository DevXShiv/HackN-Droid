const CLUSTER_COLORS = [
    "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
    "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

export default function BiasHeatmap({ clusters }) {
    if (!clusters || clusters.length === 0) return null;

    // Build source × cluster matrix
    const allSources = new Set();
    clusters.forEach((c) => c.articles.forEach((a) => allSources.add(a.source)));

    const sources = [...allSources];
    const sourceClusterCounts = {};

    sources.forEach((src) => {
        sourceClusterCounts[src] = {};
        clusters.forEach((c) => {
            const count = c.articles.filter((a) => a.source === src).length;
            sourceClusterCounts[src][c.id] = count;
        });
    });

    // Sort sources by total articles
    sources.sort((a, b) => {
        const totalA = Object.values(sourceClusterCounts[a]).reduce((s, v) => s + v, 0);
        const totalB = Object.values(sourceClusterCounts[b]).reduce((s, v) => s + v, 0);
        return totalB - totalA;
    });

    // Limit to top 10
    const topSources = sources.slice(0, 10);

    // Find max count for scaling
    let maxCount = 0;
    topSources.forEach((src) => {
        clusters.forEach((c) => {
            maxCount = Math.max(maxCount, sourceClusterCounts[src][c.id]);
        });
    });

    return (
        <div className="heatmap-wrap">
            <h3 className="viz-heading">Source × Narrative Heatmap</h3>
            <div className="heatmap-scroll">
                <table className="heatmap-table">
                    <thead>
                        <tr>
                            <th className="heatmap-corner">Source</th>
                            {clusters.map((c, idx) => (
                                <th key={c.id} className="heatmap-col-head">
                                    <span
                                        className="heatmap-col-dot"
                                        style={{ background: CLUSTER_COLORS[idx % CLUSTER_COLORS.length] }}
                                    ></span>
                                    <span className="heatmap-col-text">{c.label}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {topSources.map((src) => (
                            <tr key={src}>
                                <td className="heatmap-row-head">{src}</td>
                                {clusters.map((c, idx) => {
                                    const count = sourceClusterCounts[src][c.id];
                                    const intensity = maxCount > 0 ? count / maxCount : 0;
                                    const color = CLUSTER_COLORS[idx % CLUSTER_COLORS.length];

                                    return (
                                        <td key={c.id} className="heatmap-cell">
                                            <div
                                                className="heatmap-cell-fill"
                                                style={{
                                                    background: color,
                                                    opacity: 0.1 + intensity * 0.7,
                                                }}
                                            >
                                                {count > 0 ? count : ""}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
