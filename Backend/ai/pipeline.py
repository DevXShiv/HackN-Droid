from ai.services.news_service import fetch_articles
from ai.services.clustering_service import generate_embeddings, cluster_articles
from ai.services.sentiment_service import compute_cluster_sentiment
from ai.services.bias_service import calculate_extremity
from ai.services.query_expansion_service import expand_query


def preprocess_query(query: str):
    return query.strip().lower()


def run_pipeline(query: str):

    # 🔹 Step 1: Clean query
    query = preprocess_query(query)

    # 🔹 Step 2: Expand query using Gemini
    expanded_queries = expand_query(query)

    # Limit to control API usage
    expanded_queries = expanded_queries[:3]

    all_articles = []

    # 🔹 Step 3: Fetch articles for each expanded query
    for q in expanded_queries:
        articles = fetch_articles(q, limit=15)
        all_articles.extend(articles)

    # 🔹 Step 4: Remove duplicate articles by URL
    unique_articles = {a["url"]: a for a in all_articles}
    articles = list(unique_articles.values())

    if not articles:
        return {"clusters": []}

    # 🔹 Step 5: Generate embeddings
    embedded = generate_embeddings(articles)

    # 🔹 Step 6: Dynamic cluster count
    num_articles = len(articles)
    k = min(4, max(2, num_articles // 10))

    clusters = cluster_articles(embedded, k=k)

    final_clusters = []

    # 🔹 Step 7: Sentiment + Extremity
    for cluster in clusters:
        avg_sentiment = compute_cluster_sentiment(cluster)
        extremity = calculate_extremity(avg_sentiment)

        final_clusters.append({
            "id": int(cluster["id"]),
            "size": int(len(cluster["articles"])),
            "avg_sentiment": float(round(avg_sentiment, 3)),
            "extremity": float(round(extremity, 3)),
            "articles": [
                {
                    "title": a["title"],
                    "source": a["source"],
                    "url": a["url"]
                }
                for a in cluster["articles"]
            ]
        })

    return {"clusters": final_clusters}