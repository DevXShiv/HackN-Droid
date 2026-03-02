from ai.services.news_service import fetch_articles
from ai.services.clustering_service import generate_embeddings, cluster_articles
from ai.services.sentiment_service import compute_cluster_sentiment
from ai.services.bias_service import calculate_extremity
from ai.services.query_expansion_service import expand_query
from ai.services.cluster_label_service import generate_cluster_label


def preprocess_query(query: str):
    return query.strip().lower()


def run_pipeline(query: str):

    # 🔹 Step 1: Clean query
    query = preprocess_query(query)

    # 🔹 Step 2: Expand query using Gemini
    expanded_queries = expand_query(query)
    expanded_queries = expanded_queries[:3]  # limit expansion

    all_articles = []

    # 🔹 Step 3: Fetch articles
    for q in expanded_queries:
        articles = fetch_articles(q, limit=15)
        all_articles.extend(articles)

    # 🔹 Step 4: Remove duplicates
    unique_articles = {a["url"]: a for a in all_articles}
    articles = list(unique_articles.values())

    if not articles:
        return {"clusters": []}

    total_articles = len(articles)

    # 🔹 Step 5: Generate embeddings
    embedded = generate_embeddings(articles)

    # 🔹 Step 6: Better dynamic k selection
    if total_articles < 15:
        k = 2
    elif total_articles < 30:
        k = 3
    else:
        k = 4

    clusters = cluster_articles(embedded, k=k)

    # 🔹 Step 7: Remove very small clusters (merge logic light version)
    filtered_clusters = [
        c for c in clusters if len(c["articles"]) >= 4
    ]

    # If filtering removed too many, fallback to original
    if len(filtered_clusters) >= 2:
        clusters = filtered_clusters

    final_clusters = []

    # 🔹 Step 8: Sentiment + Extremity + Share + Label
    for cluster in clusters:

        cluster_size = len(cluster["articles"])
        share = cluster_size / total_articles

        avg_sentiment = compute_cluster_sentiment(cluster)
        extremity = calculate_extremity(avg_sentiment)

        label = generate_cluster_label(cluster)

        final_clusters.append({
            "id": int(cluster["id"]),
            "label": label,
            "size": int(cluster_size),
            "share": float(round(share, 3)),  # 🔥 Narrative Share %
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

    # 🔹 Step 9: Sort clusters by size (largest narrative first)
    final_clusters = sorted(final_clusters, key=lambda x: x["size"], reverse=True)

    return {"clusters": final_clusters}