'use client'

import React from "react";

interface SpinnerProps {
  size?: number;
  borderWidth?: number;
  color?: string;
  backgroundColor?: string;
}

export default function Spinner({
                                  size = 40,
                                  borderWidth = 4,
                                  color = "#fff",
                                  backgroundColor = "rgba(255,255,255,0.2)"
                                }: SpinnerProps) {
  const spinnerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${borderWidth}px solid ${backgroundColor}`,
    borderTop: `${borderWidth}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <div style={spinnerStyle}></div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}