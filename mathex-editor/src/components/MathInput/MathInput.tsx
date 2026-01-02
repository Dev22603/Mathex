import { useState, useEffect, useRef, useId, useContext } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import clsx from 'clsx';
import type { MathInputProps } from '../../types';
import { convertSlashToFrac } from '../../utils/autoConversions';
import { MathContext } from '../MathProvider/MathContext';
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
  autoConvert = true,
}) => {
  // Generate unique ID if not provided
  const generatedId = useId();
  const inputId = id || generatedId;

  // Optional context integration (works with or without MathProvider)
  const context = useContext(MathContext);
  const hasProvider = context && context.activeInputId !== undefined;

  // State management
  const [latex, setLatex] = useState(value ?? defaultValue);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [_cursorPosition, setCursorPosition] = useState(latex.length);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
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

  // Register with context on mount, unregister on unmount
  useEffect(() => {
    if (hasProvider && context) {
      const inputState = {
        id: inputId,
        latex,
        cursor: { position: _cursorPosition },
        focused,
        error,
      };
      context.registerInput(inputId, inputState);

      return () => {
        context.unregisterInput(inputId);
      };
    }
  }, [hasProvider]); // Only run on mount/unmount

  // Update context when state changes
  useEffect(() => {
    if (hasProvider && context) {
      const inputState = {
        id: inputId,
        latex,
        cursor: { position: _cursorPosition },
        focused,
        error,
      };
      context.registerInput(inputId, inputState);
    }
  }, [latex, _cursorPosition, focused, error, hasProvider, context, inputId]);

  // Listen for math-insert events from context
  useEffect(() => {
    const handleMathInsert = (event: Event) => {
      const customEvent = event as CustomEvent<{ inputId: string; latex: string }>;
      if (customEvent.detail.inputId === inputId) {
        // Insert LaTeX at current position
        const currentLatex = latex;
        const cursorPos = inputRef.current?.selectionStart || currentLatex.length;
        const before = currentLatex.substring(0, cursorPos);
        const after = currentLatex.substring(cursorPos);
        const newLatex = before + customEvent.detail.latex + after;

        setLatex(newLatex);
        if (onChange) {
          onChange(newLatex);
        }

        // Set cursor position after inserted text
        setTimeout(() => {
          if (inputRef.current) {
            const newCursorPos = cursorPos + customEvent.detail.latex.length;
            inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
            setCursorPosition(newCursorPos);
          }
        }, 0);
      }
    };

    window.addEventListener('math-insert', handleMathInsert);
    return () => {
      window.removeEventListener('math-insert', handleMathInsert);
    };
  }, [inputId, latex, onChange]);

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
    const input = e.target as HTMLInputElement;
    const newLatex = input.value;
    const cursorPos = input.selectionStart || 0;

    // Track cursor position
    setCursorPosition(cursorPos);

    // Apply auto-conversion if enabled and "/" was typed
    if (autoConvert && newLatex[cursorPos - 1] === '/') {
      const result = convertSlashToFrac(newLatex, cursorPos);

      if (result.converted) {
        setLatex(result.newLatex);
        if (onChange) {
          onChange(result.newLatex);
        }

        // Restore cursor position after React updates
        setTimeout(() => {
          if (input) {
            input.setSelectionRange(result.newCursorPos, result.newCursorPos);
            setCursorPosition(result.newCursorPos);
          }
        }, 0);
        return;
      }
    }

    // Normal flow if no conversion
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
    // Notify context that this input is now active
    if (hasProvider && context) {
      context.setActiveInput(inputId);
    }
  };

  /**
   * Handle blur event
   */
  const handleBlur = () => {
    setFocused(false);
    // Clear active input in context if this was the active one
    if (hasProvider && context && context.activeInputId === inputId) {
      context.setActiveInput(null);
    }
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
