import ArticleItem from "./ArticleItem";

export default function ArticlePanel({ clusters }) {
  if (!clusters) return null;

  return (
    <>
      <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "12px" }}>
        Article Feed
      </h2>

      {clusters.map((cluster) => (
        <div key={cluster.id} style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "14px", marginBottom: "8px" }}>
            {cluster.label}
          </h3>

          {cluster.articles.map((article, index) => (
            <ArticleItem key={index} article={article} />
          ))}
        </div>
      ))}
    </>
  );
}