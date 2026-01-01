import React, { useState } from 'react';
import type { MathKeyboardProps, ButtonConfig } from '../../types';
import { KeyboardButton } from './KeyboardButton';
import './MathKeyboard.css';

/**
 * Basic Mode Button Configuration
 * Numbers, operators, variables, and basic symbols
 */
const BASIC_MODE_BUTTONS: ButtonConfig[][] = [
  // Row 1: Variables and basic symbols
  [
    { display: 'x', latex: 'x', type: 'symbol' },
    { display: 'y', latex: 'y', type: 'symbol' },
    { display: 'π', latex: '\\pi', type: 'symbol' },
    { display: '(', latex: '(', type: 'operator' },
    { display: ')', latex: ')', type: 'operator' },
  ],
  // Row 2: Numbers 7-9 and operators
  [
    { display: '7', latex: '7', type: 'number' },
    { display: '8', latex: '8', type: 'number' },
    { display: '9', latex: '9', type: 'number' },
    { display: '÷', latex: '\\div', type: 'operator' },
    { display: '√', latex: '\\sqrt{', type: 'function' },
  ],
  // Row 3: Numbers 4-6 and operators
  [
    { display: '4', latex: '4', type: 'number' },
    { display: '5', latex: '5', type: 'number' },
    { display: '6', latex: '6', type: 'number' },
    { display: '×', latex: '\\times', type: 'operator' },
    { display: 'a²', latex: '^2', type: 'function' },
  ],
  // Row 4: Numbers 1-3 and operators
  [
    { display: '1', latex: '1', type: 'number' },
    { display: '2', latex: '2', type: 'number' },
    { display: '3', latex: '3', type: 'number' },
    { display: '−', latex: '-', type: 'operator' },
    { display: 'aᵇ', latex: '^{', type: 'function' },
  ],
  // Row 5: Zero, decimal, and operators
  [
    { display: '0', latex: '0', type: 'number' },
    { display: '.', latex: '.', type: 'operator' },
    { display: ',', latex: ',', type: 'operator' },
    { display: '+', latex: '+', type: 'operator' },
    { display: '=', latex: '=', type: 'operator' },
  ],
  // Row 6: Comparison operators
  [
    { display: '<', latex: '<', type: 'operator' },
    { display: '>', latex: '>', type: 'operator' },
    { display: '≤', latex: '\\leq', type: 'operator' },
    { display: '≥', latex: '\\geq', type: 'operator' },
    { display: '|a|', latex: '|', type: 'function' },
  ],
];

/**
 * Special buttons (navigation, functions, etc.)
 */
const SPECIAL_BUTTONS = {
  backspace: { display: '⌫', latex: 'BACKSPACE', type: 'function' as const },
  enter: { display: '↵', latex: 'ENTER', type: 'function' as const },
  arrowLeft: { display: '←', latex: 'ARROW_LEFT', type: 'function' as const },
  arrowRight: { display: '→', latex: 'ARROW_RIGHT', type: 'function' as const },
  functions: { display: 'ƒ(x)', latex: 'FUNCTIONS', type: 'function' as const },
};

/**
 * MathKeyboard Component
 *
 * A virtual keyboard for inputting mathematical expressions.
 * Features a grid layout with numbers, operators, variables, and special functions.
 * Can be toggled visible/hidden with smooth animations.
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  mode: _mode = 'basic', // TODO: Phase 6 - Implement mode switching
  position = 'fixed-bottom',
  className = '',
  style,
  defaultVisible = false,
  showToggleButton = true,
  onButtonClick,
}) => {
  const [visible, setVisible] = useState(defaultVisible);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleButtonClick = (latex: string) => {
    // Handle special buttons
    if (latex === 'BACKSPACE' || latex === 'ENTER' || latex === 'ARROW_LEFT' || latex === 'ARROW_RIGHT' || latex === 'FUNCTIONS') {
      // These will be handled in Phase 3 with context
      console.log(`Special button clicked: ${latex}`);
      if (onButtonClick) {
        onButtonClick(latex);
      }
      return;
    }

    // Regular button - insert LaTeX
    if (onButtonClick) {
      onButtonClick(latex);
    }
  };

  const containerClass = `math-keyboard${position === 'fixed-bottom' ? ' math-keyboard--fixed-bottom' : ' math-keyboard--floating'}${visible ? ' math-keyboard--visible' : ' math-keyboard--hidden'}${className ? ` ${className}` : ''}`;

  return (
    <>
      {/* Toggle Button */}
      {showToggleButton && (
        <button
          type="button"
          className="math-keyboard__toggle"
          onClick={handleToggle}
          aria-label={visible ? 'Hide keyboard' : 'Show keyboard'}
          aria-expanded={visible}
        >
          {visible ? '⌨️ Hide' : '⌨️ Show'}
        </button>
      )}

      {/* Keyboard Container */}
      <div className={containerClass} style={style} role="region" aria-label="Math keyboard">
        <div className="math-keyboard__content">
          {/* Main Button Grid */}
          <div className="math-keyboard__grid">
            {BASIC_MODE_BUTTONS.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="math-keyboard__row">
                {row.map((button, buttonIndex) => (
                  <KeyboardButton
                    key={`${rowIndex}-${buttonIndex}`}
                    config={button}
                    onClick={handleButtonClick}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Special Buttons Section */}
          <div className="math-keyboard__special">
            {/* Navigation Arrows */}
            <div className="math-keyboard__nav">
              <KeyboardButton
                config={SPECIAL_BUTTONS.arrowLeft}
                onClick={handleButtonClick}
                className="math-keyboard__button--arrow"
              />
              <KeyboardButton
                config={SPECIAL_BUTTONS.arrowRight}
                onClick={handleButtonClick}
                className="math-keyboard__button--arrow"
              />
            </div>

            {/* Backspace Button */}
            <KeyboardButton
              config={SPECIAL_BUTTONS.backspace}
              onClick={handleButtonClick}
              wide
              className="math-keyboard__button--backspace"
            />

            {/* Enter Button */}
            <KeyboardButton
              config={SPECIAL_BUTTONS.enter}
              onClick={handleButtonClick}
              wide
              className="math-keyboard__button--enter"
            />

            {/* Functions Button */}
            <KeyboardButton
              config={SPECIAL_BUTTONS.functions}
              onClick={handleButtonClick}
              wide
              className="math-keyboard__button--functions"
            />
          </div>
        </div>
      </div>
    </>
  );
};
