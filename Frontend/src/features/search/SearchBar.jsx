import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px" }}>
      <input
        type="text"
        placeholder="Search a topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 14px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "14px"
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 18px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Analyze
      </button>
    </form>
  );
}