import { useRef } from "react";

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(255,255,255,.2)" }) {
  const ref = useRef(null);
  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    ref.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return <article ref={ref} onMouseMove={handleMove} className={`rb-spotlight-card ${className}`}>{children}</article>;
}
