import React, { useState, useCallback } from 'react';
import { useMathContext } from '../MathProvider/MathProvider';
import { FunctionsPanel } from './FunctionsPanel';
import './MathKeyboard.css';

/**
 * Props for the MathKeyboard component
 */
export interface MathKeyboardProps {
  /** Position of the keyboard */
  position?: 'fixed-bottom' | 'floating';
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether keyboard is visible by default */
  defaultVisible?: boolean;
}

/**
 * Button configuration interface
 */
interface KeyboardButton {
  /** Display label (can be text or LaTeX) */
  label: string;
  /** LaTeX to insert when clicked */
  latex: string;
  /** Button style variant */
  variant: 'light' | 'dark' | 'blue';
  /** Flex grow value for button width */
  flexGrow?: number;
  /** Aria label for accessibility */
  ariaLabel: string;
  /** Whether to render label as LaTeX */
  isLatex?: boolean;
  /** Icon name (for special buttons like arrows, backspace) */
  icon?: string;
}

/**
 * Spacer configuration
 */
interface Spacer {
  type: 'spacer';
  flexGrow: number;
}

type RowElement = KeyboardButton | Spacer;

/**
 * MathKeyboard - Visual keyboard for inserting mathematical symbols
 *
 * Provides a Desmos-like keyboard interface with multiple modes:
 * - Default mode: Numbers, operators, variables
 * - ABC mode: Letter keys
 * - Functions panel: Trig, calculus, and other advanced functions
 *
 * @component
 * @example
 * ```tsx
 * <MathKeyboard defaultVisible={true} />
 * ```
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  position = 'fixed-bottom',
  className = '',
  style,
  defaultVisible = false,
}) => {
  // State
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const [currentMode, setCurrentMode] = useState<'default' | 'abc'>('default');
  const [isFunctionsPanelOpen, setIsFunctionsPanelOpen] = useState(false);

  // Context
  const mathContext = useMathContext();

  /**
   * Toggle keyboard visibility
   */
  const toggleKeyboard = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  /**
   * Handle button click
   */
  const handleButtonClick = useCallback(
    (button: KeyboardButton) => {
      if (!mathContext) {
        console.warn('MathKeyboard: No MathProvider context found');
        return;
      }

      // Handle special commands
      if (button.latex === 'TOGGLE_ABC') {
        setCurrentMode((prev) => (prev === 'default' ? 'abc' : 'default'));
        return;
      }

      if (button.latex === 'TOGGLE_FUNCTIONS') {
        setIsFunctionsPanelOpen((prev) => !prev);
        return;
      }

      if (button.latex === 'BACKSPACE') {
        mathContext.insertAtCursor('BACKSPACE');
        return;
      }

      if (button.latex === 'ENTER') {
        // TODO: Handle enter key (submit, move to next line, etc.)
        return;
      }

      // Insert LaTeX at cursor
      mathContext.insertAtCursor(button.latex);
    },
    [mathContext]
  );

  /**
   * Render a keyboard button
   */
  const renderButton = (button: KeyboardButton) => {
    const buttonClass = `mathex-kbd-btn mathex-kbd-btn--${button.variant}`;

    return (
      <button
        key={button.latex}
        className={buttonClass}
        style={{ flexGrow: button.flexGrow || 1 }}
        onClick={() => handleButtonClick(button)}
        aria-label={button.ariaLabel}
        type="button"
      >
        {button.icon ? (
          <i className={`mathex-icon mathex-icon-${button.icon}`} aria-hidden="true" />
        ) : button.isLatex ? (
          <span className="mathex-kbd-latex">{button.label}</span>
        ) : (
          <span className="mathex-kbd-text">{button.label}</span>
        )}
      </button>
    );
  };

  /**
   * Render a spacer
   */
  const renderSpacer = (spacer: Spacer, index: number) => {
    return <div key={`spacer-${index}`} style={{ flexGrow: spacer.flexGrow }} />;
  };

  /**
   * Render a keyboard row
   */
  const renderRow = (elements: RowElement[], rowIndex: number) => {
    return (
      <div key={`row-${rowIndex}`} className="mathex-kbd-row">
        {elements.map((element, index) => {
          if ('type' in element && element.type === 'spacer') {
            return renderSpacer(element, index);
          }
          return renderButton(element as KeyboardButton);
        })}
      </div>
    );
  };

  // Keyboard layout configurations
  const defaultKeyboardRows: RowElement[][] = [
    // Row 1
    [
      { label: 'x', latex: 'x', variant: 'light', ariaLabel: 'x' },
      { label: 'y', latex: 'y', variant: 'light', ariaLabel: 'y' },
      { label: 'a²', latex: '^{2}', variant: 'light', ariaLabel: 'Squared', isLatex: true },
      { label: 'aᵇ', latex: '^{}', variant: 'light', ariaLabel: 'Superscript', isLatex: true },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '7', latex: '7', variant: 'dark', ariaLabel: '7' },
      { label: '8', latex: '8', variant: 'dark', ariaLabel: '8' },
      { label: '9', latex: '9', variant: 'dark', ariaLabel: '9' },
      { label: '÷', latex: '\\div', variant: 'light', ariaLabel: 'Divide' },
      { type: 'spacer', flexGrow: 0.5 },
      { label: 'functions', latex: 'TOGGLE_FUNCTIONS', variant: 'dark', flexGrow: 2, ariaLabel: 'Functions' },
    ],
    // Row 2
    [
      { label: '(', latex: '(', variant: 'light', ariaLabel: 'Left Parenthesis' },
      { label: ')', latex: ')', variant: 'light', ariaLabel: 'Right Parenthesis' },
      { label: '<', latex: '<', variant: 'light', ariaLabel: 'Less than' },
      { label: '>', latex: '>', variant: 'light', ariaLabel: 'Greater than' },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '4', latex: '4', variant: 'dark', ariaLabel: '4' },
      { label: '5', latex: '5', variant: 'dark', ariaLabel: '5' },
      { label: '6', latex: '6', variant: 'dark', ariaLabel: '6' },
      { label: '×', latex: '\\times', variant: 'light', ariaLabel: 'Times' },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '', latex: 'LEFT_ARROW', variant: 'dark', ariaLabel: 'Left Arrow', icon: 'arrow-left' },
      { label: '', latex: 'RIGHT_ARROW', variant: 'dark', ariaLabel: 'Right Arrow', icon: 'arrow-right' },
    ],
    // Row 3
    [
      { label: '|a|', latex: '\\left|\\right|', variant: 'light', ariaLabel: 'Absolute Value', isLatex: true },
      { label: ',', latex: ',', variant: 'light', ariaLabel: 'Comma' },
      { label: '≤', latex: '\\leq', variant: 'light', ariaLabel: 'Less than or equal' },
      { label: '≥', latex: '\\geq', variant: 'light', ariaLabel: 'Greater than or equal' },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '1', latex: '1', variant: 'dark', ariaLabel: '1' },
      { label: '2', latex: '2', variant: 'dark', ariaLabel: '2' },
      { label: '3', latex: '3', variant: 'dark', ariaLabel: '3' },
      { label: '−', latex: '-', variant: 'light', ariaLabel: 'Minus' },
      { type: 'spacer', flexGrow: 1 },
      { label: '', latex: 'BACKSPACE', variant: 'dark', flexGrow: 1.5, ariaLabel: 'Backspace', icon: 'backspace' },
    ],
    // Row 4
    [
      { label: 'A B C', latex: 'TOGGLE_ABC', variant: 'dark', ariaLabel: 'Toggle Letters' },
      { label: '', latex: 'AUDIO', variant: 'dark', ariaLabel: 'Audio Trace', icon: 'volume' },
      { label: '√', latex: '\\sqrt{}', variant: 'light', ariaLabel: 'Square Root', isLatex: true },
      { label: 'π', latex: '\\pi', variant: 'light', ariaLabel: 'Pi', isLatex: true },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '0', latex: '0', variant: 'dark', ariaLabel: '0' },
      { label: '.', latex: '.', variant: 'dark', ariaLabel: 'Decimal' },
      { label: '=', latex: '=', variant: 'light', ariaLabel: 'Equals' },
      { label: '+', latex: '+', variant: 'light', ariaLabel: 'Plus' },
      { type: 'spacer', flexGrow: 0.5 },
      { label: '↵', latex: 'ENTER', variant: 'blue', flexGrow: 2, ariaLabel: 'Enter', icon: 'enter' },
    ],
  ];

  // ABC mode keyboard layout
  const abcKeyboardRows: RowElement[][] = [
    // Row 1
    [
      { label: 'q', latex: 'q', variant: 'light', ariaLabel: 'q' },
      { label: 'w', latex: 'w', variant: 'light', ariaLabel: 'w' },
      { label: 'e', latex: 'e', variant: 'light', ariaLabel: 'e' },
      { label: 'r', latex: 'r', variant: 'light', ariaLabel: 'r' },
      { label: 't', latex: 't', variant: 'light', ariaLabel: 't' },
      { label: 'y', latex: 'y', variant: 'light', ariaLabel: 'y' },
      { label: 'u', latex: 'u', variant: 'light', ariaLabel: 'u' },
      { label: 'i', latex: 'i', variant: 'light', ariaLabel: 'i' },
      { label: 'o', latex: 'o', variant: 'light', ariaLabel: 'o' },
      { label: 'p', latex: 'p', variant: 'light', ariaLabel: 'p' },
    ],
    // Row 2
    [
      { label: 'a', latex: 'a', variant: 'light', ariaLabel: 'a' },
      { label: 's', latex: 's', variant: 'light', ariaLabel: 's' },
      { label: 'd', latex: 'd', variant: 'light', ariaLabel: 'd' },
      { label: 'f', latex: 'f', variant: 'light', ariaLabel: 'f' },
      { label: 'g', latex: 'g', variant: 'light', ariaLabel: 'g' },
      { label: 'h', latex: 'h', variant: 'light', ariaLabel: 'h' },
      { label: 'j', latex: 'j', variant: 'light', ariaLabel: 'j' },
      { label: 'k', latex: 'k', variant: 'light', ariaLabel: 'k' },
      { label: 'l', latex: 'l', variant: 'light', ariaLabel: 'l' },
      { label: 'θ', latex: '\\theta', variant: 'light', ariaLabel: 'theta' },
    ],
    // Row 3
    [
      { label: '', latex: 'SHIFT', variant: 'dark', ariaLabel: 'Shift', icon: 'shift' },
      { label: 'z', latex: 'z', variant: 'light', ariaLabel: 'z' },
      { label: 'x', latex: 'x', variant: 'light', ariaLabel: 'x' },
      { label: 'c', latex: 'c', variant: 'light', ariaLabel: 'c' },
      { label: 'v', latex: 'v', variant: 'light', ariaLabel: 'v' },
      { label: 'b', latex: 'b', variant: 'light', ariaLabel: 'b' },
      { label: 'n', latex: 'n', variant: 'light', ariaLabel: 'n' },
      { label: 'm', latex: 'm', variant: 'light', ariaLabel: 'm' },
      { label: '', latex: 'BACKSPACE', variant: 'dark', ariaLabel: 'Backspace', icon: 'backspace' },
    ],
    // Row 4
    [
      { label: '1 2 3', latex: 'TOGGLE_ABC', variant: 'dark', ariaLabel: 'Toggle Numbers' },
      { label: 'aᵦ', latex: '_{}', variant: 'light', ariaLabel: 'Subscript', isLatex: true },
      { label: '!%', latex: '!', variant: 'light', ariaLabel: 'Special characters' },
      { label: '[ ]', latex: '[]', variant: 'light', ariaLabel: 'Brackets' },
      { label: '{ }', latex: '\\{\\}', variant: 'light', ariaLabel: 'Braces' },
      { label: '~.', latex: '~', variant: 'light', ariaLabel: 'Tilde' },
      { label: ',', latex: ',', variant: 'light', ariaLabel: 'Comma' },
      { label: '↵', latex: 'ENTER', variant: 'blue', flexGrow: 2, ariaLabel: 'Enter', icon: 'enter' },
    ],
  ];

  const currentRows = currentMode === 'default' ? defaultKeyboardRows : abcKeyboardRows;

  return (
    <div className={`mathex-keyboard-container ${position === 'fixed-bottom' ? 'mathex-keyboard--fixed' : ''} ${className}`} style={style}>
      {/* Toggle Button */}
      <button
        className={`mathex-keyboard-toggle ${isVisible ? 'mathex-keyboard-toggle--active' : ''}`}
        onClick={toggleKeyboard}
        aria-label={isVisible ? 'Hide Keyboard' : 'Show Keyboard'}
        aria-expanded={isVisible}
        type="button"
      >
        <i className="mathex-icon mathex-icon-keyboard" aria-hidden="true" />
      </button>

      {/* Keyboard Panel */}
      <div className={`mathex-keyboard ${isVisible ? 'mathex-keyboard--visible' : ''}`} aria-label="Math Keyboard" role="region">
        <div className="mathex-keyboard-background">
          <div className="mathex-keyboard-keys">{currentRows.map((row, index) => renderRow(row, index))}</div>
        </div>
      </div>

      {/* Functions Panel */}
      <FunctionsPanel isOpen={isFunctionsPanelOpen} onFunctionClick={(latex) => mathContext?.insertAtCursor(latex)} onClose={() => setIsFunctionsPanelOpen(false)} />
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
