import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export default function SplitText({ text, className = "", delay = 32, duration = 1, splitType = "chars", from = { opacity: 0, y: 70 }, to = { opacity: 1, y: 0 }, tag = "h2", textAlign = "left" }) {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(() => {
    if (!ref.current || !fontsLoaded) return;
    const split = new GSAPSplitText(ref.current, { type: splitType, smartWrap: true, charsClass: "split-char", wordsClass: "split-word" });
    const targets = splitType.includes("chars") ? split.chars : split.words;
    gsap.fromTo(targets, from, { ...to, duration, stagger: delay / 1000, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
    return () => split.revert();
  }, { dependencies: [text, fontsLoaded], scope: ref });

  const Tag = tag;
  return <Tag ref={ref} className={`rb-split-text ${className}`} style={{ textAlign }}>{text}</Tag>;
}
