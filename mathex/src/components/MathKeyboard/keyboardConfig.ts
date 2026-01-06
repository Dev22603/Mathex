/**
 * Keyboard Configuration for MathKeyboard
 * Pixel-perfect Desmos layout based on screenshots
 */

import type { ButtonConfig } from '../../types';

/**
 * NUMBERS MODE - 4 Section Layout
 * Based on: "cursor in equation next to 2x.png"
 *
 * Layout:
 * ┌─────────────────┬──────────────┬─────────┬──────────────────┐
 * │   Variables     │   Numbers    │   Ops   │     Actions      │
 * │   (4x4 grid)    │  (3x4 grid)  │ (1x4)   │  (various sizes) │
 * └─────────────────┴──────────────┴─────────┴──────────────────┘
 */

export interface NumbersModeLayout {
  variables: ButtonConfig[][];  // 4x4 grid
  numbers: ButtonConfig[][];    // 3x4 grid (calculator layout)
  operators: ButtonConfig[];    // 1x4 vertical column
  actions: ButtonConfig[][];    // 4 rows with various button sizes
}

/**
 * Variables Section (Left) - 4 columns × 4 rows
 */
const VARIABLES_SECTION: ButtonConfig[][] = [
  // Row 1
  [
    { display: 'x', latex: 'x', type: 'variable', style: 'white' },
    { display: 'y', latex: 'y', type: 'variable', style: 'white' },
    { display: 'a²', latex: '^{2}', type: 'operator', style: 'white' },
    { display: 'aᵇ', latex: '^{}', type: 'operator', style: 'white' },
  ],
  // Row 2
  [
    { display: '(', latex: '(', type: 'symbol', style: 'white' },
    { display: ')', latex: ')', type: 'symbol', style: 'white' },
    { display: '<', latex: '<', type: 'operator', style: 'white' },
    { display: '>', latex: '>', type: 'operator', style: 'white' },
  ],
  // Row 3
  [
    { display: '|a|', latex: '\\left|\\right|', type: 'function', style: 'white' },
    { display: ';', latex: ';', type: 'symbol', style: 'white' },
    { display: '≤', latex: '\\leq', type: 'operator', style: 'white' },
    { display: '≥', latex: '\\geq', type: 'operator', style: 'white' },
  ],
  // Row 4
  [
    { display: 'ABC', latex: 'MODE_ABC', type: 'action', style: 'gray-dark' },
    { display: '🔊', latex: 'AUDIO', type: 'action', style: 'gray-dark' },
    { display: '√', latex: '\\sqrt{}', type: 'function', style: 'white' },
    { display: 'π', latex: '\\pi', type: 'symbol', style: 'white' },
  ],
];

/**
 * Numbers Section (Center-Left) - 3 columns × 4 rows
 * Calculator-style layout
 */
const NUMBERS_SECTION: ButtonConfig[][] = [
  // Row 1
  [
    { display: '7', latex: '7', type: 'number', style: 'gray-light' },
    { display: '8', latex: '8', type: 'number', style: 'gray-light' },
    { display: '9', latex: '9', type: 'number', style: 'gray-light' },
  ],
  // Row 2
  [
    { display: '4', latex: '4', type: 'number', style: 'gray-light' },
    { display: '5', latex: '5', type: 'number', style: 'gray-light' },
    { display: '6', latex: '6', type: 'number', style: 'gray-light' },
  ],
  // Row 3
  [
    { display: '1', latex: '1', type: 'number', style: 'gray-light' },
    { display: '2', latex: '2', type: 'number', style: 'gray-light' },
    { display: '3', latex: '3', type: 'number', style: 'gray-light' },
  ],
  // Row 4
  [
    { display: '0', latex: '0', type: 'number', style: 'gray-light' },
    { display: '.', latex: '.', type: 'symbol', style: 'gray-light' },
    { display: '=', latex: '=', type: 'operator', style: 'white' },
  ],
];

/**
 * Operators Section (Center-Right) - 1 column × 4 rows
 */
const OPERATORS_SECTION: ButtonConfig[] = [
  { display: '÷', latex: '\\div', type: 'operator', style: 'white' },
  { display: '×', latex: '\\times', type: 'operator', style: 'white' },
  { display: '−', latex: '-', type: 'operator', style: 'white' },
  { display: '+', latex: '+', type: 'operator', style: 'white' },
];

/**
 * Actions Section (Right) - Various button sizes per row
 */
const ACTIONS_SECTION: ButtonConfig[][] = [
  // Row 1: Functions button (wide)
  [
    { display: 'functions', latex: 'FUNCTIONS', type: 'action', style: 'gray-medium', size: 'wide' },
  ],
  // Row 2: Left and Right arrow buttons
  [
    { display: '←', latex: 'ARROW_LEFT', type: 'action', style: 'gray-medium', size: 'standard' },
    { display: '→', latex: 'ARROW_RIGHT', type: 'action', style: 'gray-medium', size: 'standard' },
  ],
  // Row 3: Delete button
  [
    { display: '⌫', latex: 'BACKSPACE', type: 'action', style: 'white', size: 'standard' },
  ],
  // Row 4: Return button (large blue)
  [
    { display: '↵', latex: 'ENTER', type: 'action', style: 'blue', size: 'extra-wide' },
  ],
];

/**
 * Complete Numbers Mode Layout
 */
export const NUMBERS_MODE_LAYOUT: NumbersModeLayout = {
  variables: VARIABLES_SECTION,
  numbers: NUMBERS_SECTION,
  operators: OPERATORS_SECTION,
  actions: ACTIONS_SECTION,
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
