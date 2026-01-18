import React, { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { ThemeConfig } from '../../types';

// Debug logging helper
const DEBUG = false;
const log = (component: string, action: string, data?: any) => {
  if (DEBUG) {
    console.log(`[${component}] ${action}`, data !== undefined ? data : '');
  }
};

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
 */
export type InputUpdateCallback = (latex: string) => void;

/**
 * Context value shape
 */
interface MathContextValue {
  activeInputId: string | null;
  setActiveInput: (id: string) => void;
  insertAtCursor: (latex: string) => void;
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

  // Ref to access activeInputId in callbacks without causing re-renders
  const activeInputIdRef = useRef<string | null>(null);
  activeInputIdRef.current = activeInputId;

  // Registry of input update callbacks
  const inputCallbacksRef = useRef<Map<string, InputUpdateCallback>>(new Map());

  /**
   * Register an input with its update callback
   */
  const registerInput = useCallback((id: string, updateCallback: InputUpdateCallback) => {
    log('MathProvider', 'registerInput', { id, totalRegistered: inputCallbacksRef.current.size + 1 });
    inputCallbacksRef.current.set(id, updateCallback);
  }, []);

  /**
   * Unregister an input
   */
  const unregisterInput = useCallback((id: string) => {
    log('MathProvider', 'unregisterInput', { id, totalRemaining: inputCallbacksRef.current.size - 1 });
    inputCallbacksRef.current.delete(id);
    setActiveInputId((current) => (current === id ? null : current));
  }, []);

  /**
   * Set the active input (called when an input receives focus)
   * NOTE: No dependencies needed - we just call the setter
   */
  const setActiveInput = useCallback((id: string) => {
    log('MathProvider', 'setActiveInput', { id });
    setActiveInputId(id);
  }, []);

  /**
   * Insert LaTeX at the cursor position of the active input
   * NOTE: Uses ref to access activeInputId to avoid dependency that causes context churn
   */
  const insertAtCursor = useCallback(
    (latex: string) => {
      const currentActiveId = activeInputIdRef.current;
      log('MathProvider', 'insertAtCursor called', {
        latex,
        activeInputId: currentActiveId,
        hasCallback: currentActiveId ? inputCallbacksRef.current.has(currentActiveId) : false,
        registeredInputs: Array.from(inputCallbacksRef.current.keys())
      });

      if (!currentActiveId) {
        log('MathProvider', 'WARNING: No active input to insert LaTeX into');
        console.warn('No active input to insert LaTeX into');
        return;
      }

      const updateCallback = inputCallbacksRef.current.get(currentActiveId);
      if (updateCallback) {
        log('MathProvider', 'Calling update callback for active input', { activeInputId: currentActiveId, latex });
        // Pass the command/latex to the input handler
        updateCallback(latex);
      } else {
        log('MathProvider', 'ERROR: No callback found for activeInputId', { activeInputId: currentActiveId });
      }
    },
    [] // Empty deps - uses refs to access current values
  );

  const contextValue: MathContextValue = {
    activeInputId,
    setActiveInput,
    insertAtCursor,
    registerInput,
    unregisterInput,
    theme,
  };

  // Determine theme attribute value (support both string and custom ThemeConfig)
  const themeAttr = typeof theme === 'string' ? theme : 'custom';

  log('MathProvider', 'rendering with contextValue', { activeInputId, registeredInputs: Array.from(inputCallbacksRef.current.keys()) });

  return (
    <MathContext.Provider value={contextValue}>
      <div data-theme={themeAttr} className="mathex-provider">
        {children}
      </div>
    </MathContext.Provider>
  );
};

MathProvider.displayName = 'MathProvider';
