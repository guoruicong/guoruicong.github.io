import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const spring = { damping: 26, stiffness: 140, mass: 1.4 };

export default function TiltedCard({ imageSrc, altText, children, className = "", rotateAmplitude = 8, scaleOnHover = 1.025 }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);

  const handleMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    rotateX.set((y / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((x / (rect.width / 2)) * rotateAmplitude);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <figure ref={ref} className={`rb-tilted-card ${className}`} onMouseMove={handleMove} onMouseEnter={() => scale.set(scaleOnHover)} onMouseLeave={reset}>
      <motion.div className="rb-tilted-card-inner" style={{ rotateX, rotateY, scale }}>
        <img src={imageSrc} alt={altText} />
        {children && <div className="rb-tilted-card-overlay">{children}</div>}
      </motion.div>
    </figure>
  );
}
