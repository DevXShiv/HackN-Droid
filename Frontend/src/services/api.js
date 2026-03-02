const API_BASE = "http://127.0.0.1:8000";

export async function searchNarratives(query) {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}