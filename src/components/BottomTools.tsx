import React, { useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";

interface BottomToolsProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onDropdownStateChange?: (isOpen: boolean) => void;
  isDropdownOpen?: boolean;
}

const BottomTools: React.FC<BottomToolsProps> = ({ children, style, onDropdownStateChange, isDropdownOpen = false }) => {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedMode, setSelectedMode] = useState<"Chat" | "Agent">("Agent");
  const [localDropdownOpen, setLocalDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    const newState = !localDropdownOpen;
    setLocalDropdownOpen(newState);
    onDropdownStateChange?.(newState);
  };

  const selectMode = (mode: "Chat" | "Agent") => {
    setSelectedMode(mode);
    setLocalDropdownOpen(false);
    onDropdownStateChange?.(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLocalDropdownOpen(false);
        onDropdownStateChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onDropdownStateChange]);

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "4px 8px",
        alignItems: "center",
        ...style,
      }}
    >
      {/* Mode Selector Dropdown */}
      <div ref={dropdownRef} className="mode-selector-dropdown">
        <button
          className="mode-selector-button"
          onClick={toggleDropdown}
          aria-label={`Current mode: ${selectedMode}`}
        >
          {selectedMode === "Agent" ? (
            <HiSparkles size={12} />
          ) : (
            <IoChatbubbleOutline size={12} />
          )}
          <span className="mode-label">{selectedMode}</span>
          <MdKeyboardArrowDown
            size={12}
            style={{
              transform: localDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease'
            }}
          />
        </button>

        {localDropdownOpen && (
          <div className="mode-dropdown-menu">
            <button
              className={`mode-dropdown-item ${selectedMode === "Agent" ? "active" : ""}`}
              onClick={() => selectMode("Agent")}
            >
              <HiSparkles size={12} />
              <span>Agent</span>
            </button>
            <button
              className={`mode-dropdown-item ${selectedMode === "Chat" ? "active" : ""}`}
              onClick={() => selectMode("Chat")}
            >
              <IoChatbubbleOutline size={12} />
              <span>Chat</span>
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          filter: isDropdownOpen ? "blur(2px)" : "none",
          transition: "filter 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flex: 1,
        }}
      >
        {children}
      </div>

      <button
        ref={sendButtonRef}
        className="send-button"
        data-tooltip="Send"
        aria-label="Send"
        onTouchStart={() => handleTouchStart(sendButtonRef)}
        onTouchEnd={() => handleTouchEnd(sendButtonRef)}
        onTouchCancel={() => handleTouchEnd(sendButtonRef)}
        style={{
          filter: isDropdownOpen ? "blur(2px)" : "none",
          transition: "filter 0.2s ease",
        }}
      >
        <RiSendPlaneFill size={15} />
      </button>
    </div>
  );
};

export default BottomTools; 