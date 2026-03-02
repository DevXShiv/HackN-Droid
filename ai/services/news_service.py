import requests
from config.settings import NEWS_API_KEY, MAX_ARTICLES

def fetch_news(query):

    url = "https://gnews.io/api/v4/search"

    params = {
        "q": query,
        "lang": "en",
        "max": MAX_ARTICLES,
        "token": NEWS_API_KEY
    }

    response = requests.get(url, params=params)

    if response.status_code != 200:
        print("Error:", response.json())
        return []

    articles = response.json().get("articles", [])

    texts = []

    for article in articles:
        title = article.get("title", "")
        desc = article.get("description", "")
        content = article.get("content", "")
        texts.append(f"{title} {desc} {content}")

    return texts