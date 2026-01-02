/**
 * Math Equation Editor Component Library
 *
 * A React-based component library for visual math equation editing.
 * Provides a Desmos-like WYSIWYG experience with LaTeX rendering.
 */

// Components
export { MathInput } from './components/MathInput';
export { MathKeyboard, KeyboardButton } from './components/MathKeyboard';
export { MathProvider, useMathContext } from './components/MathProvider';

// Types
export type {
  MathInputProps,
  MathKeyboardProps,
  MathProviderProps,
  MathEditorConfig,
  ThemeConfig,
  KeyboardMode,
  ButtonConfig,
  CursorState,
  MathInputState,
  MathContextState,
  Template,
  FunctionCategory,
  FunctionConfig,
} from './types';
