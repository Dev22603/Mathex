/**
 * Keyboard button configurations matching Desmos layout exactly
 */

export interface KeyboardButton {
  /** Display content (text, symbol, or LaTeX) */
  display: string;
  /** LaTeX to insert when clicked */
  latex: string;
  /** Button style variant */
  variant: 'light' | 'dark' | 'blue';
  /** Flex grow value for layout */
  flexGrow: number;
  /** Is this a spacer (non-clickable gap) */
  isSpacer?: boolean;
  /** Aria label for accessibility */
  ariaLabel: string;
  /** Command identifier for special actions */
  command?: string;
  /** Whether to render display as KaTeX */
  useKatex?: boolean;
}

/**
 * Main keyboard layout (default 123 mode)
 * Exact structure from Desmos
 */
export const MAIN_KEYBOARD_LAYOUT: KeyboardButton[][] = [
  // Row 1: Variables, Numbers, Functions
  [
    { display: 'x', latex: 'x', variant: 'light', flexGrow: 1, ariaLabel: 'x', useKatex: true },
    { display: 'y', latex: 'y', variant: 'light', flexGrow: 1, ariaLabel: 'y', useKatex: true },
    { display: 'a^2', latex: '^{2}', variant: 'light', flexGrow: 1, ariaLabel: 'Squared', useKatex: true },
    { display: 'a^{b}', latex: '^{}', variant: 'light', flexGrow: 1, ariaLabel: 'Superscript', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '7', latex: '7', variant: 'dark', flexGrow: 1, ariaLabel: '7' },
    { display: '8', latex: '8', variant: 'dark', flexGrow: 1, ariaLabel: '8' },
    { display: '9', latex: '9', variant: 'dark', flexGrow: 1, ariaLabel: '9' },
    { display: '÷', latex: '\\div', variant: 'light', flexGrow: 1, ariaLabel: 'Divide', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: 'functions', latex: '', variant: 'dark', flexGrow: 2, ariaLabel: 'Functions', command: 'OPEN_FUNCTIONS' },
  ],
  // Row 2: Parentheses, Comparison, Numbers, Operators, Navigation
  [
    { display: '(', latex: '(', variant: 'light', flexGrow: 1, ariaLabel: 'Left Parenthesis' },
    { display: ')', latex: ')', variant: 'light', flexGrow: 1, ariaLabel: 'Right Parenthesis' },
    { display: '<', latex: '<', variant: 'light', flexGrow: 1, ariaLabel: 'Less than', useKatex: true },
    { display: '>', latex: '>', variant: 'light', flexGrow: 1, ariaLabel: 'Greater than', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '4', latex: '4', variant: 'dark', flexGrow: 1, ariaLabel: '4' },
    { display: '5', latex: '5', variant: 'dark', flexGrow: 1, ariaLabel: '5' },
    { display: '6', latex: '6', variant: 'dark', flexGrow: 1, ariaLabel: '6' },
    { display: '×', latex: '\\times', variant: 'light', flexGrow: 1, ariaLabel: 'Times', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '←', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Left Arrow', command: 'LEFT' },
    { display: '→', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Right Arrow', command: 'RIGHT' },
  ],
  // Row 3: Absolute value, Comparison, Numbers, Operators, Backspace
  [
    { display: '|a|', latex: '||', variant: 'light', flexGrow: 1, ariaLabel: 'Absolute Value', useKatex: true },
    { display: ',', latex: ',', variant: 'light', flexGrow: 1, ariaLabel: 'Comma' },
    { display: '\\leq', latex: '\\leq', variant: 'light', flexGrow: 1, ariaLabel: 'Less than or equal', useKatex: true },
    { display: '\\geq', latex: '\\geq', variant: 'light', flexGrow: 1, ariaLabel: 'Greater than or equal', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '1', latex: '1', variant: 'dark', flexGrow: 1, ariaLabel: '1' },
    { display: '2', latex: '2', variant: 'dark', flexGrow: 1, ariaLabel: '2' },
    { display: '3', latex: '3', variant: 'dark', flexGrow: 1, ariaLabel: '3' },
    { display: '−', latex: '-', variant: 'light', flexGrow: 1, ariaLabel: 'Minus' },
    { display: '', latex: '', variant: 'light', flexGrow: 1, ariaLabel: '', isSpacer: true },
    { display: '⌫', latex: '', variant: 'dark', flexGrow: 1.5, ariaLabel: 'Backspace', command: 'BACKSPACE' },
  ],
  // Row 4: ABC mode, Audio, Special symbols, Numbers, Enter
  [
    { display: 'A B C', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Toggle Letters', command: 'TOGGLE_ABC' },
    { display: '🔊', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Toggle Audio Trace', command: 'AUDIO' },
    { display: '\\sqrt{}', latex: '\\sqrt{}', variant: 'light', flexGrow: 1, ariaLabel: 'Square Root', useKatex: true },
    { display: '\\pi', latex: '\\pi', variant: 'light', flexGrow: 1, ariaLabel: 'Pi', useKatex: true },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '0', latex: '0', variant: 'dark', flexGrow: 1, ariaLabel: '0' },
    { display: '.', latex: '.', variant: 'dark', flexGrow: 1, ariaLabel: 'Decimal' },
    { display: '=', latex: '=', variant: 'light', flexGrow: 1, ariaLabel: 'Equals' },
    { display: '+', latex: '+', variant: 'light', flexGrow: 1, ariaLabel: 'Plus' },
    { display: '', latex: '', variant: 'light', flexGrow: 0.5, ariaLabel: '', isSpacer: true },
    { display: '↵', latex: '', variant: 'blue', flexGrow: 2, ariaLabel: 'Enter', command: 'ENTER' },
  ],
];

/**
 * ABC keyboard layout (letter mode)
 * Activated when ABC button is pressed
 */
export const ABC_KEYBOARD_LAYOUT: KeyboardButton[][] = [
  // Row 1: q-p
  [
    { display: 'q', latex: 'q', variant: 'light', flexGrow: 1, ariaLabel: 'q' },
    { display: 'w', latex: 'w', variant: 'light', flexGrow: 1, ariaLabel: 'w' },
    { display: 'e', latex: 'e', variant: 'light', flexGrow: 1, ariaLabel: 'e' },
    { display: 'r', latex: 'r', variant: 'light', flexGrow: 1, ariaLabel: 'r' },
    { display: 't', latex: 't', variant: 'light', flexGrow: 1, ariaLabel: 't' },
    { display: 'y', latex: 'y', variant: 'light', flexGrow: 1, ariaLabel: 'y' },
    { display: 'u', latex: 'u', variant: 'light', flexGrow: 1, ariaLabel: 'u' },
    { display: 'i', latex: 'i', variant: 'light', flexGrow: 1, ariaLabel: 'i' },
    { display: 'o', latex: 'o', variant: 'light', flexGrow: 1, ariaLabel: 'o' },
    { display: 'p', latex: 'p', variant: 'light', flexGrow: 1, ariaLabel: 'p' },
  ],
  // Row 2: a-θ
  [
    { display: 'a', latex: 'a', variant: 'light', flexGrow: 1, ariaLabel: 'a' },
    { display: 's', latex: 's', variant: 'light', flexGrow: 1, ariaLabel: 's' },
    { display: 'd', latex: 'd', variant: 'light', flexGrow: 1, ariaLabel: 'd' },
    { display: 'f', latex: 'f', variant: 'light', flexGrow: 1, ariaLabel: 'f' },
    { display: 'g', latex: 'g', variant: 'light', flexGrow: 1, ariaLabel: 'g' },
    { display: 'h', latex: 'h', variant: 'light', flexGrow: 1, ariaLabel: 'h' },
    { display: 'j', latex: 'j', variant: 'light', flexGrow: 1, ariaLabel: 'j' },
    { display: 'k', latex: 'k', variant: 'light', flexGrow: 1, ariaLabel: 'k' },
    { display: 'l', latex: 'l', variant: 'light', flexGrow: 1, ariaLabel: 'l' },
    { display: '\\theta', latex: '\\theta', variant: 'light', flexGrow: 1, ariaLabel: 'theta', useKatex: true },
  ],
  // Row 3: shift, z-m, backspace
  [
    { display: '⬆', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Shift', command: 'SHIFT' },
    { display: 'z', latex: 'z', variant: 'light', flexGrow: 1, ariaLabel: 'z' },
    { display: 'x', latex: 'x', variant: 'light', flexGrow: 1, ariaLabel: 'x' },
    { display: 'c', latex: 'c', variant: 'light', flexGrow: 1, ariaLabel: 'c' },
    { display: 'v', latex: 'v', variant: 'light', flexGrow: 1, ariaLabel: 'v' },
    { display: 'b', latex: 'b', variant: 'light', flexGrow: 1, ariaLabel: 'b' },
    { display: 'n', latex: 'n', variant: 'light', flexGrow: 1, ariaLabel: 'n' },
    { display: 'm', latex: 'm', variant: 'light', flexGrow: 1, ariaLabel: 'm' },
    { display: '⌫', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Backspace', command: 'BACKSPACE' },
  ],
  // Row 4: 123, subscript, special chars, enter
  [
    { display: '123', latex: '', variant: 'dark', flexGrow: 1, ariaLabel: 'Toggle Numbers', command: 'TOGGLE_123' },
    { display: 'a_b', latex: '_{}', variant: 'light', flexGrow: 1, ariaLabel: 'Subscript', useKatex: true },
    { display: '!%', latex: '', variant: 'light', flexGrow: 1, ariaLabel: 'Special characters', command: 'SPECIAL' },
    { display: '[ ]', latex: '[]', variant: 'light', flexGrow: 1, ariaLabel: 'Brackets' },
    { display: '{ }', latex: '\\{\\}', variant: 'light', flexGrow: 1, ariaLabel: 'Braces' },
    { display: '~.', latex: '', variant: 'light', flexGrow: 1, ariaLabel: 'Tilde dot', command: 'TILDE_DOT' },
    { display: ',', latex: ',', variant: 'light', flexGrow: 1, ariaLabel: 'Comma' },
    { display: '↵', latex: '', variant: 'blue', flexGrow: 1, ariaLabel: 'Enter', command: 'ENTER' },
  ],
];
