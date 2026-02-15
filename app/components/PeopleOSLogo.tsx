import React from "react";

export default function PeopleOSLogo({ className = "" }) {
  return (
    <div className={className} style={{ display: "flex", alignItems: "center" }}>
      {/* Simple logo: circle + text, can be replaced with SVG or image */}
      <div style={{ width: 32, height: 32, background: "#06b6d4", borderRadius: "50%", marginRight: 12 }} />
      <span
        style={{
          fontWeight: 700,
          fontSize: 24,
          background: 'linear-gradient(to right, #22d3ee, #38bdf8, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        PeopleOS
      </span>
    </div>
  );
}
