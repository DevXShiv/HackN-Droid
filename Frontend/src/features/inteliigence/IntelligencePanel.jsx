export default function IntelligencePanel({ clusters }) {
  if (!clusters || clusters.length === 0) return null;

  const total = clusters.reduce((sum, c) => sum + c.size, 0);
  const dominant = clusters[0];

  return (
    <div
      style={{
        background: "white",
        padding: "28px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb"
      }}
    >
      {/* Title */}
      <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>
        Narrative Overview
      </h2>

      {/* Dominant */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>
          Dominant Narrative
        </div>

        <div style={{ fontSize: "20px", fontWeight: 600, marginTop: "4px" }}>
          {dominant.label}
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          marginBottom: "24px"
        }}
      >
        <Metric label="Coverage" value={`${((dominant.size / total) * 100).toFixed(1)}%`} />
        <Metric label="Sentiment" value={dominant.avg_sentiment} />
        <Metric label="Extremity" value={dominant.extremity} />
      </div>

      <div style={{ borderTop: "1px solid #f0f0f0", margin: "20px 0" }} />

      {/* Narrative Distribution */}
      {clusters.map((c) => (
        <div key={c.id} style={{ marginBottom: "18px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              marginBottom: "6px"
            }}
          >
            <span>{c.label}</span>
            <span style={{ color: "#6b7280" }}>
              {((c.size / total) * 100).toFixed(1)}%
            </span>
          </div>

          <div
            style={{
              height: "6px",
              background: "#f3f4f6",
              borderRadius: "4px"
            }}
          >
            <div
              style={{
                width: `${(c.size / total) * 100}%`,
                height: "6px",
                background: "#22c55e",
                borderRadius: "4px"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: "12px", color: "#6b7280" }}>{label}</div>
      <div style={{ fontSize: "16px", fontWeight: 600 }}>{value}</div>
    </div>
  );
}