from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()


def compute_cluster_sentiment(cluster):
    scores = []

    for article in cluster["articles"]:
        sentiment = analyzer.polarity_scores(article["title"])
        scores.append(sentiment["compound"])

    if not scores:
        return 0.5

    avg = sum(scores) / len(scores)

    # normalize -1 to 1 → 0 to 1
    normalized = (avg + 1) / 2

    return normalized