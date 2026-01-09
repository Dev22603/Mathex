import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useMathContext } from '../MathProvider/MathProvider';
import './MathInput.css';

// Use global MathQuill (loaded via CDN or script tag)
declare global {
  interface Window {
    MathQuill: any;
  }
}

// Helper to get MathQuill API
const getMQ = () => {
  if (typeof window !== 'undefined' && window.MathQuill) {
    return window.MathQuill.getInterface(2);
  }
  return null;
};

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
 * MathInput - A WYSIWYG math equation editor using MathQuill
 *
 * This component provides a Desmos-like editing experience where you edit
 * rendered mathematical notation directly, not raw LaTeX.
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
  value: controlledValue,
  defaultValue = '',
  onChange,
  id,
  placeholder = 'Enter equation...',
  disabled = false,
  className = '',
  style,
  autoFocus = false,
  readOnly = false,
  onError,
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const latex = isControlled ? controlledValue : uncontrolledValue;

  // State
  const [isFocused, setIsFocused] = useState(false);

  // Refs
  const mathFieldRef = useRef<any>(null); // MathQuill MathField instance
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate unique ID if not provided
  const inputId = useMemo(() => id || `math-input-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // Get context (optional - component works without provider)
  const mathContext = useMathContext();

  /**
   * Initialize MathQuill on mount
   */
  useEffect(() => {
    if (!containerRef.current || mathFieldRef.current) return;

    const MQ = getMQ();
    if (!MQ) {
      console.error('MathQuill is not loaded. Make sure to include MathQuill script in your HTML.');
      return;
    }

    try {
      const config = {
        spaceBehavesLikeTab: true,
        leftRightIntoCmdGoes: 'up' as const,
        restrictMismatchedBrackets: true,
        autoCommands: 'pi theta sqrt sum prod int',
        autoOperatorNames: 'sin cos tan sec csc cot sinh cosh tanh log ln',
        handlers: {
          edit: (mathField: any) => {
            const newLatex = mathField.latex();
            if (isControlled) {
              onChange?.(newLatex);
            } else {
              setUncontrolledValue(newLatex);
              onChange?.(newLatex);
            }
          },
          enter: () => {
            // Blur on Enter key
            mathFieldRef.current?.blur();
          },
        },
      };

      const mathField = MQ.MathField(containerRef.current, config);
      mathFieldRef.current = mathField;

      // Set initial value
      mathField.latex(latex);

      // Handle focus/blur
      const element = containerRef.current;
      const handleFocusIn = () => {
        setIsFocused(true);
        // Notify context that this input is now active
        if (mathContext) {
          mathContext.setActiveInput(inputId);
        }
      };
      const handleFocusOut = () => {
        setIsFocused(false);
      };

      element.addEventListener('focusin', handleFocusIn);
      element.addEventListener('focusout', handleFocusOut);

      // Auto-focus if requested
      if (autoFocus) {
        mathField.focus();
      }

      return () => {
        element.removeEventListener('focusin', handleFocusIn);
        element.removeEventListener('focusout', handleFocusOut);
        mathField.revert();
        mathFieldRef.current = null;
      };
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      }
      console.error('Failed to initialize MathQuill:', error);
    }
  }, []);

  /**
   * Update MathQuill when controlled value changes externally
   */
  useEffect(() => {
    if (mathFieldRef.current && isControlled) {
      const currentLatex = mathFieldRef.current.latex();
      if (currentLatex !== controlledValue) {
        mathFieldRef.current.latex(controlledValue);
      }
    }
  }, [controlledValue, isControlled]);

  /**
   * Handle focus
   */
  const handleFocus = useCallback(() => {
    if (mathFieldRef.current && !disabled && !readOnly) {
      mathFieldRef.current.focus();
      // Notify provider that this input is now active
      if (mathContext) {
        mathContext.setActiveInput(inputId);
      }
    }
  }, [mathContext, inputId, disabled, readOnly]);

  /**
   * Handle keyboard insertions from MathKeyboard
   */
  const handleKeyboardInsertion = useCallback(
    (insertedLatex: string) => {
      if (!mathFieldRef.current) return;

      // Ensure MathQuill is focused before inserting
      mathFieldRef.current.focus();

      if (insertedLatex === 'BACKSPACE') {
        // Simulate backspace
        mathFieldRef.current.keystroke('Backspace');
      } else {
        // Insert LaTeX at cursor
        mathFieldRef.current.write(insertedLatex);
      }
    },
    []
  );

  /**
   * Register with provider on mount, unregister on unmount
   */
  useEffect(() => {
    if (mathContext) {
      mathContext.registerInput(inputId, handleKeyboardInsertion);
      return () => {
        mathContext.unregisterInput(inputId);
      };
    }
  }, [mathContext, inputId, handleKeyboardInsertion]);

  /**
   * Update disabled/readonly state
   */
  useEffect(() => {
    if (mathFieldRef.current && containerRef.current) {
      if (disabled || readOnly) {
        containerRef.current.setAttribute('contenteditable', 'false');
        containerRef.current.style.pointerEvents = 'none';
        containerRef.current.style.opacity = '0.6';
      } else {
        containerRef.current.removeAttribute('contenteditable');
        containerRef.current.style.pointerEvents = '';
        containerRef.current.style.opacity = '';
      }
    }
  }, [disabled, readOnly]);

  return (
    <div
      className={`mathex-input mathex-input--mathquill ${isFocused ? 'mathex-input--focused' : ''} ${
        disabled ? 'mathex-input--disabled' : ''
      } ${className}`}
      style={style}
      onClick={handleFocus}
      data-id={id}
    >
      <div
        ref={containerRef}
        className="mathex-mathquill-container"
        data-placeholder={!latex ? placeholder : undefined}
      />
    </div>
  );
};

MathInput.displayName = 'MathInput';
