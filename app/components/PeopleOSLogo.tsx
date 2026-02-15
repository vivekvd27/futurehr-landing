import React from "react";

export default function PeopleOSLogo({ className = "" }) {
  return (
    <div className={className} style={{ display: "flex", alignItems: "center" }}>
      {/* Creative logo: stylized 'P' inside circle */}
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginRight: 12 }}>
        <circle cx="16" cy="16" r="16" fill="#06b6d4" />
        <path
          d="M11 22V10h7.5a4.5 4.5 0 0 1 0 9H15v3h-4zM15 17h3.5a2.5 2.5 0 0 0 0-5H15v5z"
          fill="#fff"
        />
      </svg>
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
