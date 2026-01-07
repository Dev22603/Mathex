import React, { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { ThemeConfig } from '../../types';

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
    defaultKeyboardMode?: 'basic' | 'calculus' | 'abc';
    /** KaTeX rendering options */
    katexOptions?: any;
  };
}

/**
 * Input registration callback type
 * Now supports cursor-aware operations
 */
export type InputUpdateCallback = (
  action: 'INSERT' | 'BACKSPACE' | 'DELETE' | 'ENTER',
  data?: string | { position: number; length?: number }
) => void;

/**
 * Context value shape
 */
interface MathContextValue {
  activeInputId: string | null;
  setActiveInput: (id: string) => void;
  insertAtCursor: (action: 'INSERT' | 'BACKSPACE' | 'DELETE' | 'ENTER', data?: string | { position: number; length?: number }) => void;
  registerInput: (id: string, updateCallback: InputUpdateCallback) => void;
  unregisterInput: (id: string) => void;
  theme: 'light' | 'dark' | ThemeConfig;
}

/**
 * Context for sharing state between MathInput and MathKeyboard
 */
const MathContext = createContext<MathContextValue | undefined>(undefined);

/**
 * Hook to access the math context
 * Optional - returns undefined if not within a provider
 */
export const useMathContext = () => {
  return useContext(MathContext);
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
export const MathProvider: React.FC<MathProviderProps> = ({
  children,
  theme = 'light',
}) => {
  // State for tracking active input
  const [activeInputId, setActiveInputId] = useState<string | null>(null);

  // Registry of input update callbacks
  const inputCallbacksRef = useRef<Map<string, InputUpdateCallback>>(new Map());

  /**
   * Register an input with its update callback
   */
  const registerInput = useCallback((id: string, updateCallback: InputUpdateCallback) => {
    inputCallbacksRef.current.set(id, updateCallback);
  }, []);

  /**
   * Unregister an input
   */
  const unregisterInput = useCallback((id: string) => {
    inputCallbacksRef.current.delete(id);
    setActiveInputId((current) => (current === id ? null : current));
  }, []);

  /**
   * Set the active input (called when an input receives focus)
   */
  const setActiveInput = useCallback((id: string) => {
    setActiveInputId(id);
  }, []);

  /**
   * Insert LaTeX at the cursor position of the active input
   */
  const insertAtCursor = useCallback(
    (action: 'INSERT' | 'BACKSPACE' | 'DELETE' | 'ENTER', data?: string | { position: number; length?: number }) => {
      if (!activeInputId) {
        console.warn('No active input to insert LaTeX into');
        return;
      }

      const updateCallback = inputCallbacksRef.current.get(activeInputId);
      if (updateCallback) {
        updateCallback(action, data);
      }
    },
    [activeInputId]
  );

  const contextValue: MathContextValue = {
    activeInputId,
    setActiveInput,
    insertAtCursor,
    registerInput,
    unregisterInput,
    theme,
  };

  return (
    <MathContext.Provider value={contextValue}>
      {children}
    </MathContext.Provider>
  );
};

MathProvider.displayName = 'MathProvider';
