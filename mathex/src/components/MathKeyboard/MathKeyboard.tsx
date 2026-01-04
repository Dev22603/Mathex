import React from 'react';
import type { KeyboardMode } from '../../types';

/**
 * Props for the MathKeyboard component
 */
export interface MathKeyboardProps {
  /** Keyboard mode (basic, calculus, chemistry, or custom config) */
  mode?: 'basic' | 'calculus' | 'chemistry' | KeyboardMode;
  /** Positioning style for the keyboard */
  position?: 'fixed-bottom' | 'floating';
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether keyboard is visible by default */
  defaultVisible?: boolean;
  /** Whether to show the toggle button */
  showToggleButton?: boolean;
}

/**
 * MathKeyboard - A virtual keyboard for inserting mathematical symbols
 *
 * Provides a touch/click interface for inserting LaTeX symbols and functions
 * into the currently focused MathInput component.
 *
 * @component
 * @example
 * ```tsx
 * <MathKeyboard
 *   mode="calculus"
 *   position="fixed-bottom"
 *   defaultVisible={true}
 * />
 * ```
 */
export const MathKeyboard: React.FC<MathKeyboardProps> = ({
  mode = 'basic',
  position = 'fixed-bottom',
  className,
  style,
  defaultVisible = true,
}) => {
  // TODO: Implement in Phase 2
  return (
    <div
      className={className}
      style={{
        position: position === 'fixed-bottom' ? 'fixed' : 'relative',
        bottom: position === 'fixed-bottom' ? 0 : undefined,
        left: 0,
        right: 0,
        backgroundColor: '#F5F5F5',
        borderTop: '1px solid #D0D0D0',
        padding: '16px',
        display: defaultVisible ? 'block' : 'none',
        borderRadius: '8px 8px 0 0',
        zIndex: 1000,
        ...style,
      }}
    >
      <div style={{ textAlign: 'center', color: '#666' }}>
        Math Keyboard (Mode: {typeof mode === 'string' ? mode : mode.name})
        <br />
        <small>Will be implemented in Phase 2</small>
      </div>
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';
