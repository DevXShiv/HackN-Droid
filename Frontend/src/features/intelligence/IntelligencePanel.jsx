import MetricsRow from "./MetricsRow";
import NarrativeBar from "./NarrativeBar";

export default function IntelligencePanel({ clusters }) {
  if (!clusters || clusters.length === 0) return null;

  const total = clusters.reduce((sum, c) => sum + c.size, 0);
  const dominant = clusters[0];

  return (
    <>
      <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
        Dominant Narrative
      </h2>

      <h3 style={{ marginTop: "8px", fontSize: "16px" }}>
        {dominant.label}
      </h3>

      <MetricsRow
        coverage={((dominant.size / total) * 100).toFixed(1)}
        sentiment={dominant.avg_sentiment}
        extremity={dominant.extremity}
      />

      <hr />

      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>
        Narrative Distribution
      </h3>

      {clusters.map((cluster) => (
        <NarrativeBar
          key={cluster.id}
          label={cluster.label}
          percentage={((cluster.size / total) * 100).toFixed(1)}
        />
      ))}
    </>
  );
}