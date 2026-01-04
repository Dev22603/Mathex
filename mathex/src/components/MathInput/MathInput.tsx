import React, { useState, useRef, useEffect, useCallback } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './MathInput.css';

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
  const [hasError, setHasError] = useState(false);
  const [renderedHTML, setRenderedHTML] = useState('');

  // Refs
  const inputRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  /**
   * Render LaTeX to HTML using KaTeX
   */
  const renderLatex = useCallback(
    (latexString: string): string => {
      if (!latexString) return '';

      try {
        const html = katex.renderToString(latexString, {
          throwOnError: false,
          displayMode: false,
          output: 'html',
          strict: false,
        });
        setHasError(false);
        return html;
      } catch (error) {
        setHasError(true);
        if (onError && error instanceof Error) {
          onError(error);
        }
        // Return raw LaTeX on error
        return `<span class="mathex-error">${latexString}</span>`;
      }
    },
    [onError]
  );

  /**
   * Update rendered HTML when LaTeX changes
   */
  useEffect(() => {
    const html = renderLatex(latex);
    setRenderedHTML(html);
  }, [latex, renderLatex]);

  /**
   * Handle input changes from contentEditable
   */
  const handleInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return;

      const newLatex = e.currentTarget.textContent || '';

      if (isControlled) {
        onChange?.(newLatex);
      } else {
        setUncontrolledValue(newLatex);
        onChange?.(newLatex);
      }
    },
    [readOnly, disabled, isControlled, onChange]
  );

  /**
   * Handle focus
   */
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  /**
   * Handle blur
   */
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  /**
   * Handle keyboard events
   * Note: Advanced cursor positioning will be implemented in Phase 4
   */
  const handleKeyDown = useCallback(
    (_e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly || disabled) return;
      // Phase 1: Basic keyboard input only
      // Full navigation will be added in Phase 4
    },
    [readOnly, disabled]
  );

  /**
   * Handle click to focus
   */
  const handleClick = useCallback(() => {
    if (disabled || readOnly) return;
    contentEditableRef.current?.focus();
  }, [disabled, readOnly]);

  /**
   * Auto-focus on mount if requested
   */
  useEffect(() => {
    if (autoFocus && contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, [autoFocus]);

  /**
   * Update contentEditable text content when LaTeX changes externally
   */
  useEffect(() => {
    if (contentEditableRef.current && !isFocused) {
      contentEditableRef.current.textContent = latex;
    }
  }, [latex, isFocused]);

  return (
    <div
      ref={inputRef}
      className={`mathex-input ${isFocused ? 'mathex-input--focused' : ''} ${
        hasError ? 'mathex-input--error' : ''
      } ${disabled ? 'mathex-input--disabled' : ''} ${className}`}
      style={style}
      onClick={handleClick}
      data-id={id}
    >
      {/* Rendered math display (shown when not focused or when empty) */}
      {!isFocused && latex && (
        <div
          className="mathex-rendered"
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
      )}

      {/* ContentEditable input (shown when focused) */}
      {isFocused && (
        <div
          ref={contentEditableRef}
          className="mathex-editable"
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        >
          {latex}
        </div>
      )}

      {/* Placeholder (shown when empty and not focused) */}
      {!latex && !isFocused && (
        <div className="mathex-placeholder">{placeholder}</div>
      )}

      {/* Cursor indicator (shown when focused) */}
      {isFocused && <div className="mathex-cursor" />}

      {/* Error indicator */}
      {hasError && (
        <div className="mathex-error-icon" title="Invalid LaTeX syntax">
          ⚠️
        </div>
      )}
    </div>
  );
};

MathInput.displayName = 'MathInput';
