/**
 * MathContext - React Context for Math Editor State
 *
 * Provides global state management for multiple MathInput components
 * and shared MathKeyboard interaction.
 */

import { createContext } from 'react';
import type { MathContextState } from '../../types';

/**
 * Default context value (used when no provider is present)
 */
const defaultContextValue: MathContextState = {
  activeInputId: null,
  keyboardVisible: false,
  keyboardMode: 'basic',
  inputs: new Map(),
  theme: {},

  // Default no-op implementations
  registerInput: () => {
    console.warn('MathContext: registerInput called outside of MathProvider');
  },
  unregisterInput: () => {
    console.warn('MathContext: unregisterInput called outside of MathProvider');
  },
  setActiveInput: () => {
    console.warn('MathContext: setActiveInput called outside of MathProvider');
  },
  toggleKeyboard: () => {
    console.warn('MathContext: toggleKeyboard called outside of MathProvider');
  },
  setKeyboardMode: () => {
    console.warn('MathContext: setKeyboardMode called outside of MathProvider');
  },
  insertAtCursor: () => {
    console.warn('MathContext: insertAtCursor called outside of MathProvider');
  },
};

/**
 * Math Editor Context
 *
 * Use this context to access global math editor state and actions.
 * Must be used within a MathProvider.
 */
export const MathContext = createContext<MathContextState>(defaultContextValue);

/**
 * Display name for debugging
 */
MathContext.displayName = 'MathContext';
