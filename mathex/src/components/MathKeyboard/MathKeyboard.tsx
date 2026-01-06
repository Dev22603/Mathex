import React, { useState, useCallback, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMathContext } from '../MathProvider/MathProvider';
import { MAIN_KEYBOARD_LAYOUT, ABC_KEYBOARD_LAYOUT, type KeyboardButton } from './keyboardConfig';
import { FUNCTION_CATEGORIES, type FunctionCategory, type FunctionButton } from './functionCategories';
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
  /** Callback when keyboard visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * MathKeyboard - Visual on-screen keyboard for math input
 *
 * Exact replica of Desmos keyboard with:
 * - Main keyboard (123 mode) and ABC (letter) mode
 * - Slide-out functions panel with all 13 categories
 * - Fixed positioning at bottom of viewport
 * - Pixel-perfect Desmos styling
 *
 * @component
 * @example
 * ```tsx
 * <MathKeyboard defaultVisible={true} />
 * ```
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  className = '',
  style,
  defaultVisible = false,
  onVisibilityChange,
}) => {
  // Get context
  const mathContext = useMathContext();

  // State
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isABCMode, setIsABCMode] = useState(false); // false = 123 mode, true = ABC mode
  const [isFunctionsPanelOpen, setIsFunctionsPanelOpen] = useState(false);
  const [isShiftActive, setIsShiftActive] = useState(false); // For uppercase in ABC mode

  // Refs
  const functionsPanelRef = useRef<HTMLDivElement>(null);
  const functionsButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Render LaTeX to HTML for button display
   */
  const renderLatexButton = useCallback((latex: string): string => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
        output: 'html',
        strict: false,
      });
    } catch {
      return latex; // Fallback to raw text
    }
  }, []);

  /**
   * Handle button click
   */
  const handleButtonClick = useCallback((button: KeyboardButton) => {
    if (button.isSpacer) return;

    // Handle special commands
    if (button.command) {
      switch (button.command) {
        case 'TOGGLE_ABC':
          setIsABCMode(true);
          setIsFunctionsPanelOpen(false);
          break;
        case 'TOGGLE_123':
          setIsABCMode(false);
          setIsFunctionsPanelOpen(false);
          break;
        case 'SHIFT':
          setIsShiftActive(!isShiftActive);
          break;
        case 'BACKSPACE':
          mathContext?.insertAtCursor('BACKSPACE');
          break;
        case 'ENTER':
          // Could trigger form submission or just insert newline
          // For now, do nothing (let parent app handle)
          break;
        case 'OPEN_FUNCTIONS':
          setIsFunctionsPanelOpen(!isFunctionsPanelOpen);
          break;
        case 'AUDIO':
          // Audio trace - not implemented in v1
          break;
        case 'LEFT':
        case 'RIGHT':
          // Cursor movement - will be implemented in Phase 4
          break;
        case 'SPECIAL':
        case 'TILDE_DOT':
          // Special character modes - not implemented yet
          break;
        default:
          break;
      }
    } else if (button.latex) {
      // Insert LaTeX
      let latexToInsert = button.latex;

      // Apply shift (uppercase) in ABC mode
      if (isABCMode && isShiftActive && button.latex.length === 1 && /[a-z]/.test(button.latex)) {
        latexToInsert = button.latex.toUpperCase();
        setIsShiftActive(false); // Reset shift after use
      }

      mathContext?.insertAtCursor(latexToInsert);
    }
  }, [mathContext, isABCMode, isShiftActive, isFunctionsPanelOpen]);

  /**
   * Handle function button click
   */
  const handleFunctionClick = useCallback((func: FunctionButton) => {
    mathContext?.insertAtCursor(func.latex);
    // Keep panel open so user can insert multiple functions
  }, [mathContext]);

  /**
   * Toggle keyboard visibility
   */
  const toggleKeyboard = useCallback(() => {
    if (isVisible) {
      // Hide: trigger slide-down animation
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
        onVisibilityChange?.(false);
        setIsFunctionsPanelOpen(false);
      }, 300); // Match animation duration
    } else {
      // Show: just set visible (slide-up animation will play)
      setIsVisible(true);
      onVisibilityChange?.(true);
    }
  }, [isVisible, onVisibilityChange]);

  /**
   * Close functions panel when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFunctionsPanelOpen &&
        functionsPanelRef.current &&
        !functionsPanelRef.current.contains(event.target as Node) &&
        functionsButtonRef.current &&
        !functionsButtonRef.current.contains(event.target as Node)
      ) {
        setIsFunctionsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFunctionsPanelOpen]);

  /**
   * Render a single keyboard button
   */
  const renderButton = (button: KeyboardButton, index: number) => {
    if (button.isSpacer) {
      return (
        <div
          key={`spacer-${index}`}
          className="mathex-kb-spacer"
          style={{ flexGrow: button.flexGrow }}
        />
      );
    }

    // Determine button classes
    const buttonClasses = [
      'mathex-kb-btn',
      `mathex-kb-btn--${button.variant}`,
      button.command === 'SHIFT' && isShiftActive ? 'mathex-kb-btn--active' : '',
    ].filter(Boolean).join(' ');

    // Prepare display content
    let displayContent: React.ReactNode = button.display;

    if (button.useKatex && button.display) {
      displayContent = (
        <span
          className="mathex-kb-btn-katex"
          dangerouslySetInnerHTML={{ __html: renderLatexButton(button.display) }}
        />
      );
    }

    // Special case for functions button
    if (button.command === 'OPEN_FUNCTIONS') {
      return (
        <div
          key={`btn-${index}`}
          className="mathex-kb-btn-container"
          style={{ flexGrow: button.flexGrow }}
        >
          <button
            ref={functionsButtonRef}
            type="button"
            className={buttonClasses}
            onClick={() => handleButtonClick(button)}
            aria-label={button.ariaLabel}
            aria-expanded={isFunctionsPanelOpen}
          >
            <span className="mathex-kb-btn-content">{displayContent}</span>
          </button>
        </div>
      );
    }

    return (
      <div
        key={`btn-${index}`}
        className="mathex-kb-btn-container"
        style={{ flexGrow: button.flexGrow }}
      >
        <button
          type="button"
          className={buttonClasses}
          onClick={() => handleButtonClick(button)}
          aria-label={button.ariaLabel}
          disabled={button.command === 'AUDIO'} // Audio not implemented
        >
          <span className="mathex-kb-btn-content">{displayContent}</span>
        </button>
      </div>
    );
  };

  /**
   * Render a function category section
   */
  const renderFunctionCategory = (category: FunctionCategory) => {
    return (
      <div key={category.id} className="mathex-kb-func-section">
        <div className="mathex-kb-func-heading">
          {category.name}
          {category.helpLink && (
            <a
              href={category.helpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mathex-kb-func-help"
              aria-label={category.name}
            >
              <span className="mathex-kb-func-help-icon">?</span>
            </a>
          )}
        </div>
        <div className="mathex-kb-func-buttons">
          {category.functions.map((func, idx) => {
            let funcDisplay: React.ReactNode = func.display;

            if (func.useKatex) {
              funcDisplay = (
                <span
                  className="mathex-kb-func-katex"
                  dangerouslySetInnerHTML={{ __html: renderLatexButton(func.display) }}
                />
              );
            }

            return (
              <div key={idx} className="mathex-kb-func-btn-container">
                <button
                  type="button"
                  className="mathex-kb-func-btn"
                  onClick={() => handleFunctionClick(func)}
                  aria-label={func.ariaLabel}
                >
                  <span className="mathex-kb-func-btn-content">{funcDisplay}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Select current layout
  const currentLayout = isABCMode ? ABC_KEYBOARD_LAYOUT : MAIN_KEYBOARD_LAYOUT;

  return (
    <>
      {/* Main keyboard container */}
      {(isVisible || isAnimatingOut) && (
        <div
          className={`mathex-keyboard-container ${isAnimatingOut ? 'mathex-keyboard-container--hiding' : ''} ${className}`}
          style={style}
          aria-hidden={false}
        >
        <div className="mathex-keyboard-background">
          <div className="mathex-keyboard-keys">
            <div className="mathex-keyboard-main">
              {/* Render rows */}
              {currentLayout.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="mathex-kb-row">
                  {row.map((button, btnIndex) => renderButton(button, btnIndex))}
                </div>
              ))}
            </div>
          </div>

          {/* Minimize button */}
          <div className="mathex-kb-minimize-container">
            <button
              type="button"
              className="mathex-kb-minimize-btn"
              onClick={toggleKeyboard}
              aria-label="Hide Keypad"
              aria-expanded={true}
            >
              <span className="mathex-kb-toggle-icon">⌨</span>
              <span className="mathex-kb-toggle-caret">▼</span>
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Minimized keyboard toggle button */}
      {!isVisible && !isAnimatingOut && (
        <div className={`mathex-keyboard-minimized ${className}`} style={style}>
          <button
            type="button"
            className="mathex-kb-toggle-btn"
            onClick={toggleKeyboard}
            aria-label="Show Keypad"
            aria-expanded={false}
          >
            <span className="mathex-kb-toggle-icon">⌨</span>
            <span className="mathex-kb-toggle-caret">▲</span>
          </button>
        </div>
      )}

      {/* Functions panel (slide out from right) */}
      {isFunctionsPanelOpen && (
        <div
          ref={functionsPanelRef}
          className="mathex-functions-panel"
          role="group"
          aria-label="Functions"
        >
          <div className="mathex-functions-panel-interior">
            <div className="mathex-functions-panel-content">
              {FUNCTION_CATEGORIES.map((category) => renderFunctionCategory(category))}
            </div>
          </div>
          {/* Arrow pointing to functions button */}
          <div className="mathex-functions-panel-arrow" />
        </div>
      )}
    </>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
