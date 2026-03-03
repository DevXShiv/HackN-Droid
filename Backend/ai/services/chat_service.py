import requests


OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3:8b"


def chat_with_context(question: str, articles_context: str):
    """
    Answer a user question using Ollama (local LLM) with article context.
    """
    trimmed_context = articles_context[:2500]

    prompt = f"""You are "Narrative AI", a friendly and insightful news analysis chatbot embedded in a media bias detection dashboard.

You have access to the following analyzed news articles and their cluster data:

{trimmed_context}

RULES:
- Be conversational and friendly, like a helpful analyst colleague
- Keep answers SHORT: 2-5 sentences max
- Always reference specific article titles or sources when answering
- If asked about sentiment, refer to the sentiment scores in the data
- If asked about bias, compare how different sources cover the same topic
- If the user says "hi" or greets you, respond warmly and suggest what they can ask about
- If the question isn't related to the articles, politely redirect to the topic
- Use bullet points for comparisons
- Never make up information not in the context

User: {question}
Narrative AI:"""

    try:
        response = requests.post(OLLAMA_URL, json={
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "num_predict": 200,
            }
        }, timeout=60)

        if response.status_code == 200:
            return response.json()["response"].strip()
        else:
            return "Ollama is not responding. Make sure it's running."
    except requests.ConnectionError:
        return "Cannot connect to Ollama. Make sure it's running (ollama serve)."
    except Exception as e:
        return f"Error: {str(e)[:150]}"
