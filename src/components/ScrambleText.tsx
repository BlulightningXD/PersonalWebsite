"use client";

import React, { useState, useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________01ABCDEF";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  scrambleOnMount?: boolean;
  speed?: number; // ms per tick
  cycles?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

export default function ScrambleText({
  text,
  className = "",
  scrambleOnHover = true,
  scrambleOnMount = false,
  speed = 25,
  cycles = 2,
  as = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * cycles;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / cycles) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
      });

      iteration++;

      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const Tag = as;

  return (
    <Tag
      className={`font-mono transition-colors cursor-pointer select-none ${className}`}
      onMouseEnter={() => {
        if (scrambleOnHover) startScramble();
      }}
    >
      {displayText}
    </Tag>
  );
}
