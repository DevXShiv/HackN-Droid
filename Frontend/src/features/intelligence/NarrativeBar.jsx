export default function NarrativeBar({ label, percentage }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "14px" }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          {percentage}%
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}