/**
 * Type definitions for Math Equation Editor
 */

export interface MathInputProps {
  /** LaTeX string value (controlled component) */
  value?: string;
  /** LaTeX string default value (uncontrolled component) */
  defaultValue?: string;
  /** Callback fired when LaTeX value changes */
  onChange?: (latex: string) => void;
  /** Unique identifier for the input */
  id?: string;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Disable the input */
  disabled?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Make input read-only */
  readOnly?: boolean;
  /** Callback fired when LaTeX rendering error occurs */
  onError?: (error: Error) => void;
}

export interface MathKeyboardProps {
  /** Keyboard mode/layout */
  mode?: KeyboardMode;
  /** Positioning style */
  position?: 'fixed-bottom' | 'floating';
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Default visibility state */
  defaultVisible?: boolean;
  /** Show keyboard toggle button */
  showToggleButton?: boolean;
  /** Custom button configurations */
  customButtons?: ButtonConfig[];
}

export interface MathProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Theme configuration */
  theme?: 'light' | 'dark' | ThemeConfig;
  /** Global configuration */
  config?: MathEditorConfig;
}

export interface MathEditorConfig {
  /** Default keyboard mode */
  defaultKeyboardMode?: KeyboardMode;
  /** KaTeX rendering options */
  katexOptions?: KaTeXOptions;
}

export interface ThemeConfig {
  /** Color scheme */
  colors?: {
    primary?: string;
    background?: string;
    text?: string;
    border?: string;
    buttonHover?: string;
  };
  /** Sizing options */
  sizing?: {
    fontSize?: string;
    buttonWidth?: string;
    buttonHeight?: string;
  };
}

export interface KaTeXOptions {
  /** Throw on error or display error */
  throwOnError?: boolean;
  /** Display mode (block vs inline) */
  displayMode?: boolean;
  /** Enable trust mode for certain commands */
  trust?: boolean;
}

export type KeyboardMode = 'basic' | 'calculus' | 'chemistry' | 'custom';

export interface ButtonConfig {
  /** Display text/symbol on button */
  display: string;
  /** LaTeX string to insert */
  latex: string;
  /** Button type */
  type: 'symbol' | 'number' | 'operator' | 'function' | 'template';
  /** Optional tooltip */
  tooltip?: string;
}

export interface CursorState {
  /** Cursor position (character index in LaTeX string) */
  position: number;
  /** Selection range (if any) */
  selection?: {
    start: number;
    end: number;
  };
}

export interface MathInputState {
  /** Unique identifier */
  id: string;
  /** Current LaTeX string */
  latex: string;
  /** Cursor state */
  cursor: CursorState;
  /** Focus state */
  focused: boolean;
  /** Error state */
  error: Error | null;
}

export interface MathContextState {
  /** Currently active (focused) input ID */
  activeInputId: string | null;
  /** Keyboard visibility state */
  keyboardVisible: boolean;
  /** Current keyboard mode */
  keyboardMode: KeyboardMode;
  /** Map of registered inputs */
  inputs: Map<string, MathInputState>;
  /** Theme configuration */
  theme: ThemeConfig;

  // Actions
  /** Register a new input */
  registerInput: (id: string, state: MathInputState) => void;
  /** Unregister an input */
  unregisterInput: (id: string) => void;
  /** Set the active input */
  setActiveInput: (id: string | null) => void;
  /** Toggle keyboard visibility */
  toggleKeyboard: () => void;
  /** Set keyboard mode */
  setKeyboardMode: (mode: KeyboardMode) => void;
  /** Insert LaTeX at cursor position in active input */
  insertAtCursor: (latex: string) => void;
}

export interface Template {
  /** LaTeX template with placeholder (|) */
  latex: string;
  /** Cursor position after insertion */
  cursorPos: number;
  /** Placeholder positions */
  placeholders: Array<{ start: number; end: number }>;
}

export interface FunctionCategory {
  /** Unique category ID */
  id: string;
  /** Display name */
  name: string;
  /** Functions in this category */
  functions: FunctionConfig[];
}

export interface FunctionConfig {
  /** Display text on button */
  display: string;
  /** LaTeX to insert */
  latex: string;
  /** Description/tooltip */
  description?: string;
  /** Is this a template with placeholders */
  isTemplate?: boolean;
}
