import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../../services/api";

const SUGGESTED_QUESTIONS = [
    "What's the overall sentiment?",
    "Which source is most biased?",
    "Summarize the key disagreements",
    "What narrative dominates?",
];

export default function ChatBot({ clusters }) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hi! I've analyzed these articles. Ask me anything about the narratives, bias patterns, or sentiment.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const listRef = useRef(null);

    // Build context from clusters
    const buildContext = () => {
        if (!clusters) return "";
        return clusters
            .map(
                (c, i) =>
                    `Cluster "${c.label}" (${c.articles.length} articles, sentiment: ${c.sentiment?.toFixed(2)}, extremity: ${c.extremity?.toFixed(2)}):\n` +
                    c.articles
                        .map((a) => `  - "${a.title}" (${a.source})`)
                        .join("\n")
            )
            .join("\n\n");
    };

    const sendMessage = async (text) => {
        if (!text.trim() || loading) return;

        const userMsg = { role: "user", text: text.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const context = buildContext();
            const res = await chatWithAI(text.trim(), context);
            setMessages((prev) => [...prev, { role: "assistant", text: res.answer }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Sorry, I couldn't process that. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    // Auto-scroll to bottom
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, loading]);

    if (!clusters) return null;

    return (
        <>
            {/* Floating bubble */}
            <button
                className={`chat-bubble ${open ? "chat-bubble-hidden" : ""}`}
                onClick={() => setOpen(true)}
                title="Ask AI about these articles"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span className="chat-bubble-badge"></span>
            </button>

            {/* Chat Panel */}
            <div className={`chat-panel ${open ? "chat-panel-open" : ""}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-left">
                        <div className="chat-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="chat-header-title">Narrative AI</h4>
                            <span className="chat-header-status">
                                <span className="chat-status-dot"></span>
                                Analyzing {clusters.reduce((s, c) => s + c.articles.length, 0)} articles
                            </span>
                        </div>
                    </div>
                    <button className="chat-close" onClick={() => setOpen(false)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages" ref={listRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                            {msg.role === "assistant" && (
                                <div className="chat-msg-avatar">AI</div>
                            )}
                            <div className="chat-msg-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-msg chat-msg-assistant">
                            <div className="chat-msg-avatar">AI</div>
                            <div className="chat-msg-bubble chat-typing">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}

                    {/* Suggested questions (show only if 1 message) */}
                    {messages.length === 1 && !loading && (
                        <div className="chat-suggestions">
                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                <button key={i} className="chat-suggestion" onClick={() => sendMessage(q)}>
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="chat-input-wrap">
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Ask about the narratives..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <button
                        className="chat-send"
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || loading}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
