import React from "react";

interface TopToolsProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const TopTools: React.FC<TopToolsProps> = ({ children, style }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "4px 8px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default TopTools; 