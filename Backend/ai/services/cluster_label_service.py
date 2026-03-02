from google import genai
from ai.config.settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_cluster_label(cluster):
    try:
        # Take top 3 headlines
        headlines = [a["title"] for a in cluster["articles"][:3]]

        headlines_text = "\n".join(headlines)

        prompt = f"""
        You are analyzing media framing.

        Based on these headlines, give a concise 3–5 word label that captures the dominant narrative angle.

        Avoid generic phrases like "General Narrative".
        Be specific about framing (e.g., Policy Debate, Industry Expansion, Safety Concerns, Political Conflict).
        """

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )

        label = response.text.strip()

        # Remove quotes if model adds them
        label = label.replace('"', '').replace("'", "")

        return label

    except Exception as e:
        print("Cluster labeling error:", e)
        return "General Narrative"