import React from "react";

interface BottomToolsProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const BottomTools: React.FC<BottomToolsProps> = ({ children, style }) => {
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

export default BottomTools; 