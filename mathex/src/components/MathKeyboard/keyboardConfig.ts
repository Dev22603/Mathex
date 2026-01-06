/**
 * Keyboard Configuration for MathKeyboard
 * Pixel-perfect Desmos layout based on screenshots
 */

import type { ButtonConfig } from '../../types';

/**
 * NUMBERS MODE - Flex Row Layout (matches Desmos structure)
 * Based on Desmos HTML structure where each row is a flexbox container
 *
 * Each row contains buttons with flex-grow values and spacers between sections
 */

export interface NumbersModeLayout {
  rows: Array<Array<ButtonConfig | { type: 'spacer'; flexGrow: number }>>;
}

/**
 * Numbers Mode Layout - Flex Row Structure (matches Desmos HTML exactly)
 * Each row is a flex container with buttons and spacers
 */
export const NUMBERS_MODE_LAYOUT: NumbersModeLayout = {
  rows: [
    // Row 1: x, y, a², aᵇ | 7, 8, 9 | ÷ | functions
    [
      { display: 'x', latex: 'x', type: 'variable', style: 'white', flexGrow: 1 },
      { display: 'y', latex: 'y', type: 'variable', style: 'white', flexGrow: 1 },
      { display: 'a²', latex: '^{2}', type: 'operator', style: 'white', flexGrow: 1 },
      { display: 'aᵇ', latex: '^{}', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '7', latex: '7', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '8', latex: '8', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '9', latex: '9', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '÷', latex: '\\div', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: 'functions', latex: 'FUNCTIONS', type: 'action', style: 'gray-medium', flexGrow: 2 },
    ],
    // Row 2: (, ), <, > | 4, 5, 6 | × | ←, →
    [
      { display: '(', latex: '(', type: 'symbol', style: 'white', flexGrow: 1 },
      { display: ')', latex: ')', type: 'symbol', style: 'white', flexGrow: 1 },
      { display: '<', latex: '<', type: 'operator', style: 'white', flexGrow: 1 },
      { display: '>', latex: '>', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '4', latex: '4', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '5', latex: '5', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '6', latex: '6', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '×', latex: '\\times', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '←', latex: 'ARROW_LEFT', type: 'action', style: 'gray-medium', flexGrow: 1 },
      { display: '→', latex: 'ARROW_RIGHT', type: 'action', style: 'gray-medium', flexGrow: 1 },
    ],
    // Row 3: |a|, ,, ≤, ≥ | 1, 2, 3 | − | ⌫
    [
      { display: '|a|', latex: '\\left|\\right|', type: 'function', style: 'white', flexGrow: 1 },
      { display: ',', latex: ',', type: 'symbol', style: 'white', flexGrow: 1 },
      { display: '≤', latex: '\\leq', type: 'operator', style: 'white', flexGrow: 1 },
      { display: '≥', latex: '\\geq', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '1', latex: '1', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '2', latex: '2', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '3', latex: '3', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '−', latex: '-', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 1 },
      { display: '⌫', latex: 'BACKSPACE', type: 'action', style: 'gray-medium', flexGrow: 1.5 },
    ],
    // Row 4: ABC, 🔊, √, π | 0, ., = | + | ↵
    [
      { display: 'ABC', latex: 'MODE_ABC', type: 'action', style: 'gray-dark', flexGrow: 1 },
      { display: '🔊', latex: 'AUDIO', type: 'action', style: 'gray-dark', flexGrow: 1 },
      { display: '√', latex: '\\sqrt{}', type: 'function', style: 'white', flexGrow: 1 },
      { display: 'π', latex: '\\pi', type: 'symbol', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '0', latex: '0', type: 'number', style: 'gray-light', flexGrow: 1 },
      { display: '.', latex: '.', type: 'symbol', style: 'gray-light', flexGrow: 1 },
      { display: '=', latex: '=', type: 'operator', style: 'white', flexGrow: 1 },
      { display: '+', latex: '+', type: 'operator', style: 'white', flexGrow: 1 },
      { type: 'spacer', flexGrow: 0.5 },
      { display: '↵', latex: 'ENTER', type: 'action', style: 'blue', flexGrow: 2 },
    ],
  ],
};

/**
 * ABC MODE - Full-width QWERTY Layout
 * Based on: "123 toggled to abc.png"
 */
export const ABC_KEYBOARD_LAYOUT: ButtonConfig[][] = [
  // Row 1: q-p (10 letters)
  [
    { display: 'q', latex: 'q', type: 'letter', style: 'white' },
    { display: 'w', latex: 'w', type: 'letter', style: 'white' },
    { display: 'e', latex: 'e', type: 'letter', style: 'white' },
    { display: 'r', latex: 'r', type: 'letter', style: 'white' },
    { display: 't', latex: 't', type: 'letter', style: 'white' },
    { display: 'y', latex: 'y', type: 'letter', style: 'white' },
    { display: 'u', latex: 'u', type: 'letter', style: 'white' },
    { display: 'i', latex: 'i', type: 'letter', style: 'white' },
    { display: 'o', latex: 'o', type: 'letter', style: 'white' },
    { display: 'p', latex: 'p', type: 'letter', style: 'white' },
  ],

  // Row 2: a-l + theta (10 keys)
  [
    { display: 'a', latex: 'a', type: 'letter', style: 'white' },
    { display: 's', latex: 's', type: 'letter', style: 'white' },
    { display: 'd', latex: 'd', type: 'letter', style: 'white' },
    { display: 'f', latex: 'f', type: 'letter', style: 'white' },
    { display: 'g', latex: 'g', type: 'letter', style: 'white' },
    { display: 'h', latex: 'h', type: 'letter', style: 'white' },
    { display: 'j', latex: 'j', type: 'letter', style: 'white' },
    { display: 'k', latex: 'k', type: 'letter', style: 'white' },
    { display: 'l', latex: 'l', type: 'letter', style: 'white' },
    { display: 'θ', latex: '\\theta', type: 'symbol', style: 'white' },
  ],

  // Row 3: shift (wide) + z-m + backspace (wide)
  [
    { display: '⬆', latex: 'SHIFT', type: 'action', style: 'gray-dark', size: 'wide' },
    { display: 'z', latex: 'z', type: 'letter', style: 'white' },
    { display: 'x', latex: 'x', type: 'letter', style: 'white' },
    { display: 'c', latex: 'c', type: 'letter', style: 'white' },
    { display: 'v', latex: 'v', type: 'letter', style: 'white' },
    { display: 'b', latex: 'b', type: 'letter', style: 'white' },
    { display: 'n', latex: 'n', type: 'letter', style: 'white' },
    { display: 'm', latex: 'm', type: 'letter', style: 'white' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action', style: 'gray-dark', size: 'wide' },
  ],

  // Row 4: 123 (wide) + special chars + return (extra-wide blue)
  [
    { display: '123', latex: 'MODE_NUMBERS', type: 'action', style: 'gray-dark', size: 'wide' },
    { display: 'aᵦ', latex: '_{}', type: 'operator', style: 'white' },
    { display: '!%', latex: '!', type: 'symbol', style: 'white' },
    { display: '[ ]', latex: '[]', type: 'symbol', style: 'white' },
    { display: '{ }', latex: '\\{\\}', type: 'symbol', style: 'white' },
    { display: '~˙', latex: '\\sim', type: 'symbol', style: 'white' },
    { display: ',', latex: ',', type: 'symbol', style: 'white' },
    { display: '↵', latex: 'ENTER', type: 'action', style: 'blue', size: 'extra-wide' },
  ],
];

/**
 * Get keyboard layout by mode
 */
export function getKeyboardLayout(mode: 'numbers' | 'abc'): ButtonConfig[][] | NumbersModeLayout {
  return mode === 'abc' ? ABC_KEYBOARD_LAYOUT : NUMBERS_MODE_LAYOUT;
}
