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

// Debug logging helper
const DEBUG = false;
const log = (component: string, action: string, data?: any) => {
  if (DEBUG) {
    console.log(`[${component}] ${action}`, data !== undefined ? data : '');
  }
};

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

  // Refs
  const keyboardRef = useRef<HTMLDivElement>(null);
  const functionsRef = useRef<HTMLDivElement>(null);

  // Get context
  const mathContext = useMathContext();
  log('MathKeyboard', 'context retrieved', { mathContext, hasContext: !!mathContext });

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
      log('MathKeyboard', 'handleButtonClick', {
        latex: button.latex,
        type: button.type,
        activeInputId: mathContext?.activeInputId,
        hasMathContext: !!mathContext
      });

      // Handle dual-character buttons
      if (button.dualChar) {
        const { primaryLatex, secondaryLatex } = button.dualChar;
        const activeLatex = isShiftActive ? secondaryLatex : primaryLatex;
        log('MathKeyboard', 'dual-char button', { primaryLatex, secondaryLatex, activeLatex, isShiftActive });

        // Handle SUBSCRIPT/SUPERSCRIPT actions
        if (activeLatex === 'SUBSCRIPT') {
          if (mathContext) {
            mathContext.insertAtCursor('SUBSCRIPT_BLOCK');
          }
          return;
        }
        if (activeLatex === 'SUPERSCRIPT') {
          if (mathContext) {
            mathContext.insertAtCursor('SUPERSCRIPT_BLOCK');
          }
          return;
        }

        // Insert the active character's LaTeX
        if (mathContext) {
          log('MathKeyboard', 'inserting activeLatex via context', { activeLatex });
          mathContext.insertAtCursor(activeLatex);
        } else {
          log('MathKeyboard', 'WARNING: No mathContext for dual-char insertion');
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
          return;
        case 'SHIFT':
          setIsShiftActive((prev) => !prev);
          return;
        case 'SUBSCRIPT':
          // Insert subscript block and position cursor inside it
          if (mathContext) {
            mathContext.insertAtCursor('SUBSCRIPT_BLOCK');
          }
          return;
        case 'SUPERSCRIPT':
          // Insert superscript block and position cursor inside it
          if (mathContext) {
            mathContext.insertAtCursor('SUPERSCRIPT_BLOCK');
          }
          return;
        case 'FUNCTIONS':
          setIsFunctionsOpen((prev) => !prev);
          return;
        case 'SPEAK':
          // No functionality, just for show
          return;
        case 'ARROW_LEFT':
          // Use context to send arrow left command to active input
          log('MathKeyboard', 'ARROW_LEFT - sending via context');
          if (mathContext) {
            mathContext.insertAtCursor('ARROW_LEFT');
          }
          return;
        case 'ARROW_RIGHT':
          // Use context to send arrow right command to active input
          log('MathKeyboard', 'ARROW_RIGHT - sending via context');
          if (mathContext) {
            mathContext.insertAtCursor('ARROW_RIGHT');
          }
          return;
        case 'BACKSPACE':
          // Use context to send backspace command to active input
          log('MathKeyboard', 'BACKSPACE - sending via context');
          if (mathContext) {
            mathContext.insertAtCursor('BACKSPACE');
          }
          return;
        case 'ENTER':
          // Blur the active input (unfocus) - this is handled specially
          log('MathKeyboard', 'ENTER - sending blur command');
          if (mathContext) {
            mathContext.insertAtCursor('ENTER');
          }
          return;
        default:
          break;
      }

      // Insert LaTeX at cursor
      if (mathContext) {
        log('MathKeyboard', 'inserting standard latex via context', { latex: button.latex });
        mathContext.insertAtCursor(button.latex);
      } else {
        log('MathKeyboard', 'WARNING: No mathContext for standard insertion', { latex: button.latex });
      }

      // Reset shift after typing a letter
      if (button.type === 'letter' && isShiftActive) {
        setIsShiftActive(false);
      }
    },
    [mathContext, isShiftActive]
  );

  /**
   * Handle function button click
   * Clicking a function closes only the functions panel, not the keyboard
   */
  const handleFunctionClick = useCallback(
    (latex: string) => {
      log('MathKeyboard', 'handleFunctionClick', {
        latex,
        activeInputId: mathContext?.activeInputId,
        hasMathContext: !!mathContext
      });
      if (mathContext) {
        mathContext.insertAtCursor(latex);
      } else {
        log('MathKeyboard', 'WARNING: No mathContext for function insertion');
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
   * Prevent focus stealing - CRITICAL for keyboard to work properly
   * This prevents the button click from moving focus away from the MathInput
   */
  const preventFocusLoss = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    log('MathKeyboard', 'preventFocusLoss - mousedown prevented');
  }, []);

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
            onMouseDown={preventFocusLoss}
            onTouchStart={preventFocusLoss as any}
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
          onMouseDown={preventFocusLoss}
          onTouchStart={preventFocusLoss as any}
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
                    onMouseDown={preventFocusLoss}
                    onTouchStart={preventFocusLoss as any}
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
