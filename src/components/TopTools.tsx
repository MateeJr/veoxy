import React, { useRef } from "react";
import { MdOutlineAddPhotoAlternate, MdOutlineEditNote } from "react-icons/md";

interface TopToolsProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onImagesSelected?: (files: FileList) => void;
}

const TopTools: React.FC<TopToolsProps> = ({ children, style, onImagesSelected }) => {
  const addImagesRef = useRef<HTMLButtonElement>(null);
  const instructRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAddImagesClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onImagesSelected) {
      onImagesSelected(files);
    }
    // Reset the input value to allow selecting the same files again
    event.target.value = '';
  };

  return (
    <div
      className="top-tools-container"
      style={{
        display: "flex",
        gap: 8,
        padding: "4px 8px",
        alignItems: "center",
        ...style,
      }}
    >
      <button
        ref={addImagesRef}
        className="top-tool-button"
        data-tooltip="Add Images"
        aria-label="Add Images"
        onClick={handleAddImagesClick}
        onTouchStart={() => handleTouchStart(addImagesRef)}
        onTouchEnd={() => handleTouchEnd(addImagesRef)}
        onTouchCancel={() => handleTouchEnd(addImagesRef)}
      >
        <MdOutlineAddPhotoAlternate size={12} />
        <span className="btn-label">Add Images</span>
      </button>

      <button
        ref={instructRef}
        className="top-tool-button"
        data-tooltip="Instruct"
        aria-label="Instruct"
        disabled
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        onTouchStart={() => handleTouchStart(instructRef)}
        onTouchEnd={() => handleTouchEnd(instructRef)}
        onTouchCancel={() => handleTouchEnd(instructRef)}
      >
        <MdOutlineEditNote size={12} />
        <span className="btn-label">Instruct</span>
      </button>
      {children}

      {/* Hidden file input for image selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default TopTools; 