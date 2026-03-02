export default function SummaryPanel({ summary }) {
    if (!summary) return null;

    return (
        <div className="summary-wrap">
            <div className="summary-header">
                <div className="summary-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                </div>
                <div>
                    <h3 className="viz-heading" style={{ marginBottom: 0 }}>Unbiased Summary</h3>
                    <span className="summary-badge">AI Generated · Neutral</span>
                </div>
            </div>
            <p className="summary-text">{summary}</p>
        </div>
    );
}
