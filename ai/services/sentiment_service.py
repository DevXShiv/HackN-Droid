from transformers import pipeline

def analyze_sentiment(texts):
    
    sentiment_model = pipeline("sentiment-analysis")
    
    results = sentiment_model(texts)
    
    sentiments = []
    scores = []
    
    for r in results:
        sentiments.append(r["label"])
        scores.append(r["score"])
    
    return sentiments, scores