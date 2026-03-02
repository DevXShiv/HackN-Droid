def classify_bias(score):
    if score > 0.75:
        return 1   # extreme
    elif score > 0.55:
        return 0   # neutral
    else:
        return -1  # low confidence / weak bias