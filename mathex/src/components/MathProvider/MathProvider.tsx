import React, { createContext, useContext, type ReactNode } from 'react';
import type { ThemeConfig, MathInputState } from '../../types';

/**
 * Props for the MathProvider component
 */
export interface MathProviderProps {
  /** Child components */
  children: ReactNode;
  /** Theme configuration (light, dark, or custom) */
  theme?: 'light' | 'dark' | ThemeConfig;
  /** Global configuration options */
  config?: {
    /** Default keyboard mode */
    defaultKeyboardMode?: 'basic' | 'calculus' | 'chemistry';
    /** KaTeX rendering options */
    katexOptions?: any; // TODO: Import from @types/katex
  };
}

/**
 * Context value shape
 */
interface MathContextValue {
  activeInputId: string | null;
  setActiveInput: (id: string | null) => void;
  keyboardVisible: boolean;
  toggleKeyboard: () => void;
  insertAtCursor: (latex: string) => void;
  registerInput: (id: string, state: MathInputState) => void;
  unregisterInput: (id: string) => void;
}

/**
 * Context for sharing state between MathInput and MathKeyboard
 */
const MathContext = createContext<MathContextValue | undefined>(undefined);

/**
 * Hook to access the math context
 */
export const useMathContext = () => {
  const context = useContext(MathContext);
  if (!context) {
    throw new Error('useMathContext must be used within a MathProvider');
  }
  return context;
};

/**
 * MathProvider - Context provider for Mathex components
 *
 * Manages global state and communication between MathInput and MathKeyboard.
 * Components will work automatically even without explicit MathProvider wrapping.
 *
 * @component
 * @example
 * ```tsx
 * <MathProvider theme="light">
 *   <MathInput />
 *   <MathKeyboard />
 * </MathProvider>
 * ```
 */
export const MathProvider: React.FC<MathProviderProps> = ({ children }) => {
  // TODO: Implement in Phase 3
  const contextValue: MathContextValue = {
    activeInputId: null,
    setActiveInput: () => {},
    keyboardVisible: false,
    toggleKeyboard: () => {},
    insertAtCursor: () => {},
    registerInput: () => {},
    unregisterInput: () => {},
  };

  return (
    <MathContext.Provider value={contextValue}>
      {children}
    </MathContext.Provider>
  );
};

MathProvider.displayName = 'MathProvider';
