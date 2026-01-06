import React, { useState, useCallback } from 'react';
import type { ButtonConfig } from '../../types';
import { getKeyboardLayout, type NumbersModeLayout } from './keyboardConfig';
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
 * Pixel-perfect Desmos design with 4-section numbers layout
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
            onButtonClick?.('ENTER', type);
            return;

          case 'FUNCTIONS':
            setShowFunctionsPanel((prev) => !prev);
            return;

          case 'ARROW_LEFT':
            onButtonClick?.('ARROW_LEFT', type);
            return;

          case 'ARROW_RIGHT':
            onButtonClick?.('ARROW_RIGHT', type);
            return;

          case 'AUDIO':
            // Audio feature - not implemented yet
            return;

          default:
            return;
        }
      }

      // Apply shift transformation for letters
      let finalLatex = latex;
      if (
        (type === 'letter' || type === 'symbol') &&
        isShiftActive &&
        /^[a-z]$/.test(latex)
      ) {
        finalLatex = latex.toUpperCase();
        setIsShiftActive(false); // Reset shift after use
      }

      // Trigger callback
      onButtonClick?.(finalLatex, type);
    },
    [isShiftActive, onButtonClick]
  );

  /**
   * Render a single button
   */
  const renderButton = useCallback(
    (button: ButtonConfig, key: string) => {
      // Apply shift transformation for display
      let displayText = button.display;
      if (
        (button.type === 'letter' || button.type === 'symbol') &&
        isShiftActive &&
        /^[a-z]$/.test(button.display)
      ) {
        displayText = button.display.toUpperCase();
      }

      // Build class names
      const classNames = [
        'mathex-kb-btn',
        button.style ? `style-${button.style}` : 'style-white',
        button.size ? `size-${button.size}` : 'size-standard',
        button.type,
      ];

      // Special states
      if (button.latex === 'ENTER') classNames.push('enter');
      if (button.latex === 'SHIFT' && isShiftActive) classNames.push('active');
      if (button.latex === 'FUNCTIONS' && showFunctionsPanel) classNames.push('active');

      return (
        <button
          key={key}
          className={classNames.join(' ')}
          onClick={() => handleButtonClick(button)}
          title={button.description}
        >
          {displayText}
        </button>
      );
    },
    [isShiftActive, showFunctionsPanel, handleButtonClick]
  );

  /**
   * Check if layout is Numbers Mode (4-section) or ABC mode (simple rows)
   */
  const isNumbersMode = (
    layout: ButtonConfig[][] | NumbersModeLayout
  ): layout is NumbersModeLayout => {
    return 'variables' in layout;
  };

  /**
   * Render Numbers Mode - 4 Section Layout
   */
  const renderNumbersMode = (layout: NumbersModeLayout) => {
    return (
      <div className="mathex-kb-numbers-grid">
        {/* Variables Section */}
        <div className="mathex-kb-section variables-section">
          {layout.variables.map((row, rowIdx) => (
            <div key={`var-row-${rowIdx}`} className="mathex-kb-row">
              {row.map((button, btnIdx) =>
                renderButton(button, `var-${rowIdx}-${btnIdx}`)
              )}
            </div>
          ))}
        </div>

        {/* Numbers Section */}
        <div className="mathex-kb-section numbers-section">
          {layout.numbers.map((row, rowIdx) => (
            <div key={`num-row-${rowIdx}`} className="mathex-kb-row">
              {row.map((button, btnIdx) =>
                renderButton(button, `num-${rowIdx}-${btnIdx}`)
              )}
            </div>
          ))}
        </div>

        {/* Operators Section */}
        <div className="mathex-kb-section operators-section">
          {layout.operators.map((button, idx) =>
            renderButton(button, `op-${idx}`)
          )}
        </div>

        {/* Actions Section */}
        <div className="mathex-kb-section actions-section">
          {layout.actions.map((row, rowIdx) => (
            <div key={`act-row-${rowIdx}`} className="mathex-kb-row">
              {row.map((button, btnIdx) =>
                renderButton(button, `act-${rowIdx}-${btnIdx}`)
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Render ABC Mode - Simple QWERTY Rows
   */
  const renderABCMode = (layout: ButtonConfig[][]) => {
    return (
      <div className="mathex-kb-abc-grid">
        {layout.map((row, rowIdx) => (
          <div key={`abc-row-${rowIdx}`} className="mathex-kb-row">
            {row.map((button, btnIdx) =>
              renderButton(button, `abc-${rowIdx}-${btnIdx}`)
            )}
          </div>
        ))}
      </div>
    );
  };

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
          {/* Render layout based on mode */}
          {isNumbersMode(layout)
            ? renderNumbersMode(layout)
            : renderABCMode(layout)}

          {/* Functions panel (collapsible) */}
          {showFunctionsPanel && (
            <div className="mathex-functions-panel">
              <div className="functions-placeholder">
                Functions panel - To be implemented in Phase 5
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
