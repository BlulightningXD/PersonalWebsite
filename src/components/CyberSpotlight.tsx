"use client";

import React, { useEffect, useState } from "react";

export default function CyberSpotlight() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, var(--cyber-glow-soft, rgba(0, 240, 255, 0.08)), transparent 80%)`,
        }}
      />

      {/* Vignette border effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
