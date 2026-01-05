import React, { useState, useCallback } from 'react';
import type { ButtonConfig } from '../../types';
import { getKeyboardLayout } from './keyboardConfig';
import './MathKeyboard.css';

/**
 * Props for the MathKeyboard component
 */
export interface MathKeyboardProps {
  /** Keyboard mode (basic, calculus, abc) */
  mode?: 'basic' | 'calculus' | 'abc';
  /** Positioning style for the keyboard */
  position?: 'fixed-bottom' | 'floating';
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether keyboard is visible by default */
  defaultVisible?: boolean;
  /** Whether to show the toggle button */
  showToggleButton?: boolean;
  /** Callback when a button is clicked */
  onButtonClick?: (latex: string, buttonType: string) => void;
  /** Callback when keyboard visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * MathKeyboard - A virtual keyboard for inserting mathematical symbols
 *
 * Provides a touch/click interface for inserting LaTeX symbols and functions
 * into the currently focused MathInput component.
 *
 * @component
 * @example
 * ```tsx
 * <MathKeyboard
 *   mode="basic"
 *   position="fixed-bottom"
 *   defaultVisible={true}
 * />
 * ```
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  mode: initialMode = 'basic',
  position = 'fixed-bottom',
  className = '',
  style,
  defaultVisible = true,
  showToggleButton = true,
  onButtonClick,
  onVisibilityChange,
}) => {
  // State
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [currentMode, setCurrentMode] = useState<'basic' | 'calculus' | 'abc'>(initialMode);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [showFunctionsPanel, setShowFunctionsPanel] = useState(false);

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
            // Will be handled by MathProvider
            onButtonClick?.('BACKSPACE', type);
            return;

          case 'MODE_SWITCH':
            // Toggle between ABC and numeric modes
            setCurrentMode((prev) => (prev === 'abc' ? 'basic' : 'abc'));
            return;

          case 'SHIFT':
            // Toggle uppercase
            setIsShiftActive((prev) => !prev);
            return;

          case 'SUBSCRIPT':
            // Insert subscript syntax
            onButtonClick?.('_{}', 'operator');
            return;

          case 'ENTER':
            // Close keyboard
            setIsVisible(false);
            onVisibilityChange?.(false);
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
    [isShiftActive, onButtonClick, onVisibilityChange]
  );

  /**
   * Toggle functions panel
   */
  const toggleFunctionsPanel = useCallback(() => {
    setShowFunctionsPanel((prev) => !prev);
  }, []);

  /**
   * Switch keyboard mode
   */
  const switchMode = useCallback((newMode: 'basic' | 'calculus' | 'abc') => {
    setCurrentMode(newMode);
  }, []);

  return (
    <div className={`mathex-keyboard-container ${className}`} style={style}>
      {/* Toggle button (keyboard icon) */}
      {showToggleButton && (
        <button
          className={`mathex-keyboard-toggle ${isVisible ? 'active' : ''}`}
          onClick={toggleVisibility}
          aria-label={isVisible ? 'Hide keyboard' : 'Show keyboard'}
          title={isVisible ? 'Hide keyboard' : 'Show keyboard'}
        >
          <span className="keyboard-icon">⌨</span>
          <span className="toggle-arrow">{isVisible ? '▼' : '▲'}</span>
        </button>
      )}

      {/* Keyboard panel */}
      {isVisible && (
        <div
          className={`mathex-keyboard ${
            position === 'fixed-bottom' ? 'mathex-keyboard--fixed' : ''
          }`}
        >
          {/* Mode selector tabs */}
          <div className="mathex-keyboard-modes">
            <button
              className={`mode-tab ${currentMode === 'basic' ? 'active' : ''}`}
              onClick={() => switchMode('basic')}
            >
              Basic
            </button>
            <button
              className={`mode-tab ${currentMode === 'calculus' ? 'active' : ''}`}
              onClick={() => switchMode('calculus')}
            >
              Calculus
            </button>
            <button
              className={`mode-tab ${currentMode === 'abc' ? 'active' : ''}`}
              onClick={() => switchMode('abc')}
            >
              ABC
            </button>
          </div>

          {/* Button grid */}
          <div className="mathex-keyboard-grid">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="mathex-keyboard-row">
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

                  return (
                    <button
                      key={`${rowIndex}-${buttonIndex}`}
                      className={`mathex-keyboard-button mathex-button--${button.type} ${
                        isShiftActive && button.latex === 'SHIFT' ? 'active' : ''
                      }`}
                      onClick={() => handleButtonClick(button)}
                      title={button.description}
                      data-latex={button.latex}
                    >
                      {displayText}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Functions panel toggle */}
          <div className="mathex-keyboard-footer">
            <button
              className={`functions-toggle ${showFunctionsPanel ? 'active' : ''}`}
              onClick={toggleFunctionsPanel}
            >
              <span>ƒ</span> Functions {showFunctionsPanel ? '▼' : '▶'}
            </button>
          </div>

          {/* Functions panel (Phase 5 - will be implemented later) */}
          {showFunctionsPanel && (
            <div className="mathex-functions-panel">
              <p className="functions-placeholder">
                Function categories (Trig, Calculus, etc.) will be added in Phase 5
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
