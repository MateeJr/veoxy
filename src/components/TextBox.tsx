"use client";
import React, { TextareaHTMLAttributes, useState } from "react";
import TopTools from "./TopTools";
import BottomTools from "./BottomTools";

interface TextBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  isHistoryModalOpen?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  style,
  placeholder = "Ask anything...",
  isHistoryModalOpen = false,
  ...rest
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#090909",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    height: "135px",
    display: "flex",
    flexDirection: "column",
  };

  const textareaStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    boxShadow: "none",
    color: "#ffffff",
    padding: "8px 12px",
    fontSize: "1rem",
    width: "100%",
    height: "100%",
    resize: "none",
  };

  const shouldBlur = isDropdownOpen || isHistoryModalOpen;

  return (
    <>
      <div
        className="text-box-container w-[90%] lg:w-[45%]"
        style={{
          ...containerStyle,
          ...style,
          filter: shouldBlur ? "blur(2px)" : "none",
          transition: "filter 0.2s ease",
        }}
      >
        <TopTools
          style={{
            margin: "6px 0 0 6px",
            flex: "none",
          }}
        />
        <textarea
          placeholder={placeholder}
          {...rest}
          style={{
            ...textareaStyle,
            flex: 1,
          }}
        />
        <BottomTools
          style={{ flex: "0 0 30%", height: "30%" }}
          onDropdownStateChange={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
    </>
  );
};

export default TextBox; 