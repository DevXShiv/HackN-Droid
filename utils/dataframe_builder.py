import pandas as pd
from services.bias_service import classify_bias

def build_dataframe(texts, sentiments, scores, clusters):
    data = []
    
    for i in range(len(texts)):
        bias_level = classify_bias(scores[i])
        
        sentiment_score = 1 if sentiments[i] == "POSITIVE" else -1
        
        data.append({
            "text": texts[i],
            "sentiment_score": sentiment_score,
            "confidence": scores[i],
            "bias_score": bias_level,
            "cluster": clusters[i]
        })
    
    return pd.DataFrame(data)