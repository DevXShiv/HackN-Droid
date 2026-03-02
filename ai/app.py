import streamlit as st
import plotly.express as px

from services.news_service import fetch_news
from services.sentiment_service import analyze_sentiment
from services.clustering_service import cluster_texts
from utils.dataframe_builder import build_dataframe

st.set_page_config(page_title="NarrativeLens AI", layout="wide")

st.title("🧠 NarrativeLens AI")
st.write("Mapping ideological narratives in real-time.")

query = st.text_input("Enter Topic")

if st.button("Analyze") and query:
    
    with st.spinner("Fetching and analyzing narratives..."):
        
        texts = fetch_news(query)
        
        if len(texts) == 0:
            st.error("No articles found.")
        else:
            sentiments, scores = analyze_sentiment(texts)
            clusters = cluster_texts(texts)
            
            df = build_dataframe(texts, sentiments, scores, clusters)
            
            fig = px.scatter(
                df,
                x="sentiment_score",
                y="bias_score",
                color="cluster",
                hover_data=["text"],
                title="Narrative Ideology Map"
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            st.subheader("Raw Data")
            st.dataframe(df)