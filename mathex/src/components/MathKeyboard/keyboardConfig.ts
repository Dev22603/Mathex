/**
 * Keyboard Configuration for MathKeyboard
 * Exact Desmos layout based on screenshots
 */

import type { ButtonConfig } from '../../types';

/**
 * Basic/Numbers keyboard mode (default)
 * Simple calculator-style layout
 */
export const NUMBERS_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1
  [
    { display: '7', latex: '7', type: 'number' },
    { display: '8', latex: '8', type: 'number' },
    { display: '9', latex: '9', type: 'number' },
    { display: '÷', latex: '\\div', type: 'operator' },
    { display: 'x²', latex: '^{2}', type: 'operator' },
    { display: '√', latex: '\\sqrt{}', type: 'function' },
    { display: 'π', latex: '\\pi', type: 'symbol' },
  ],

  // Row 2
  [
    { display: '4', latex: '4', type: 'number' },
    { display: '5', latex: '5', type: 'number' },
    { display: '6', latex: '6', type: 'number' },
    { display: '×', latex: '\\times', type: 'operator' },
    { display: 'xⁿ', latex: '^{}', type: 'operator' },
    { display: 'ⁿ√', latex: '\\sqrt[]{}', type: 'function' },
    { display: '(', latex: '(', type: 'symbol' },
  ],

  // Row 3
  [
    { display: '1', latex: '1', type: 'number' },
    { display: '2', latex: '2', type: 'number' },
    { display: '3', latex: '3', type: 'number' },
    { display: '−', latex: '-', type: 'operator' },
    { display: 'x/y', latex: '\\frac{}{}', type: 'function' },
    { display: '|x|', latex: '\\left|\\right|', type: 'function' },
    { display: ')', latex: ')', type: 'symbol' },
  ],

  // Row 4
  [
    { display: '0', latex: '0', type: 'number' },
    { display: '.', latex: '.', type: 'symbol' },
    { display: ',', latex: ',', type: 'symbol' },
    { display: '+', latex: '+', type: 'operator' },
    { display: '=', latex: '=', type: 'operator' },
    { display: '<', latex: '<', type: 'operator' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action' },
  ],
];

/**
 * ABC/Letters keyboard mode
 * Based on Desmos screenshot - exact layout
 */
export const ABC_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1: q-p (10 letters)
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

  // Row 2: a-l + theta (9 letters + theta)
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
    { display: 'θ', latex: '\\theta', type: 'symbol' },
  ],

  // Row 3: shift + z-m + backspace
  [
    { display: '↑', latex: 'SHIFT', type: 'action' },
    { display: 'z', latex: 'z', type: 'symbol' },
    { display: 'x', latex: 'x', type: 'symbol' },
    { display: 'c', latex: 'c', type: 'symbol' },
    { display: 'v', latex: 'v', type: 'symbol' },
    { display: 'b', latex: 'b', type: 'symbol' },
    { display: 'n', latex: 'n', type: 'symbol' },
    { display: 'm', latex: 'm', type: 'symbol' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action' },
  ],

  // Row 4: mode switch + special symbols + large return
  [
    { display: '123', latex: 'MODE_NUMBERS', type: 'action' },
    { display: 'aₙ', latex: '_{}', type: 'operator' },
    { display: '!%', latex: '!', type: 'symbol' },
    { display: '[ ]', latex: '[]', type: 'symbol' },
    { display: '{ }', latex: '\\{\\}', type: 'symbol' },
    { display: '~˙', latex: '\\sim', type: 'symbol' },
    { display: ',', latex: ',', type: 'symbol' },
    { display: '↵', latex: 'ENTER', type: 'action' },
  ],
];

/**
 * Get keyboard layout by mode
 */
export function getKeyboardLayout(mode: 'numbers' | 'abc'): ButtonConfig[][] {
  return mode === 'abc' ? ABC_KEYBOARD_LAYOUT : NUMBERS_KEYBOARD_LAYOUT;
}
