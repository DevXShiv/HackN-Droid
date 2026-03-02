from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
import numpy as np

# Load model once (IMPORTANT)
model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(articles):
    texts = []

    for article in articles:
        combined = article["title"] + " " + article["description"]
        texts.append(combined)

    embeddings = model.encode(texts)

    enriched = []

    for i, article in enumerate(articles):
        enriched.append({
            "embedding": embeddings[i],
            "title": article["title"],
            "source": article["source"],
            "url": article["url"]
        })

    return enriched


def cluster_articles(enriched_articles, k=3):
    try:
        vectors = np.array([a["embedding"] for a in enriched_articles])

        kmeans = KMeans(n_clusters=k, random_state=42)
        labels = kmeans.fit_predict(vectors)

        clusters = {}

        for label, article in zip(labels, enriched_articles):
            clusters.setdefault(label, []).append(article)

        result = []

        for cluster_id, articles in clusters.items():
            result.append({
                "id": int(cluster_id),
                "articles": articles
            })

        return result

    except Exception as e:
        print("Clustering error:", e)
        return []