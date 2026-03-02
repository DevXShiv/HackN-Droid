import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function useSearch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runSearch = async (query) => {
    if (!query || !query.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();

      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch narratives.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    runSearch,
  };
}

export default useSearch;