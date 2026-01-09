import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useMathContext } from '../MathProvider/MathProvider';
import {
  defaultLeftSection,
  defaultMiddleSection,
  defaultRightSection,
  abcKeyboardRows,
  functionCategories,
  getUppercaseAbcKeyboard,
} from './keyboardData';
import type { ButtonConfig, FunctionCategory } from '../../types';
import './MathKeyboard.css';

/**
 * Props for the MathKeyboard component
 */
export interface MathKeyboardProps {
  /** Whether the keyboard is initially visible */
  defaultVisible?: boolean;
  /** Callback fired when keyboard visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Keyboard modes
 */
type KeyboardMode = 'default' | 'abc';

/**
 * MathKeyboard - A Desmos-style on-screen keyboard for math input
 *
 * @component
 * @example
 * ```tsx
 * <MathKeyboard defaultVisible={true} />
 * ```
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  defaultVisible = false,
  onVisibilityChange,
  className = '',
  style,
}) => {
  // State
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [keyboardMode, setKeyboardMode] = useState<KeyboardMode>('default');
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isFunctionsOpen, setIsFunctionsOpen] = useState(false);
  // Mode for next character: 'normal', 'subscript', or 'superscript'
  const [nextCharMode, setNextCharMode] = useState<'normal' | 'subscript' | 'superscript'>('normal');

  // Refs
  const keyboardRef = useRef<HTMLDivElement>(null);
  const functionsRef = useRef<HTMLDivElement>(null);

  // Get context
  const mathContext = useMathContext();

  /**
   * Toggle keyboard visibility
   */
  const toggleKeyboard = useCallback(() => {
    setIsVisible((prev) => {
      const newValue = !prev;
      onVisibilityChange?.(newValue);
      if (!newValue) {
        setIsFunctionsOpen(false);
      }
      return newValue;
    });
  }, [onVisibilityChange]);

  /**
   * Handle button click
   */
  const handleButtonClick = useCallback(
    (button: ButtonConfig) => {
      // Handle dual-character buttons
      if (button.dualChar) {
        const { primaryLatex, secondaryLatex } = button.dualChar;
        const activeLatex = isShiftActive ? secondaryLatex : primaryLatex;

        // Handle SUBSCRIPT/SUPERSCRIPT actions
        if (activeLatex === 'SUBSCRIPT') {
          setNextCharMode('subscript');
          return;
        }
        if (activeLatex === 'SUPERSCRIPT') {
          setNextCharMode('superscript');
          return;
        }

        // Handle subscript/superscript mode for dual-char buttons
        if (nextCharMode !== 'normal') {
          const wrapper = nextCharMode === 'subscript' ? `_{${activeLatex}}` : `^{${activeLatex}}`;
          mathContext?.insertAtCursor(wrapper);
          setNextCharMode('normal');
          return;
        }

        // Insert the active character's LaTeX
        if (mathContext) {
          mathContext.insertAtCursor(activeLatex);
        }
        return;
      }

      // Handle special actions
      switch (button.latex) {
        case 'ABC_MODE':
          setKeyboardMode('abc');
          setIsFunctionsOpen(false);
          return;
        case '123_MODE':
          setKeyboardMode('default');
          setIsShiftActive(false);
          setNextCharMode('normal');
          return;
        case 'SHIFT':
          setIsShiftActive((prev) => !prev);
          return;
        case 'SUBSCRIPT':
          setNextCharMode('subscript');
          return;
        case 'SUPERSCRIPT':
          setNextCharMode('superscript');
          return;
        case 'FUNCTIONS':
          setIsFunctionsOpen((prev) => !prev);
          return;
        case 'SPEAK':
          // No functionality, just for show
          return;
        case 'ARROW_LEFT':
          // Dispatch left arrow key event to the active input
          document.activeElement?.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
          );
          return;
        case 'ARROW_RIGHT':
          // Dispatch right arrow key event to the active input
          document.activeElement?.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
          );
          return;
        case 'BACKSPACE':
          // Dispatch backspace key event to the active input (same as hardware)
          document.activeElement?.dispatchEvent(
            new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true })
          );
          return;
        case 'ENTER':
          // Blur the active input (unfocus)
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          return;
        default:
          break;
      }

      // Handle subscript/superscript mode for the next character
      if (nextCharMode !== 'normal' && (button.type === 'letter' || button.type === 'variable')) {
        const wrapper = nextCharMode === 'subscript' ? `_{${button.latex}}` : `^{${button.latex}}`;
        mathContext?.insertAtCursor(wrapper);
        setNextCharMode('normal');
        // Reset shift after typing
        if (isShiftActive) {
          setIsShiftActive(false);
        }
        return;
      }

      // Insert LaTeX at cursor
      if (mathContext) {
        mathContext.insertAtCursor(button.latex);
      }

      // Reset shift after typing a letter
      if (button.type === 'letter' && isShiftActive) {
        setIsShiftActive(false);
      }
    },
    [mathContext, isShiftActive, nextCharMode]
  );

  /**
   * Handle function button click
   * Clicking a function closes only the functions panel, not the keyboard
   */
  const handleFunctionClick = useCallback(
    (latex: string) => {
      if (mathContext) {
        mathContext.insertAtCursor(latex);
      }
      // Close only the functions panel, keyboard stays open
      setIsFunctionsOpen(false);
    },
    [mathContext]
  );

  /**
   * Handle click outside to close keyboard
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isVisible) return;

      const target = event.target as HTMLElement;

      // Check if click is inside keyboard
      if (keyboardRef.current?.contains(target)) return;

      // Check if click is on a math input
      if (target.closest('.mathex-input')) return;

      // Close keyboard
      setIsVisible(false);
      setIsFunctionsOpen(false);
      onVisibilityChange?.(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onVisibilityChange]);

  /**
   * Render a single button
   */
  const renderButton = (button: ButtonConfig, index: number) => {
    const buttonClasses = [
      'dcg-keypad-btn-container',
      button.size === 'wide' && 'dcg-wide',
      button.size === 'extra-wide' && 'dcg-extra-wide',
    ]
      .filter(Boolean)
      .join(' ');

    const innerClasses = [
      'dcg-keypad-btn',
      button.style === 'blue' && 'dcg-btn-blue',
      button.style === 'gray-light' && 'dcg-btn-light-gray',
      button.style === 'white' && 'dcg-btn-white',
      button.latex === 'SHIFT' && isShiftActive && 'dcg-active',
      button.latex === 'SUBSCRIPT' && nextCharMode === 'subscript' && 'dcg-active',
      button.latex === 'SUPERSCRIPT' && nextCharMode === 'superscript' && 'dcg-active',
    ]
      .filter(Boolean)
      .join(' ');

    // Render dual-character buttons with blur/emphasis styling
    if (button.dualChar) {
      const { primary, secondary } = button.dualChar;
      return (
        <div key={index} className={buttonClasses}>
          <button
            className={innerClasses}
            onClick={() => handleButtonClick(button)}
            onMouseDown={(e) => e.preventDefault()}
            type="button"
          >
            <span className="dcg-keypad-btn-content dcg-dual-char">
              <span className={`dcg-dual-primary ${isShiftActive ? 'dcg-blurred' : 'dcg-clear'}`}>
                {primary}
              </span>
              <span className={`dcg-dual-secondary ${isShiftActive ? 'dcg-clear' : 'dcg-blurred'}`}>
                {secondary}
              </span>
            </span>
          </button>
        </div>
      );
    }

    return (
      <div key={index} className={buttonClasses}>
        <button
          className={innerClasses}
          onClick={() => handleButtonClick(button)}
          onMouseDown={(e) => e.preventDefault()}
          type="button"
        >
          <span className="dcg-keypad-btn-content">{button.display}</span>
        </button>
      </div>
    );
  };

  /**
   * Render default keyboard (numbers + variables)
   */
  const renderDefaultKeyboard = () => (
    <div className="dcg-basic-keypad dcg-default-mode">
      <div className="dcg-audio-keypad-container">
        {/* Left section */}
        <div className="dcg-audio-keypad-column dcg-left-section">
          {defaultLeftSection.map((row, rowIndex) => (
            <div key={rowIndex} className="dcg-keypad-row">
              {row.map((button, btnIndex) => renderButton(button, btnIndex))}
            </div>
          ))}
        </div>

        {/* Middle section (number pad) */}
        <div className="dcg-audio-keypad-column dcg-middle-section">
          {defaultMiddleSection.map((row, rowIndex) => (
            <div key={rowIndex} className="dcg-keypad-row">
              {row.map((button, btnIndex) => renderButton(button, btnIndex))}
            </div>
          ))}
        </div>

        {/* Right section (functions, navigation) */}
        <div className="dcg-audio-keypad-column dcg-right-section">
          {defaultRightSection.map((row, rowIndex) => (
            <div key={rowIndex} className="dcg-keypad-row">
              {row.map((button, btnIndex) => renderButton(button, btnIndex))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /**
   * Render ABC keyboard
   */
  const renderAbcKeyboard = () => {
    const rows = isShiftActive ? getUppercaseAbcKeyboard() : abcKeyboardRows;

    return (
      <div className="dcg-basic-keypad dcg-abc-mode">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`dcg-keypad-row dcg-abc-row-${rowIndex}`}>
            {row.map((button, btnIndex) => renderButton(button, btnIndex))}
          </div>
        ))}
      </div>
    );
  };

  /**
   * Render functions panel
   */
  const renderFunctionsPanel = () => (
    <div
      ref={functionsRef}
      className={`dcg-functions-popover ${isFunctionsOpen ? 'dcg-visible' : ''}`}
    >
      <div className="dcg-popover-interior">
        {functionCategories.map((category: FunctionCategory) => (
          <div key={category.id} className="dcg-keypad-keys-section">
            <div className="dcg-section-heading">{category.name}</div>
            <div className="dcg-keypad-keys-buttons">
              {category.functions.map((func, index) => (
                <div key={index} className="dcg-keypad-btn-container dcg-function-btn">
                  <button
                    className="dcg-keypad-btn dcg-btn-white"
                    onClick={() => handleFunctionClick(func.latex)}
                    onMouseDown={(e) => e.preventDefault()}
                    title={func.description}
                    type="button"
                  >
                    <span className="dcg-keypad-btn-content">{func.display}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Render toggle button (when keyboard is hidden)
   */
  const renderToggleButton = () => (
    <div className="dcg-show-keypad-container">
      <button
        className="dcg-show-keypad dcg-btn-light-gray"
        onClick={toggleKeyboard}
        type="button"
        aria-label={isVisible ? 'Hide keyboard' : 'Show keyboard'}
      >
        <span className="dcg-icon-keyboard">⌨</span>
        <span className={`dcg-icon-caret ${isVisible ? 'dcg-icon-caret-down' : 'dcg-icon-caret-up'}`}>
          {isVisible ? '▼' : '▲'}
        </span>
      </button>
    </div>
  );

  /**
   * Render minimize button (when keyboard is visible)
   */
  const renderMinimizeButton = () => (
    <div className="dcg-minimize-keypad-container">
      <button
        className="dcg-minimize-keypad dcg-btn-light-gray"
        onClick={toggleKeyboard}
        type="button"
        aria-label="Hide keyboard"
      >
        <span className="dcg-icon-keyboard">⌨</span>
        <span className="dcg-icon-caret dcg-icon-caret-down">▼</span>
      </button>
    </div>
  );

  return (
    <div
      ref={keyboardRef}
      className={`dcg-keypad ${isVisible ? 'dcg-visible' : 'dcg-hidden'} ${className}`}
      style={style}
    >
      {/* Toggle button - always visible at bottom-left when keyboard is hidden */}
      {!isVisible && renderToggleButton()}

      {/* Main keyboard container */}
      {isVisible && (
        <div className="dcg-keys-container">
          {/* Minimize button */}
          {renderMinimizeButton()}

          {/* Keys background */}
          <div className="dcg-keys-background">
            <div className="dcg-keys">
              {/* Render current keyboard mode */}
              {keyboardMode === 'default' ? renderDefaultKeyboard() : renderAbcKeyboard()}
            </div>
          </div>

          {/* Functions panel */}
          {renderFunctionsPanel()}
        </div>
      )}
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
