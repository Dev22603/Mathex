/**
 * Core type definitions for Mathex
 */

/**
 * Configuration for a single keyboard button
 */
export interface ButtonConfig {
  /** Text/symbol displayed on the button */
  display: string;
  /** LaTeX string to insert when button is clicked */
  latex: string;
  /** Type of button for styling purposes */
  type: 'symbol' | 'number' | 'operator' | 'function' | 'action' | 'letter' | 'variable';
  /** Button style (background color variant) */
  style?: 'white' | 'gray-light' | 'gray-medium' | 'gray-dark' | 'blue';
  /** Button size variant */
  size?: 'standard' | 'wide' | 'extra-wide';
  /** Optional tooltip description */
  description?: string;
  /** Optional dual-character configuration for shift-toggle buttons */
  dualChar?: {
    /** Primary character (shown clear when shift is OFF) */
    primary: string;
    /** Primary LaTeX to insert when shift is OFF */
    primaryLatex: string;
    /** Secondary character (shown clear when shift is ON) */
    secondary: string;
    /** Secondary LaTeX to insert when shift is ON */
    secondaryLatex: string;
  };
}

/**
 * Configuration for a function category in the functions panel
 */
export interface FunctionCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display name for the category header */
  name: string;
  /** List of functions in this category */
  functions: FunctionConfig[];
}

/**
 * Configuration for a single function button
 */
export interface FunctionConfig {
  /** Label displayed on the function button */
  display: string;
  /** LaTeX string to insert when function is selected */
  latex: string;
  /** Optional tooltip description */
  description?: string;
}

/**
 * Keyboard mode configuration
 */
export interface KeyboardMode {
  /** Unique identifier for the mode */
  id: string;
  /** Display name for the mode */
  name: string;
  /** 2D array of button configurations (rows and columns) */
  buttons: ButtonConfig[][];
  /** IDs of function categories to include in this mode */
  functionCategories: string[];
}

/**
 * Theme configuration for styling
 */
export interface ThemeConfig {
  colors?: {
    primary?: string;
    background?: string;
    text?: string;
    border?: string;
    buttonHover?: string;
    error?: string;
  };
  sizing?: {
    fontSize?: string;
    buttonWidth?: string;
    buttonHeight?: string;
  };
  spacing?: {
    buttonGap?: string;
    sectionGap?: string;
  };
}

/**
 * Cursor state within a math input
 */
export interface CursorState {
  /** Character index in the LaTeX string */
  position: number;
  /** Optional selection range */
  selection?: {
    start: number;
    end: number;
  };
}

/**
 * Internal state for a single MathInput component
 */
export interface MathInputState {
  /** Unique identifier for this input */
  id: string;
  /** Current LaTeX string */
  latex: string;
  /** Cursor state */
  cursor: CursorState;
  /** Whether this input is focused */
  focused: boolean;
  /** Any rendering error */
  error: Error | null;
}
