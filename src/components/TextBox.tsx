"use client";
import React, { TextareaHTMLAttributes } from "react";
import TopTools from "./TopTools";
import BottomTools from "./BottomTools";

interface TextBoxProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  style,
  placeholder = "Ask anything...",
  ...rest
}) => {
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

  return (
    <>
      <div
        className="text-box-container w-[90%] lg:w-[45%]"
        style={{ ...containerStyle, ...style }}
      >
        <TopTools style={{ flex: "0 0 20%", height: "20%" }} />
        <textarea
          placeholder={placeholder}
          {...rest}
          style={{ ...textareaStyle, flex: "0 0 50%" }}
        />
        <BottomTools style={{ flex: "0 0 30%", height: "30%" }} />
      </div>
    </>
  );
};

export default TextBox; 