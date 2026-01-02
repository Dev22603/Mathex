/**
 * MathProvider - Context Provider for Math Editor
 *
 * Manages global state for multiple MathInput components and shared MathKeyboard.
 * Handles input registration, focus tracking, and keyboard routing.
 */

import { useState, useCallback, useMemo } from 'react';
import type { MathProviderProps, MathInputState, KeyboardMode, ThemeConfig } from '../../types';
import { MathContext } from './MathContext';

/**
 * MathProvider Component
 *
 * Wrap your application or section with this provider to enable multi-input
 * communication and shared keyboard functionality.
 *
 * @example
 * ```tsx
 * <MathProvider>
 *   <MathInput id="input1" />
 *   <MathInput id="input2" />
 *   <MathKeyboard />
 * </MathProvider>
 * ```
 */
export const MathProvider: React.FC<MathProviderProps> = ({
  children,
  theme = 'light',
  config,
}) => {
  // State management
  const [activeInputId, setActiveInputId] = useState<string | null>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardMode, setKeyboardMode] = useState<KeyboardMode>(
    config?.defaultKeyboardMode || 'basic'
  );
  const [inputs, setInputs] = useState<Map<string, MathInputState>>(new Map());

  // Parse theme configuration
  const themeConfig: ThemeConfig = useMemo(() => {
    if (typeof theme === 'string') {
      // Built-in theme ('light' or 'dark')
      return {}; // Will use default CSS variables
    }
    return theme;
  }, [theme]);

  /**
   * Register a new input component
   */
  const registerInput = useCallback((id: string, state: MathInputState) => {
    setInputs((prev) => {
      const next = new Map(prev);
      next.set(id, state);
      return next;
    });
  }, []);

  /**
   * Unregister an input component
   */
  const unregisterInput = useCallback((id: string) => {
    setInputs((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });

    // Clear active input if it was the one being unregistered
    setActiveInputId((current) => (current === id ? null : current));
  }, []);

  /**
   * Set the currently active (focused) input
   */
  const setActive = useCallback((id: string | null) => {
    setActiveInputId(id);
  }, []);

  /**
   * Toggle keyboard visibility
   */
  const toggleKeyboard = useCallback(() => {
    setKeyboardVisible((prev) => !prev);
  }, []);

  /**
   * Set keyboard mode (basic, calculus, chemistry)
   */
  const setMode = useCallback((mode: KeyboardMode) => {
    setKeyboardMode(mode);
  }, []);

  /**
   * Insert LaTeX at cursor position in the active input
   *
   * This is called by the MathKeyboard when a button is clicked.
   * It finds the active input and updates its state.
   */
  const insertAtCursor = useCallback(
    (latex: string) => {
      if (!activeInputId) {
        console.warn('MathProvider: No active input to insert LaTeX into');
        return;
      }

      const activeInput = inputs.get(activeInputId);
      if (!activeInput) {
        console.warn(`MathProvider: Active input "${activeInputId}" not found in registered inputs`);
        return;
      }

      // The actual insertion logic will be handled by the MathInput component
      // We'll dispatch a custom event that the active input will listen for
      const event = new CustomEvent('math-insert', {
        detail: { inputId: activeInputId, latex },
      });
      window.dispatchEvent(event);
    },
    [activeInputId, inputs]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      activeInputId,
      keyboardVisible,
      keyboardMode,
      inputs,
      theme: themeConfig,
      registerInput,
      unregisterInput,
      setActiveInput: setActive,
      toggleKeyboard,
      setKeyboardMode: setMode,
      insertAtCursor,
    }),
    [
      activeInputId,
      keyboardVisible,
      keyboardMode,
      inputs,
      themeConfig,
      registerInput,
      unregisterInput,
      setActive,
      toggleKeyboard,
      setMode,
      insertAtCursor,
    ]
  );

  return <MathContext.Provider value={contextValue}>{children}</MathContext.Provider>;
};
