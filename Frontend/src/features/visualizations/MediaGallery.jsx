import { useState } from "react";

export default function MediaGallery({ clusters }) {
    const [selectedImg, setSelectedImg] = useState(null);

    if (!clusters) return null;

    // Collect all articles with images
    const allImages = [];
    clusters.forEach((cluster, idx) => {
        cluster.articles.forEach((article) => {
            if (article.image) {
                allImages.push({
                    ...article,
                    cluster_id: idx,
                    cluster_label: cluster.label,
                });
            }
        });
    });

    if (allImages.length === 0) return null;

    // Show up to 12 images
    const images = allImages.slice(0, 12);

    return (
        <div className="gallery-wrap">
            <h3 className="viz-heading">
                Media Coverage
                <span className="gallery-count">{allImages.length} images</span>
            </h3>

            <div className="gallery-grid">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="gallery-card"
                        onClick={() => setSelectedImg(img)}
                    >
                        <div className="gallery-img-wrap">
                            <img
                                src={img.image}
                                alt={img.title}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.parentElement.parentElement.style.display = "none";
                                }}
                            />
                            <div className="gallery-overlay">
                                <span className="gallery-source">{img.source}</span>
                            </div>
                        </div>
                        <p className="gallery-title">{img.title}</p>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImg && (
                <div className="gallery-lightbox" onClick={() => setSelectedImg(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImg(null)}>✕</button>
                        <img src={selectedImg.image} alt={selectedImg.title} />
                        <div className="lightbox-info">
                            <h4>{selectedImg.title}</h4>
                            <p>{selectedImg.source} · {selectedImg.cluster_label}</p>
                            <a href={selectedImg.url} target="_blank" rel="noreferrer">
                                Read full article →
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
