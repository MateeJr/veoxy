"use client";
import React, { useRef, useEffect, useState } from "react";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger fade in animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for fade out animation to complete before unmounting
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [isOpen]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleTouchStart = (ref: React.RefObject<HTMLButtonElement | null>) => {
    const button = ref.current;
    if (!button) return;

    // Clear any pending hide timeout
    const hideTimeoutId = button.dataset.hideTimeoutId;
    if (hideTimeoutId) {
      clearTimeout(parseInt(hideTimeoutId));
      delete button.dataset.hideTimeoutId;
    }

    // Add mobile tooltip class after 500ms (long press)
    const timeoutId = setTimeout(() => {
      button.classList.add('mobile-tooltip-active');
    }, 500);

    // Store timeout ID for cleanup
    button.dataset.timeoutId = timeoutId.toString();
  };

  const handleTouchEnd = (ref: React.RefObject<HTMLButtonElement | null>) => {
    const button = ref.current;
    if (!button) return;

    // Clear the show timeout if it hasn't triggered yet
    const showTimeoutId = button.dataset.timeoutId;
    if (showTimeoutId) {
    clearTimeout(parseInt(showTimeoutId));
      delete button.dataset.timeoutId;
    }

    // If tooltip is currently showing, delay hiding it by 1 second
    if (button.classList.contains('mobile-tooltip-active')) {
      const hideTimeoutId = setTimeout(() => {
        button.classList.remove('mobile-tooltip-active');
      }, 1000);

      // Store hide timeout ID for potential cleanup
      button.dataset.hideTimeoutId = hideTimeoutId.toString();
    }
  };

  if (!shouldRender) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: "88px", // Position below header (60px header + 20px padding + 8px gap)
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    pointerEvents: "none",
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "#090909",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "0 0 15px 15px",
    height: isVisible ? "calc(100vh - 88px - 135px - 32px)" : "0px", // Full height minus header space, TextBox height (135px), and TextBox padding (32px)
    color: "#ffffff",
    overflow: "hidden",
    transition: "height 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    pointerEvents: "auto",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 10px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "rgba(255, 255, 255, 0.6)",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
    position: "relative",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    WebkitTouchCallout: "none",
  };

  const iconStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
    fill: "currentColor",
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "1rem",
    overflow: "auto",
    padding: "20px",
    minHeight: "200px",
  };

  return (
    <div className="w-[90%] lg:w-[45%]" style={containerStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>History</h2>
          <button
            ref={closeButtonRef}
            className="top-tool-button"
            style={closeButtonStyle}
            onClick={onClose}
            data-tooltip="Close"
            aria-label="Close"
            onTouchStart={() => handleTouchStart(closeButtonRef)}
            onTouchEnd={() => handleTouchEnd(closeButtonRef)}
            onTouchCancel={() => handleTouchEnd(closeButtonRef)}
          >
            <svg style={iconStyle} viewBox="0 0 24 24">
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
        <div style={contentStyle}>
          {/* History content will go here */}
          Conversation history and past interactions
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
