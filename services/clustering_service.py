from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from config.settings import CLUSTERS

def cluster_texts(texts):
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    embeddings = model.encode(texts)
    
    kmeans = KMeans(n_clusters=CLUSTERS, random_state=42)
    labels = kmeans.fit_predict(embeddings)
    
    return labels