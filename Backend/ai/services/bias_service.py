import math

def calculate_extremity(avg_sentiment):

    # distance from neutral
    distance = abs(avg_sentiment - 0.5)

    # amplify using non-linear scaling
    amplified = math.sqrt(distance) * 2

    return min(amplified, 1.0)