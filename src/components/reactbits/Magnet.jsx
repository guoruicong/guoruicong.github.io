import { useEffect, useRef, useState } from "react";

export default function Magnet({ children, padding = 70, magnetStrength = 3, className = "" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const inside = Math.abs(centerX - event.clientX) < width / 2 + padding && Math.abs(centerY - event.clientY) < height / 2 + padding;
      setActive(inside);
      setPosition(inside ? { x: (event.clientX - centerX) / magnetStrength, y: (event.clientY - centerY) / magnetStrength } : { x: 0, y: 0 });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [padding, magnetStrength]);

  return (
    <span ref={ref} className={`rb-magnet ${className}`}>
      <span style={{ transform: `translate3d(${position.x}px,${position.y}px,0)`, transition: active ? "transform .25s ease-out" : "transform .5s cubic-bezier(.22,1,.36,1)" }}>{children}</span>
    </span>
  );
}
