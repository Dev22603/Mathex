import React from 'react';

/**
 * Props for the MathInput component
 */
export interface MathInputProps {
  /** Controlled LaTeX value */
  value?: string;
  /** Default LaTeX value (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the LaTeX changes */
  onChange?: (latex: string) => void;
  /** Unique identifier for this input */
  id?: string;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether to focus on mount */
  autoFocus?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Callback fired on errors */
  onError?: (error: Error) => void;
}

/**
 * MathInput - An input field for editing mathematical equations
 *
 * This component renders LaTeX equations in real-time using KaTeX
 * and provides an interactive editing experience similar to Desmos.
 *
 * @component
 * @example
 * ```tsx
 * <MathInput
 *   value={latex}
 *   onChange={(newLatex) => setLatex(newLatex)}
 *   placeholder="Enter equation..."
 * />
 * ```
 */
export const MathInput: React.FC<MathInputProps> = ({
  value,
  defaultValue,
  placeholder = 'Enter equation...',
  disabled = false,
  className,
  style,
}) => {
  // TODO: Implement in Phase 1
  return (
    <div
      className={className}
      style={{
        border: '2px solid #D0D0D0',
        borderRadius: '4px',
        padding: '12px 16px',
        minHeight: '48px',
        backgroundColor: disabled ? '#F5F5F5' : '#FFFFFF',
        cursor: disabled ? 'not-allowed' : 'text',
        ...style,
      }}
    >
      {value || defaultValue || (
        <span style={{ color: '#999' }}>{placeholder}</span>
      )}
    </div>
  );
};

MathInput.displayName = 'MathInput';
