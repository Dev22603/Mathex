import React, { useState, useCallback } from 'react';
import type { ButtonConfig } from '../../types';
import { getKeyboardLayout } from './keyboardConfig';
import './MathKeyboard.css';

/**
 * Props for the MathKeyboard component
 */
export interface MathKeyboardProps {
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether keyboard is visible by default */
  defaultVisible?: boolean;
  /** Callback when a button is clicked */
  onButtonClick?: (latex: string, buttonType: string) => void;
  /** Callback when keyboard visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * MathKeyboard - A virtual keyboard for inserting mathematical symbols
 * Exact Desmos design
 *
 * @component
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  className = '',
  style,
  defaultVisible = true,
  onButtonClick,
  onVisibilityChange,
}) => {
  // State
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [currentMode, setCurrentMode] = useState<'numbers' | 'abc'>('numbers');
  const [isShiftActive, setIsShiftActive] = useState(false);

  // Get current keyboard layout
  const layout = getKeyboardLayout(currentMode);

  /**
   * Toggle keyboard visibility
   */
  const toggleVisibility = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    onVisibilityChange?.(newVisibility);
  }, [isVisible, onVisibilityChange]);

  /**
   * Handle button click
   */
  const handleButtonClick = useCallback(
    (button: ButtonConfig) => {
      const { latex, type } = button;

      // Handle special action buttons
      if (type === 'action') {
        switch (latex) {
          case 'BACKSPACE':
            onButtonClick?.('BACKSPACE', type);
            return;

          case 'MODE_NUMBERS':
            setCurrentMode('numbers');
            return;

          case 'MODE_ABC':
            setCurrentMode('abc');
            return;

          case 'SHIFT':
            setIsShiftActive((prev) => !prev);
            return;

          case 'ENTER':
            // Just close keyboard or trigger callback
            onButtonClick?.('ENTER', type);
            return;

          default:
            return;
        }
      }

      // Apply shift transformation for letters
      let finalLatex = latex;
      if (type === 'symbol' && isShiftActive && /^[a-z]$/.test(latex)) {
        finalLatex = latex.toUpperCase();
        setIsShiftActive(false); // Reset shift after use
      }

      // Trigger callback
      onButtonClick?.(finalLatex, type);
    },
    [isShiftActive, onButtonClick]
  );

  return (
    <div className={`mathex-keyboard-wrapper ${className}`} style={style}>
      {/* Toggle button - Desmos style (bottom-left) */}
      <button
        className={`mathex-kb-toggle ${isVisible ? 'open' : ''}`}
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide keyboard' : 'Show keyboard'}
      >
        <span className="kb-icon">⌨</span>
        <span className="kb-arrow">{isVisible ? '▲' : '▼'}</span>
      </button>

      {/* Keyboard panel */}
      {isVisible && (
        <div className="mathex-keyboard">
          {/* Button grid */}
          <div className="mathex-kb-grid">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="mathex-kb-row">
                {row.map((button, buttonIndex) => {
                  // Apply shift transformation for display
                  let displayText = button.display;
                  if (
                    button.type === 'symbol' &&
                    isShiftActive &&
                    /^[a-z]$/.test(button.display)
                  ) {
                    displayText = button.display.toUpperCase();
                  }

                  // Special handling for mode switch button
                  const isModeSwitch = button.latex === 'MODE_NUMBERS' || button.latex === 'MODE_ABC';
                  const isEnterButton = button.latex === 'ENTER';
                  const isActionButton = button.type === 'action';

                  return (
                    <button
                      key={`${rowIndex}-${buttonIndex}`}
                      className={`mathex-kb-btn ${
                        isActionButton && !isEnterButton ? 'action' : ''
                      } ${isEnterButton ? 'enter' : ''} ${
                        isShiftActive && button.latex === 'SHIFT' ? 'active' : ''
                      } ${isModeSwitch ? 'mode-switch' : ''}`}
                      onClick={() => handleButtonClick(button)}
                      title={button.description}
                    >
                      {displayText}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ABC/123 mode toggle (if in ABC mode, show 123 button; if in numbers mode, show ABC button) */}
          {currentMode === 'numbers' && (
            <button
              className="mathex-mode-toggle-btn"
              onClick={() => setCurrentMode('abc')}
            >
              ABC
            </button>
          )}
        </div>
      )}
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
