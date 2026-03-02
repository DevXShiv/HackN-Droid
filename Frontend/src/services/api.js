const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function searchNarratives(query) {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export async function chatWithAI(question, context) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context }),
  });

  if (!response.ok) {
    throw new Error("Chat request failed");
  }

  return response.json();
}