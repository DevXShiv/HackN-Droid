export default function SourceDonut({ clusters }) {
    if (!clusters) return null;

    // Count sources across all clusters
    const sourceCounts = {};
    clusters.forEach((cluster) => {
        cluster.articles.forEach((a) => {
            sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1;
        });
    });

    const sorted = Object.entries(sourceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // top 8 sources

    const total = sorted.reduce((s, [, c]) => s + c, 0);

    const COLORS = [
        "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
        "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
    ];

    // Build SVG arcs
    const radius = 70;
    const cx = 100;
    const cy = 100;
    const innerRadius = 45;
    let cumAngle = 0;

    const arcs = sorted.map(([source, count], idx) => {
        const angle = (count / total) * 360;
        const startAngle = cumAngle;
        cumAngle += angle;
        const endAngle = cumAngle;

        const startRad = ((startAngle - 90) * Math.PI) / 180;
        const endRad = ((endAngle - 90) * Math.PI) / 180;

        const x1 = cx + radius * Math.cos(startRad);
        const y1 = cy + radius * Math.sin(startRad);
        const x2 = cx + radius * Math.cos(endRad);
        const y2 = cy + radius * Math.sin(endRad);

        const ix1 = cx + innerRadius * Math.cos(endRad);
        const iy1 = cy + innerRadius * Math.sin(endRad);
        const ix2 = cx + innerRadius * Math.cos(startRad);
        const iy2 = cy + innerRadius * Math.sin(startRad);

        const largeArc = angle > 180 ? 1 : 0;

        const d = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            `L ${ix1} ${iy1}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix2} ${iy2}`,
            "Z",
        ].join(" ");

        return { d, color: COLORS[idx % COLORS.length], source, count, pct: ((count / total) * 100).toFixed(0) };
    });

    return (
        <div className="donut-wrap">
            <h3 className="viz-heading">Source Diversity</h3>
            <div className="donut-layout">
                <svg viewBox="0 0 200 200" className="donut-svg">
                    {arcs.map((arc, i) => (
                        <path key={i} d={arc.d} fill={arc.color} opacity="0.85">
                            <title>{arc.source}: {arc.count} articles</title>
                        </path>
                    ))}
                    {/* Center text */}
                    <text x="100" y="96" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">
                        {total}
                    </text>
                    <text x="100" y="113" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                        articles
                    </text>
                </svg>

                <div className="donut-legend">
                    {arcs.map((arc, i) => (
                        <div key={i} className="donut-legend-item">
                            <span className="donut-legend-dot" style={{ background: arc.color }}></span>
                            <span className="donut-legend-name">{arc.source}</span>
                            <span className="donut-legend-pct">{arc.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
