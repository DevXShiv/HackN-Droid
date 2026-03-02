from google import genai
from ai.config.settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_cluster_label(cluster):
    try:
        # Take top 3 headlines
        headlines = [a["title"] for a in cluster["articles"][:3]]
        print("HEADLINES SENT TO GEMINI:")
        for a in cluster["articles"][:5]:
            print("-", a["title"])

        headlines_text = "\n".join(headlines)

        prompt = f"""
        You are analyzing media framing patterns.

        Below are headlines from one narrative cluster:

        {formatted_headlines}

        Your task:
        1. Identify the dominant framing angle.
        2. Provide a concise 3-5 word label.
        3. Avoid generic phrases like "General Narrative".
        4. Be specific (e.g., "AI Policy Debate", "Tech Industry Expansion", "Safety & Regulation Concerns", "Military Escalation Framing").

        Return ONLY the label.
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