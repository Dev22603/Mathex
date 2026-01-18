import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useMathContext } from '../MathProvider/MathProvider';
import './MathInput.css';

// Debug logging helper
const DEBUG = false;
const log = (component: string, action: string, data?: any) => {
  if (DEBUG) {
    console.log(`[${component}] ${action}`, data !== undefined ? data : '');
  }
};

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

  // Store context and inputId in refs for use in event handlers (avoids stale closure)
  const mathContextRef = useRef(mathContext);
  const inputIdRef = useRef(inputId);
  useEffect(() => {
    mathContextRef.current = mathContext;
    inputIdRef.current = inputId;
  }, [mathContext, inputId]);

  log('MathInput', 'render', { inputId, hasContext: !!mathContext, activeInputId: mathContext?.activeInputId });

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

      // Handle focus/blur - CRITICAL: This is where we set the active input in context
      const element = containerRef.current;
      const handleFocusIn = () => {
        const currentInputId = inputIdRef.current;
        const currentContext = mathContextRef.current;
        log('MathInput', 'focusin event fired', { inputId: currentInputId, hasContext: !!currentContext });
        setIsFocused(true);
        // Set this input as active in the context when it receives focus
        if (currentContext) {
          log('MathInput', 'Setting active input from focusin', { inputId: currentInputId });
          currentContext.setActiveInput(currentInputId);
        } else {
          log('MathInput', 'WARNING: No mathContext available in focusin handler');
        }
      };
      const handleFocusOut = () => {
        log('MathInput', 'focusout event fired', { inputId: inputIdRef.current });
        setIsFocused(false);
      };

      element.addEventListener('focusin', handleFocusIn);
      element.addEventListener('focusout', handleFocusOut);

      // Auto-focus if requested
      if (autoFocus) {
        mathField.focus();
      }

      return () => {
        log('MathInput', 'cleanup - removing listeners', { inputId });
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
      log('MathInput', 'handleKeyboardInsertion called', {
        insertedLatex,
        hasMathField: !!mathFieldRef.current,
        inputId: inputIdRef.current
      });

      if (!mathFieldRef.current) {
        log('MathInput', 'ERROR: mathFieldRef.current is null, cannot insert');
        return;
      }

      // Handle special commands
      switch (insertedLatex) {
        case 'BACKSPACE':
          log('MathInput', 'Executing backspace keystroke');
          mathFieldRef.current.keystroke('Backspace');
          return;
        case 'ARROW_LEFT':
          log('MathInput', 'Executing Left arrow keystroke');
          mathFieldRef.current.keystroke('Left');
          return;
        case 'ARROW_RIGHT':
          log('MathInput', 'Executing Right arrow keystroke');
          mathFieldRef.current.keystroke('Right');
          return;
        case 'ENTER':
          log('MathInput', 'Executing blur (Enter)');
          mathFieldRef.current.blur();
          return;
        case 'SUBSCRIPT_BLOCK':
          log('MathInput', 'Inserting subscript block with cmd()');
          mathFieldRef.current.cmd('_');
          mathFieldRef.current.focus();
          return;
        case 'SUPERSCRIPT_BLOCK':
          log('MathInput', 'Inserting superscript block with cmd()');
          mathFieldRef.current.cmd('^');
          mathFieldRef.current.focus();
          return;
        default:
          // Insert LaTeX at cursor
          log('MathInput', 'Writing LaTeX to MathQuill', { latex: insertedLatex });
          mathFieldRef.current.write(insertedLatex);
          // Re-focus after insertion to ensure subsequent inputs work
          log('MathInput', 'Re-focusing MathQuill after write');
          mathFieldRef.current.focus();
      }
    },
    []
  );

  /**
   * Register with provider on mount, unregister on unmount
   * CRITICAL: Uses refs to avoid re-running when context object reference changes
   * This prevents the register/unregister cascade that was resetting activeInputId
   */
  useEffect(() => {
    const currentContext = mathContextRef.current;
    const currentInputId = inputIdRef.current;

    if (currentContext) {
      log('MathInput', 'Registering input with provider (mount)', { inputId: currentInputId });
      currentContext.registerInput(currentInputId, handleKeyboardInsertion);
      return () => {
        log('MathInput', 'Unregistering input from provider (unmount)', { inputId: currentInputId });
        currentContext.unregisterInput(currentInputId);
      };
    } else {
      log('MathInput', 'WARNING: No mathContext available for registration', { inputId: currentInputId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount - uses refs to access current values

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
