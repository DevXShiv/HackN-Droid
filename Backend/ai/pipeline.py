from ai.services.news_service import fetch_articles
from ai.services.clustering_service import generate_embeddings, cluster_articles
from ai.services.sentiment_service import compute_cluster_sentiment
from ai.services.bias_service import calculate_extremity
from ai.services.query_expansion_service import expand_query
from ai.services.cluster_label_service import generate_cluster_label
from sklearn.manifold import TSNE
import numpy as np


def preprocess_query(query: str):
    return query.strip().lower()


def run_pipeline(query: str):

    # Step 1: Clean query
    query = preprocess_query(query)

    # Step 2: Expand query using Gemini
    expanded_queries = expand_query(query)
    expanded_queries = expanded_queries[:3]

    all_articles = []

    # Step 3: Fetch articles
    for q in expanded_queries:
        articles = fetch_articles(q, limit=15)
        all_articles.extend(articles)

    # Step 4: Remove duplicates
    unique_articles = {a["url"]: a for a in all_articles}
    articles = list(unique_articles.values())

    if not articles:
        return {"clusters": [], "graph_nodes": []}

    total_articles = len(articles)

    # Step 5: Generate embeddings
    embedded = generate_embeddings(articles)

    # Step 6: Dynamic k selection
    if total_articles < 15:
        k = 2
    elif total_articles < 30:
        k = 3
    else:
        k = 4

    clusters = cluster_articles(embedded, k=k)

    # Step 7: Remove very small clusters
    filtered_clusters = [
        c for c in clusters if len(c["articles"]) >= 4
    ]

    if len(filtered_clusters) >= 2:
        clusters = filtered_clusters

    # Step 8: Generate 2D coordinates for the network graph using t-SNE
    all_embeddings = []
    article_to_cluster = {}
    article_index = 0

    for cluster in clusters:
        for article in cluster["articles"]:
            all_embeddings.append(article["embedding"])
            article_to_cluster[article_index] = cluster["id"]
            article_index += 1

    graph_nodes = []
    if len(all_embeddings) > 1:
        embeddings_matrix = np.array(all_embeddings)
        perplexity = min(30, len(all_embeddings) - 1)
        tsne = TSNE(n_components=2, random_state=42, perplexity=max(1, perplexity))
        coords_2d = tsne.fit_transform(embeddings_matrix)

        # Normalize to 0-1 range
        x_min, x_max = coords_2d[:, 0].min(), coords_2d[:, 0].max()
        y_min, y_max = coords_2d[:, 1].min(), coords_2d[:, 1].max()
        x_range = x_max - x_min if x_max != x_min else 1
        y_range = y_max - y_min if y_max != y_min else 1

        node_idx = 0
        for cluster in clusters:
            for article in cluster["articles"]:
                nx = float((coords_2d[node_idx, 0] - x_min) / x_range)
                ny = float((coords_2d[node_idx, 1] - y_min) / y_range)
                graph_nodes.append({
                    "x": round(nx, 4),
                    "y": round(ny, 4),
                    "cluster_id": int(cluster["id"]),
                    "title": article["title"],
                    "source": article["source"],
                })
                node_idx += 1

    # Step 9: Build final cluster data with sentiment + extremity
    final_clusters = []

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
            "share": float(round(share, 3)),
            "avg_sentiment": float(round(avg_sentiment, 3)),
            "extremity": float(round(extremity, 3)),
            "articles": [
                {
                    "title": a["title"],
                    "source": a["source"],
                    "url": a["url"],
                    "image": a.get("image", None),
                    "publishedAt": a.get("publishedAt", None),
                }
                for a in cluster["articles"]
            ]
        })

    # Step 10: Sort clusters by size
    final_clusters = sorted(final_clusters, key=lambda x: x["size"], reverse=True)

    return {
        "clusters": final_clusters,
        "graph_nodes": graph_nodes
    }