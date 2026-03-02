from google import genai
from ai.config.settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def expand_query(query: str):
    try:
        prompt = f"""
        Expand this news search query into 5 short related search phrases.
        Keep them concise and relevant.
        Return only the list.

        Query: {query}
        """

        response = client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt
        )

        text = response.text.strip()
        lines = text.split("\n")

        cleaned = []

        for line in lines:
            line = line.strip()
            if line:
                if "." in line:
                    line = line.split(".", 1)[-1].strip()
                cleaned.append(line)

        cleaned.insert(0, query)

        return list(set(cleaned))

    except Exception as e:
        print("Gemini expansion error:", e)
        return [query]