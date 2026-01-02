/**
 * useMathContext Hook
 *
 * Custom hook to access the Math Editor context.
 * Provides type-safe access to context with helpful error messages.
 */

import { useContext } from 'react';
import { MathContext } from './MathContext';
import type { MathContextState } from '../../types';

/**
 * Hook to access the Math Editor context
 *
 * @throws Error if used outside of MathProvider
 * @returns Math context state and actions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { activeInputId, setActiveInput } = useMathContext();
 *   // Use context...
 * }
 * ```
 */
export function useMathContext(): MathContextState {
  const context = useContext(MathContext);

  if (!context) {
    throw new Error(
      'useMathContext must be used within a MathProvider. ' +
        'Wrap your component tree with <MathProvider>...</MathProvider>'
    );
  }

  return context;
}
