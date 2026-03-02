export default function ArticleItem({ article }) {
  return (
    <div className="article-item">
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="article-title"
      >
        {article.title}
      </a>

      <div className="article-source">
        {article.source}
      </div>
    </div>
  );
}