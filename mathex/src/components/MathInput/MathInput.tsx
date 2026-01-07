import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useMathContext } from '../MathProvider/MathProvider';
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
  /** Callback fired when Enter is pressed (unfocuses input) */
  onSubmit?: () => void;
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
  onSubmit,
}) => {
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const latex = isControlled ? controlledValue : uncontrolledValue;

  // State
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [renderedHTML, setRenderedHTML] = useState('');
  const [subscriptMode, setSubscriptMode] = useState(false);

  // Refs
  const inputRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  // Generate unique ID if not provided
  const inputId = useMemo(() => id || `math-input-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // Get context (optional - component works without provider)
  const mathContext = useMathContext();

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
    // Notify provider that this input is now active
    if (mathContext) {
      mathContext.setActiveInput(inputId);
    }
  }, [mathContext, inputId]);

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
   * Get current cursor position and selection from contentEditable
   */
  const getCursorPosition = useCallback((): { start: number; end: number } => {
    if (!contentEditableRef.current) return { start: latex.length, end: latex.length };
    
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return { start: latex.length, end: latex.length };
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(contentEditableRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    
    const start = preCaretRange.toString().length;
    const end = start + range.toString().length;
    
    return { start, end };
  }, [latex]);

  /**
   * Set cursor position in contentEditable
   */
  const setCursorPosition = useCallback((position: number) => {
    if (!contentEditableRef.current) return;
    
    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    const textNode = contentEditableRef.current.firstChild;
    
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const clampedPos = Math.max(0, Math.min(position, textNode.textContent?.length || 0));
      range.setStart(textNode, clampedPos);
      range.setEnd(textNode, clampedPos);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  /**
   * Update contentEditable text content when LaTeX changes externally
   * Preserve cursor position when focused
   */
  useEffect(() => {
    if (contentEditableRef.current) {
      if (!isFocused) {
        contentEditableRef.current.textContent = latex;
      } else {
        // Preserve cursor position when LaTeX changes externally
        const { start } = getCursorPosition();
        contentEditableRef.current.textContent = latex;
        setTimeout(() => {
          setCursorPosition(start);
        }, 0);
      }
    }
  }, [latex, isFocused, getCursorPosition, setCursorPosition]);

  /**
   * Handle keyboard insertions from MathKeyboard with cursor awareness
   */
  const handleKeyboardInsertion = useCallback(
    (action: 'INSERT' | 'BACKSPACE' | 'DELETE' | 'ENTER', data?: string | { position: number; length?: number }) => {
      if (!isFocused || !contentEditableRef.current) {
        // If not focused, just append
        if (action === 'INSERT' && typeof data === 'string') {
          const newLatex = latex + data;
          if (isControlled) {
            onChange?.(newLatex);
          } else {
            setUncontrolledValue(newLatex);
            onChange?.(newLatex);
          }
        }
        return;
      }

      const { start, end } = getCursorPosition();
      let newLatex = latex;
      let newCursorPos = start;

      if (action === 'INSERT' && typeof data === 'string') {
        // Handle subscript mode
        let insertText = data;
        if (subscriptMode && data.length === 1 && /[a-zA-Z0-9]/.test(data)) {
          insertText = `_{${data}}`;
          setSubscriptMode(false);
        }

        // Insert at cursor position
        const before = latex.substring(0, start);
        const after = latex.substring(end);
        newLatex = before + insertText + after;
        newCursorPos = start + insertText.length;
      } else if (action === 'BACKSPACE') {
        if (start === end && start > 0) {
          // Delete one character before cursor
          newLatex = latex.substring(0, start - 1) + latex.substring(start);
          newCursorPos = start - 1;
        } else if (start !== end) {
          // Delete selection
          newLatex = latex.substring(0, start) + latex.substring(end);
          newCursorPos = start;
        }
      } else if (action === 'DELETE') {
        if (start === end && start < latex.length) {
          // Delete one character after cursor
          newLatex = latex.substring(0, start) + latex.substring(start + 1);
          newCursorPos = start;
        } else if (start !== end) {
          // Delete selection
          newLatex = latex.substring(0, start) + latex.substring(end);
          newCursorPos = start;
        }
      } else if (action === 'ENTER') {
        // Unfocus the input
        contentEditableRef.current.blur();
        // Call onSubmit callback if provided
        onSubmit?.();
        return;
      }

      // Update LaTeX
      if (isControlled) {
        onChange?.(newLatex);
      } else {
        setUncontrolledValue(newLatex);
        onChange?.(newLatex);
      }

      // Restore cursor position after update
      setTimeout(() => {
        setCursorPosition(newCursorPos);
      }, 0);
    },
    [latex, isFocused, isControlled, onChange, getCursorPosition, setCursorPosition, subscriptMode]
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
   * Expose subscript mode setter for keyboard
   */
  useEffect(() => {
    if (mathContext && 'setSubscriptMode' in mathContext) {
      (mathContext as any).setSubscriptModeForInput?.(inputId, setSubscriptMode);
    }
  }, [mathContext, inputId]);

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
