import requests
from ai.config.settings import NEWS_API_KEY


def fetch_articles(keyword: str, limit: int = 40):
    try:
        url = "https://newsapi.org/v2/everything"

        params = {
            "q": keyword,
            "pageSize": limit,
            "language": "en",
            "apiKey": NEWS_API_KEY
        }

        response = requests.get(url, params=params)

        if response.status_code != 200:
            return []

        data = response.json()
        articles = []

        for item in data.get("articles", []):
            if item["title"] and item["description"]:
                articles.append({
                    "title": item["title"],
                    "description": item["description"],
                    "source": item["source"]["name"],
                    "url": item["url"]
                })

        return articles[:limit]

    except Exception as e:
        print("News error:", e)
        return []
    
if __name__ == "__main__":
    data = fetch_articles("AI")
    print(len(data))
    print(data[0])