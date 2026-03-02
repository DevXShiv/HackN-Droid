import { useRef, useEffect, useState } from "react";

const CLUSTER_COLORS = [
    "#667eea", "#a78bfa", "#ec4899", "#06b6d4",
    "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

export default function ClusterGraph({ nodes }) {
    const canvasRef = useRef(null);
    const [tooltip, setTooltip] = useState(null);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !nodes || nodes.length === 0) return;

        const container = canvas.parentElement;
        const w = container.clientWidth;
        const h = 400;
        canvas.width = w * 2; // retina
        canvas.height = h * 2;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        setDimensions({ w, h });

        const ctx = canvas.getContext("2d");
        ctx.scale(2, 2);

        const pad = 40;

        // Map nodes to canvas positions
        const mapped = nodes.map((n) => ({
            ...n,
            cx: pad + n.x * (w - pad * 2),
            cy: pad + n.y * (h - pad * 2),
            color: CLUSTER_COLORS[n.cluster_id % CLUSTER_COLORS.length],
        }));

        // Draw connections within same cluster (lighter lines)
        ctx.lineWidth = 0.5;
        for (let i = 0; i < mapped.length; i++) {
            for (let j = i + 1; j < mapped.length; j++) {
                if (mapped[i].cluster_id === mapped[j].cluster_id) {
                    const dist = Math.hypot(mapped[i].cx - mapped[j].cx, mapped[i].cy - mapped[j].cy);
                    if (dist < 180) {
                        ctx.strokeStyle = mapped[i].color + "20";
                        ctx.beginPath();
                        ctx.moveTo(mapped[i].cx, mapped[i].cy);
                        ctx.lineTo(mapped[j].cx, mapped[j].cy);
                        ctx.stroke();
                    }
                }
            }
        }

        // Draw nodes
        mapped.forEach((node) => {
            // Glow
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 12;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.cx, node.cy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Border
            ctx.strokeStyle = node.color + "60";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(node.cx, node.cy, 7, 0, Math.PI * 2);
            ctx.stroke();
        });

        // Mouse handler for tooltips
        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            let found = null;
            for (const node of mapped) {
                const dist = Math.hypot(node.cx - mx, node.cy - my);
                if (dist < 12) {
                    found = node;
                    break;
                }
            }
            setTooltip(found ? { x: found.cx, y: found.cy, title: found.title, source: found.source } : null);
        };

        canvas.addEventListener("mousemove", handleMove);
        return () => canvas.removeEventListener("mousemove", handleMove);
    }, [nodes]);

    if (!nodes || nodes.length === 0) return null;

    return (
        <div className="cluster-graph-wrap">
            <h3 className="viz-heading">Narrative Cluster Map</h3>
            <div className="cluster-graph-container">
                <canvas ref={canvasRef} />
                {tooltip && (
                    <div
                        className="graph-tooltip"
                        style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
                    >
                        <strong>{tooltip.title}</strong>
                        <span>{tooltip.source}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
