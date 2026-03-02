const API_BASE = "/api";

export async function searchNarratives(query) {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}