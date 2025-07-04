"use client";
import React, { useRef, useState } from "react";
import AccountModal from "./AccountModal";
import MenuModal from "./MenuModal";
import HistoryModal from "./HistoryModal";

interface HeaderProps {
  style?: React.CSSProperties;
  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  style,
  isHistoryModalOpen,
  setIsHistoryModalOpen
}) => {
  const historyRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const accountRef = useRef<HTMLButtonElement>(null);

  // Modal state management (only for Account and Menu)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

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
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#090909",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 20px",
    gap: "12px",
  };

  const buttonStyle: React.CSSProperties = {
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
    /* Prevent text selection on mobile */
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    /* Prevent touch callout on iOS */
    WebkitTouchCallout: "none",
  };

  // Custom styles for header button tooltips (positioned below instead of above)
  const headerButtonStyle = `
    .header-container .top-tool-button::after {
      top: calc(100% + 6px) !important;
      bottom: auto !important;
    }
  `;

  const iconStyle: React.CSSProperties = {
    width: "20px",
    height: "20px",
    fill: "currentColor",
  };

  return (
    <>
      <style>{headerButtonStyle}</style>
      <header
        className="header-container w-[90%] lg:w-[45%]"
        style={{ ...containerStyle, ...style }}
      >
      {/* History Button */}
      <button
        ref={historyRef}
        className="top-tool-button"
        style={buttonStyle}
        onClick={() => setIsHistoryModalOpen(true)}
        data-tooltip="History"
        aria-label="History"
        onTouchStart={() => handleTouchStart(historyRef)}
        onTouchEnd={() => handleTouchEnd(historyRef)}
        onTouchCancel={() => handleTouchEnd(historyRef)}
      >
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
        </svg>
      </button>

      {/* Hamburger Menu Button */}
      <button
        ref={menuRef}
        className="top-tool-button"
        style={buttonStyle}
        onClick={() => setIsMenuModalOpen(true)}
        data-tooltip="Menu"
        aria-label="Menu"
        onTouchStart={() => handleTouchStart(menuRef)}
        onTouchEnd={() => handleTouchEnd(menuRef)}
        onTouchCancel={() => handleTouchEnd(menuRef)}
      >
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>

      {/* Account Button */}
      <button
        ref={accountRef}
        className="top-tool-button"
        style={buttonStyle}
        onClick={() => setIsAccountModalOpen(true)}
        data-tooltip="Account"
        aria-label="Account"
        onTouchStart={() => handleTouchStart(accountRef)}
        onTouchEnd={() => handleTouchEnd(accountRef)}
        onTouchCancel={() => handleTouchEnd(accountRef)}
      >
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
      </button>
      </header>

      {/* Modals */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </>
  );
};

export default Header;
