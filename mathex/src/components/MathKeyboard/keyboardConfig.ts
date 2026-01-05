/**
 * Keyboard Configuration for MathKeyboard
 * Defines button layouts for different keyboard modes
 */

import type { ButtonConfig } from '../../types';

/**
 * Basic keyboard mode - numbers, operators, and common symbols
 * Based on Desmos keyboard layout (4 rows)
 */
export const BASIC_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1: Numbers 7-9 and basic operators
  [
    { display: '7', latex: '7', type: 'number' },
    { display: '8', latex: '8', type: 'number' },
    { display: '9', latex: '9', type: 'number' },
    { display: '÷', latex: '\\div', type: 'operator', description: 'Division' },
    { display: 'x²', latex: '^2', type: 'operator', description: 'Square' },
    { display: '√', latex: '\\sqrt{}', type: 'function', description: 'Square root' },
  ],

  // Row 2: Numbers 4-6 and more operators
  [
    { display: '4', latex: '4', type: 'number' },
    { display: '5', latex: '5', type: 'number' },
    { display: '6', latex: '6', type: 'number' },
    { display: '×', latex: '\\times', type: 'operator', description: 'Multiplication' },
    { display: 'xⁿ', latex: '^{}', type: 'operator', description: 'Exponent' },
    { display: 'ⁿ√', latex: '\\sqrt[]{}', type: 'function', description: 'Nth root' },
  ],

  // Row 3: Numbers 1-3 and fractions
  [
    { display: '1', latex: '1', type: 'number' },
    { display: '2', latex: '2', type: 'number' },
    { display: '3', latex: '3', type: 'number' },
    { display: '−', latex: '-', type: 'operator', description: 'Subtraction' },
    { display: 'x/y', latex: '\\frac{}{}', type: 'function', description: 'Fraction' },
    { display: '()', latex: '()', type: 'symbol', description: 'Parentheses' },
  ],

  // Row 4: Zero, decimal, and special keys
  [
    { display: '0', latex: '0', type: 'number' },
    { display: '.', latex: '.', type: 'symbol', description: 'Decimal point' },
    { display: 'π', latex: '\\pi', type: 'symbol', description: 'Pi' },
    { display: '+', latex: '+', type: 'operator', description: 'Addition' },
    { display: '=', latex: '=', type: 'operator', description: 'Equals' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action', description: 'Backspace' },
  ],
];

/**
 * Calculus keyboard mode - includes calculus-specific symbols
 */
export const CALCULUS_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1
  [
    { display: '7', latex: '7', type: 'number' },
    { display: '8', latex: '8', type: 'number' },
    { display: '9', latex: '9', type: 'number' },
    { display: '÷', latex: '\\div', type: 'operator' },
    { display: '∫', latex: '\\int', type: 'function', description: 'Integral' },
    { display: 'd/dx', latex: '\\frac{d}{dx}', type: 'function', description: 'Derivative' },
  ],

  // Row 2
  [
    { display: '4', latex: '4', type: 'number' },
    { display: '5', latex: '5', type: 'number' },
    { display: '6', latex: '6', type: 'number' },
    { display: '×', latex: '\\times', type: 'operator' },
    { display: '∑', latex: '\\sum', type: 'function', description: 'Summation' },
    { display: '∏', latex: '\\prod', type: 'function', description: 'Product' },
  ],

  // Row 3
  [
    { display: '1', latex: '1', type: 'number' },
    { display: '2', latex: '2', type: 'number' },
    { display: '3', latex: '3', type: 'number' },
    { display: '−', latex: '-', type: 'operator' },
    { display: 'lim', latex: '\\lim', type: 'function', description: 'Limit' },
    { display: '()', latex: '()', type: 'symbol' },
  ],

  // Row 4
  [
    { display: '0', latex: '0', type: 'number' },
    { display: '.', latex: '.', type: 'symbol' },
    { display: '∞', latex: '\\infty', type: 'symbol', description: 'Infinity' },
    { display: '+', latex: '+', type: 'operator' },
    { display: '=', latex: '=', type: 'operator' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action' },
  ],
];

/**
 * ABC keyboard mode - letter input (QWERTY layout)
 */
export const ABC_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1: Q-P
  [
    { display: 'q', latex: 'q', type: 'symbol' },
    { display: 'w', latex: 'w', type: 'symbol' },
    { display: 'e', latex: 'e', type: 'symbol' },
    { display: 'r', latex: 'r', type: 'symbol' },
    { display: 't', latex: 't', type: 'symbol' },
    { display: 'y', latex: 'y', type: 'symbol' },
    { display: 'u', latex: 'u', type: 'symbol' },
    { display: 'i', latex: 'i', type: 'symbol' },
    { display: 'o', latex: 'o', type: 'symbol' },
    { display: 'p', latex: 'p', type: 'symbol' },
  ],

  // Row 2: A-L
  [
    { display: 'a', latex: 'a', type: 'symbol' },
    { display: 's', latex: 's', type: 'symbol' },
    { display: 'd', latex: 'd', type: 'symbol' },
    { display: 'f', latex: 'f', type: 'symbol' },
    { display: 'g', latex: 'g', type: 'symbol' },
    { display: 'h', latex: 'h', type: 'symbol' },
    { display: 'j', latex: 'j', type: 'symbol' },
    { display: 'k', latex: 'k', type: 'symbol' },
    { display: 'l', latex: 'l', type: 'symbol' },
    { display: 'θ', latex: '\\theta', type: 'symbol', description: 'Theta' },
  ],

  // Row 3: Z-M with shift
  [
    { display: '↑', latex: 'SHIFT', type: 'action', description: 'Uppercase toggle' },
    { display: 'z', latex: 'z', type: 'symbol' },
    { display: 'x', latex: 'x', type: 'symbol' },
    { display: 'c', latex: 'c', type: 'symbol' },
    { display: 'v', latex: 'v', type: 'symbol' },
    { display: 'b', latex: 'b', type: 'symbol' },
    { display: 'n', latex: 'n', type: 'symbol' },
    { display: 'm', latex: 'm', type: 'symbol' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action' },
  ],

  // Row 4: Special keys
  [
    { display: '123', latex: 'MODE_SWITCH', type: 'action', description: 'Switch to numbers' },
    { display: 'aₙ', latex: 'SUBSCRIPT', type: 'action', description: 'Subscript toggle' },
    { display: 'Space', latex: ' ', type: 'symbol', description: 'Space' },
    { display: '=', latex: '=', type: 'operator' },
    { display: '←', latex: 'ENTER', type: 'action', description: 'Done' },
  ],
];

/**
 * Get keyboard layout by mode ID
 */
export function getKeyboardLayout(mode: 'basic' | 'calculus' | 'abc'): ButtonConfig[][] {
  switch (mode) {
    case 'basic':
      return BASIC_KEYBOARD_LAYOUT;
    case 'calculus':
      return CALCULUS_KEYBOARD_LAYOUT;
    case 'abc':
      return ABC_KEYBOARD_LAYOUT;
    default:
      return BASIC_KEYBOARD_LAYOUT;
  }
}
