"use client";

import React, { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
}

export default function GlitchText({
  text,
  className = "",
  as = "span",
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Tag = as;

  return (
    <Tag
      className={`relative inline-block select-none cursor-default font-bold tracking-tight transition-transform ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textShadow: isHovered
          ? "2px 0 var(--cyber-secondary, #ff003c), -2px 0 var(--cyber-primary, #00f0ff)"
          : "none",
      }}
    >
      {text}
      {isHovered && (
        <>
          {/* Glitch chromatic layers */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-[var(--cyber-primary)] opacity-70 pointer-events-none -translate-x-[1px] translate-y-[1px] animate-pulse"
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 text-[var(--cyber-secondary)] opacity-70 pointer-events-none translate-x-[1.5px] -translate-y-[1px]"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
