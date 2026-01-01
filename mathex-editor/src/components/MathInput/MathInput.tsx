import { useState, useEffect, useRef, useId } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import clsx from 'clsx';
import type { MathInputProps } from '../../types';
import './MathInput.css';

/**
 * MathInput Component
 *
 * A specialized text input field for mathematical equations with real-time LaTeX rendering.
 * Supports both hardware keyboard and visual math keyboard input.
 */
export const MathInput: React.FC<MathInputProps> = ({
  value,
  defaultValue = '',
  onChange,
  id,
  placeholder = 'Enter equation...',
  disabled = false,
  className,
  style,
  autoFocus = false,
  readOnly = false,
  onError,
}) => {
  // Generate unique ID if not provided
  const generatedId = useId();
  const inputId = id || generatedId;

  // State management
  const [latex, setLatex] = useState(value ?? defaultValue);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [cursorPosition, setCursorPosition] = useState(latex.length);

  // Refs
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with controlled value prop
  useEffect(() => {
    if (value !== undefined) {
      setLatex(value);
    }
  }, [value]);

  // Auto focus
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  /**
   * Render LaTeX to HTML using KaTeX
   */
  const renderLatex = (latexString: string): string => {
    if (!latexString.trim()) {
      return '';
    }

    try {
      const html = katex.renderToString(latexString, {
        throwOnError: false,
        displayMode: false,
        output: 'html',
      });

      // Clear any previous errors
      if (error) {
        setError(null);
      }

      return html;
    } catch (err) {
      const error = err as Error;
      setError(error);

      if (onError) {
        onError(error);
      }

      // Return raw LaTeX on error
      return latexString;
    }
  };

  /**
   * Handle input changes from keyboard
   */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLatex = e.target.value;
    setLatex(newLatex);

    if (onChange) {
      onChange(newLatex);
    }
  };

  /**
   * Handle focus event
   */
  const handleFocus = () => {
    setFocused(true);
  };

  /**
   * Handle blur event
   */
  const handleBlur = () => {
    setFocused(false);
  };

  /**
   * Handle click on rendered output (focus the input)
   */
  const handleRenderedClick = () => {
    if (!disabled && !readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Render the LaTeX content
  const renderedHtml = renderLatex(latex);
  const hasError = error !== null;
  const isEmpty = !latex.trim();

  return (
    <div
      ref={containerRef}
      className={clsx('math-input-container', className)}
      style={style}
    >
      <div
        className={clsx('math-input', {
          'math-input--focused': focused,
          'math-input--error': hasError,
          'math-input--disabled': disabled,
          'math-input--readonly': readOnly,
          'math-input--empty': isEmpty,
        })}
      >
        {/* Hidden input for LaTeX editing (Phase 1: simple approach) */}
        <input
          ref={inputRef}
          type="text"
          value={latex}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          className={clsx('math-input__text-input', {
            'math-input__text-input--visible': focused,
          })}
          aria-label="Math equation LaTeX input"
          aria-invalid={hasError}
          data-input-id={inputId}
          autoFocus={autoFocus}
        />

        {/* Rendered equation (visible when not focused) */}
        {!focused && (
          <div
            className="math-input__rendered-container"
            onClick={handleRenderedClick}
          >
            {isEmpty ? (
              <span className="math-input__placeholder">{placeholder}</span>
            ) : (
              <span
                className="math-input__rendered"
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            )}
          </div>
        )}
      </div>

      {/* Error indicator */}
      {hasError && (
        <span className="math-input__error-icon" title={error.message}>
          ⚠️
        </span>
      )}
    </div>
  );
};

export default MathInput;
