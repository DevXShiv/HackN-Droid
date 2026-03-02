from google import genai
from ai.config.settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_cluster_label(cluster):
    try:
        # Take top 5 headlines for better context
        headlines = [a["title"] for a in cluster["articles"][:5]]

        headlines_text = "\n".join([f"- {h}" for h in headlines])

        prompt = f"""You are analyzing media framing patterns.

Below are headlines from one narrative cluster:

{headlines_text}

Your task:
1. Identify the dominant framing angle of these headlines.
2. Provide a concise 3-5 word label that captures the specific narrative.
3. NEVER use generic phrases like "General Narrative" or "News Update".
4. Be highly specific. Examples of GOOD labels:
   - "AI Safety Regulation Push"
   - "Tech Layoff Wave Impact"
   - "Climate Summit Progress"
   - "Election Fraud Allegations"
   - "Military Escalation Framing"

Return ONLY the label, nothing else."""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        label = response.text.strip()

        # Remove quotes if model adds them
        label = label.replace('"', '').replace("'", "")

        # Fallback if the label is still generic
        if not label or "general" in label.lower() or len(label) < 3:
            # Use the first headline's key words as fallback
            words = headlines[0].split()[:5]
            label = " ".join(words)

        return label

    except Exception as e:
        print("Cluster labeling error:", e)
        # Better fallback: use first headline snippet
        try:
            return " ".join(cluster["articles"][0]["title"].split()[:5])
        except:
            return "Narrative Cluster"