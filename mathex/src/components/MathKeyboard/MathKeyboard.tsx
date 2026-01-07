import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMathContext } from '../MathProvider/MathProvider';
import './desmos-keyboard.css';
import './MathKeyboard.css';

/**
 * MathKeyboard - A Desmos-like on-screen keyboard component
 * 
 * Provides a visual keyboard interface for entering mathematical expressions.
 * Matches Desmos keyboard UI exactly using their CSS classes.
 */
export const MathKeyboard: React.FC = () => {
  const mathContext = useMathContext();
  
  // Keyboard works without provider, but won't insert text
  if (!mathContext) {
    console.warn('MathKeyboard should be used within a MathProvider for full functionality');
  }
  const [isVisible, setIsVisible] = useState(false);
  const [isABC, setIsABC] = useState(false);
  const [isShift, setIsShift] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [subscriptMode, setSubscriptMode] = useState(false);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const functionsPopoverRef = useRef<HTMLDivElement>(null);

  /**
   * Handle button click - insert LaTeX at cursor
   */
  const handleButtonClick = useCallback((latex: string) => {
    // Handle mode toggles even without context
    if (latex === 'TOGGLE_ABC') {
      setIsABC(!isABC);
      setIsShift(false);
      return;
    } else if (latex === 'TOGGLE_123') {
      setIsABC(false);
      setIsShift(false);
      return;
    } else if (latex === 'TOGGLE_SHIFT') {
      setIsShift(!isShift);
      return;
    } else if (latex === 'TOGGLE_SUBSCRIPT') {
      setSubscriptMode(!subscriptMode);
      return;
    } else if (latex === 'TOGGLE_FUNCTIONS') {
      setShowFunctions(!showFunctions);
      return;
    }
    
    if (!mathContext) return;
    
    // Handle special commands
    if (latex === 'BACKSPACE') {
      mathContext.insertAtCursor('BACKSPACE');
    } else if (latex === 'DELETE') {
      mathContext.insertAtCursor('DELETE');
    } else if (latex === 'ENTER') {
      mathContext.insertAtCursor('ENTER');
    } else if (latex === 'ARROW_LEFT') {
      // Move cursor left - use native browser behavior
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.contentEditable === 'true') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.setStart(range.startContainer, Math.max(0, range.startOffset - 1));
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } else if (latex === 'ARROW_RIGHT') {
      // Move cursor right - use native browser behavior
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.contentEditable === 'true') {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.setStart(range.startContainer, range.startOffset + 1);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    } else if (latex === 'TOGGLE_ABC') {
      setIsABC(!isABC);
      setIsShift(false); // Reset shift when switching modes
    } else if (latex === 'TOGGLE_123') {
      setIsABC(false);
      setIsShift(false);
    } else if (latex === 'TOGGLE_SHIFT') {
      setIsShift(!isShift);
    } else if (latex === 'TOGGLE_SUBSCRIPT') {
      setSubscriptMode(!subscriptMode);
    } else if (latex === 'TOGGLE_FUNCTIONS') {
      setShowFunctions(!showFunctions);
    } else if (latex === 'SPEAK') {
      // No-op for now
    } else {
      // Regular LaTeX insertion
      let insertLatex = latex;
      
      // Handle subscript mode - wrap single alphanumeric characters
      if (subscriptMode && latex.length === 1 && /[a-zA-Z0-9]/.test(latex)) {
        insertLatex = `_{${latex}}`;
        setSubscriptMode(false); // Reset after use
      }
      
      mathContext.insertAtCursor('INSERT', insertLatex);
    }
  }, [mathContext, isABC, isShift, subscriptMode]);

  /**
   * Close functions popover when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFunctions &&
        functionsPopoverRef.current &&
        !functionsPopoverRef.current.contains(event.target as Node) &&
        keyboardRef.current &&
        !keyboardRef.current.contains(event.target as Node)
      ) {
        setShowFunctions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFunctions]);

  /**
   * Close keyboard when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible &&
        keyboardRef.current &&
        !keyboardRef.current.contains(event.target as Node) &&
        (!functionsPopoverRef.current || !functionsPopoverRef.current.contains(event.target as Node))
      ) {
        setIsVisible(false);
        setShowFunctions(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isVisible]);

  /**
   * Toggle keyboard visibility
   */
  const toggleKeyboard = useCallback(() => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setShowFunctions(false);
    }
  }, [isVisible]);

  // Default mode button layout
  const defaultButtons = [
    [
      { label: 'x', latex: 'x', command: 'x' },
      { label: 'y', latex: 'y', command: 'y' },
      { label: 'a²', latex: '^{2}', command: 'square' },
      { label: 'aᵇ', latex: '^{}', command: 'power' },
    ],
    [
      { label: '(', latex: '(', command: 'paren-open' },
      { label: ')', latex: ')', command: 'paren-close' },
      { label: '<', latex: '<', command: 'less-than' },
      { label: '>', latex: '>', command: 'greater-than' },
    ],
    [
      { label: '|a|', latex: '\\left|\\right|', command: 'abs' },
      { label: ',', latex: ',', command: 'comma' },
      { label: '≤', latex: '\\leq', command: 'leq' },
      { label: '≥', latex: '\\geq', command: 'geq' },
    ],
    [
      { label: 'ABC', latex: 'TOGGLE_ABC', command: 'ABC' },
      { label: '🔊', latex: 'SPEAK', command: 'speak' },
      { label: '√', latex: '\\sqrt{}', command: 'sqrt' },
      { label: 'π', latex: '\\pi', command: 'pi' },
    ],
  ];

  const numberButtons = [
    [
      { label: '7', latex: '7', command: '7' },
      { label: '8', latex: '8', command: '8' },
      { label: '9', latex: '9', command: '9' },
      { label: '÷', latex: '\\div', command: 'divide' },
    ],
    [
      { label: '4', latex: '4', command: '4' },
      { label: '5', latex: '5', command: '5' },
      { label: '6', latex: '6', command: '6' },
      { label: '×', latex: '\\times', command: 'multiply' },
    ],
    [
      { label: '1', latex: '1', command: '1' },
      { label: '2', latex: '2', command: '2' },
      { label: '3', latex: '3', command: '3' },
      { label: '−', latex: '-', command: 'minus' },
    ],
    [
      { label: '0', latex: '0', command: '0' },
      { label: '.', latex: '.', command: 'decimal' },
      { label: '=', latex: '=', command: 'equals' },
      { label: '+', latex: '+', command: 'plus' },
    ],
  ];

  const navButtons = [
    [
      { label: 'functions', latex: 'TOGGLE_FUNCTIONS', command: 'functions', wide: true },
    ],
    [
      { label: '←', latex: 'ARROW_LEFT', command: 'arrow-left' },
      { label: '→', latex: 'ARROW_RIGHT', command: 'arrow-right' },
    ],
    [
      { label: 'backspace', latex: 'BACKSPACE', command: 'backspace', wide: true },
    ],
    [
      { label: 'ENTER', latex: 'ENTER', command: 'enter', wide: true, blue: true },
    ],
  ];

  // ABC mode button layout
  const abcButtons = [
    [
      { label: isShift ? 'Q' : 'q', latex: isShift ? 'Q' : 'q', command: 'q' },
      { label: isShift ? 'W' : 'w', latex: isShift ? 'W' : 'w', command: 'w' },
      { label: isShift ? 'E' : 'e', latex: isShift ? 'E' : 'e', command: 'e' },
      { label: isShift ? 'R' : 'r', latex: isShift ? 'R' : 'r', command: 'r' },
      { label: isShift ? 'T' : 't', latex: isShift ? 'T' : 't', command: 't' },
      { label: isShift ? 'Y' : 'y', latex: isShift ? 'Y' : 'y', command: 'y' },
      { label: isShift ? 'U' : 'u', latex: isShift ? 'U' : 'u', command: 'u' },
      { label: isShift ? 'I' : 'i', latex: isShift ? 'I' : 'i', command: 'i' },
      { label: isShift ? 'O' : 'o', latex: isShift ? 'O' : 'o', command: 'o' },
      { label: isShift ? 'P' : 'p', latex: isShift ? 'P' : 'p', command: 'p' },
    ],
    [
      { label: isShift ? 'A' : 'a', latex: isShift ? 'A' : 'a', command: 'a' },
      { label: isShift ? 'S' : 's', latex: isShift ? 'S' : 's', command: 's' },
      { label: isShift ? 'D' : 'd', latex: isShift ? 'D' : 'd', command: 'd' },
      { label: isShift ? 'F' : 'f', latex: isShift ? 'F' : 'f', command: 'f' },
      { label: isShift ? 'G' : 'g', latex: isShift ? 'G' : 'g', command: 'g' },
      { label: isShift ? 'H' : 'h', latex: isShift ? 'H' : 'h', command: 'h' },
      { label: isShift ? 'J' : 'j', latex: isShift ? 'J' : 'j', command: 'j' },
      { label: isShift ? 'K' : 'k', latex: isShift ? 'K' : 'k', command: 'k' },
      { label: isShift ? 'L' : 'l', latex: isShift ? 'L' : 'l', command: 'l' },
      { label: 'θ', latex: '\\theta', command: 'theta' },
    ],
    [
      { label: '⬆', latex: 'TOGGLE_SHIFT', command: 'shift' },
      { label: isShift ? 'Z' : 'z', latex: isShift ? 'Z' : 'z', command: 'z' },
      { label: isShift ? 'X' : 'x', latex: isShift ? 'X' : 'x', command: 'x' },
      { label: isShift ? 'C' : 'c', latex: isShift ? 'C' : 'c', command: 'c' },
      { label: isShift ? 'V' : 'v', latex: isShift ? 'V' : 'v', command: 'v' },
      { label: isShift ? 'B' : 'b', latex: isShift ? 'B' : 'b', command: 'b' },
      { label: isShift ? 'N' : 'n', latex: isShift ? 'N' : 'n', command: 'n' },
      { label: isShift ? 'M' : 'm', latex: isShift ? 'M' : 'm', command: 'm' },
      { label: 'backspace', latex: 'BACKSPACE', command: 'backspace', wide: true },
    ],
    [
      { label: '123', latex: 'TOGGLE_123', command: '123' },
      { label: isShift ? 'aᵇ' : 'aᵦ', latex: 'TOGGLE_SUBSCRIPT', command: 'subscript', active: subscriptMode },
      { label: isShift ? '%' : '!', latex: isShift ? '%' : '!', command: isShift ? 'percent' : 'exclamation' },
      { label: isShift ? ']' : '[', latex: isShift ? ']' : '[', command: isShift ? 'bracket-close' : 'bracket-open' },
      { label: isShift ? '}' : '{', latex: isShift ? '}' : '{', command: isShift ? 'brace-close' : 'brace-open' },
      { label: isShift ? ':' : '~', latex: isShift ? ':' : '~', command: isShift ? 'colon' : 'tilde' },
      { label: isShift ? "'" : ',', latex: isShift ? "'" : ',', command: isShift ? 'apostrophe' : 'comma' },
      { label: 'ENTER', latex: 'ENTER', command: 'enter', wide: true, blue: true },
    ],
  ];

  // Function categories (all 13 from MASTERPLAN-V2.md)
  const functionCategories = [
    {
      name: 'TRIG FUNCTIONS',
      functions: [
        { label: 'sin', latex: '\\sin(' },
        { label: 'cos', latex: '\\cos(' },
        { label: 'tan', latex: '\\tan(' },
        { label: 'csc', latex: '\\csc(' },
        { label: 'sec', latex: '\\sec(' },
        { label: 'cot', latex: '\\cot(' },
      ],
    },
    {
      name: 'INVERSE TRIG FUNCTIONS',
      functions: [
        { label: 'sin⁻¹', latex: '\\sin^{-1}(' },
        { label: 'cos⁻¹', latex: '\\cos^{-1}(' },
        { label: 'tan⁻¹', latex: '\\tan^{-1}(' },
        { label: 'csc⁻¹', latex: '\\csc^{-1}(' },
        { label: 'sec⁻¹', latex: '\\sec^{-1}(' },
        { label: 'cot⁻¹', latex: '\\cot^{-1}(' },
      ],
    },
    {
      name: 'STATISTICS',
      functions: [
        { label: 'mean', latex: '\\text{mean}(' },
        { label: 'median', latex: '\\text{median}(' },
        { label: 'min', latex: '\\text{min}(' },
        { label: 'max', latex: '\\text{max}(' },
        { label: 'quartile', latex: '\\text{quartile}(' },
        { label: 'quantile', latex: '\\text{quantile}(' },
        { label: 'stdev', latex: '\\text{stdev}(' },
        { label: 'stdevp', latex: '\\text{stdevp}(' },
        { label: 'var', latex: '\\text{var}(' },
        { label: 'varp', latex: '\\text{varp}(' },
        { label: 'cov', latex: '\\text{cov}(' },
        { label: 'covp', latex: '\\text{covp}(' },
        { label: 'mad', latex: '\\text{mad}(' },
        { label: 'corr', latex: '\\text{corr}(' },
        { label: 'spearman', latex: '\\text{spearman}(' },
        { label: 'stats', latex: '\\text{stats}(' },
        { label: 'count', latex: '\\text{count}(' },
        { label: 'total', latex: '\\text{total}(' },
      ],
    },
    {
      name: 'LIST OPERATIONS',
      functions: [
        { label: 'repeat', latex: '\\text{repeat}(' },
        { label: 'join', latex: '\\text{join}(' },
        { label: 'sort', latex: '\\text{sort}(' },
        { label: 'shuffle', latex: '\\text{shuffle}(' },
        { label: 'unique', latex: '\\text{unique}(' },
        { label: 'for', latex: '\\text{for}(' },
      ],
    },
    {
      name: 'VISUALIZATIONS',
      functions: [
        { label: 'histogram', latex: '\\text{histogram}(' },
        { label: 'dotplot', latex: '\\text{dotplot}(' },
        { label: 'boxplot', latex: '\\text{boxplot}(' },
      ],
    },
    {
      name: 'PROBABILITY DISTRIBUTIONS',
      functions: [
        { label: 'normaldist', latex: '\\text{normaldist}(' },
        { label: 'tdist', latex: '\\text{tdist}(' },
        { label: 'chisqdist', latex: '\\text{chisqdist}(' },
        { label: 'uniformdist', latex: '\\text{uniformdist}(' },
        { label: 'binomialdist', latex: '\\text{binomialdist}(' },
        { label: 'poissondist', latex: '\\text{poissondist}(' },
        { label: 'geodist', latex: '\\text{geodist}(' },
        { label: 'pdf', latex: '\\text{pdf}(' },
        { label: 'cdf', latex: '\\text{cdf}(' },
        { label: 'inversecdf', latex: '\\text{inversecdf}(' },
        { label: 'random', latex: '\\text{random}(' },
      ],
    },
    {
      name: 'INFERENCE',
      functions: [
        { label: 'ztest', latex: '\\text{ztest}(' },
        { label: 'ttest', latex: '\\text{ttest}(' },
        { label: 'zproptest', latex: '\\text{zproptest}(' },
        { label: 'chisqtest', latex: '\\text{chisqtest}(' },
        { label: 'chisqgof', latex: '\\text{chisqgof}(' },
        { label: 'null', latex: '\\text{null}(' },
        { label: 'p', latex: 'p' },
        { label: 'pleft', latex: '\\text{pleft}(' },
        { label: 'pright', latex: '\\text{pright}(' },
        { label: 'score', latex: '\\text{score}(' },
        { label: 'dof', latex: '\\text{dof}(' },
        { label: 'stderr', latex: '\\text{stderr}(' },
        { label: 'conf', latex: '\\text{conf}(' },
        { label: 'lower', latex: '\\text{lower}(' },
        { label: 'upper', latex: '\\text{upper}(' },
        { label: 'estimate', latex: '\\text{estimate}(' },
      ],
    },
    {
      name: 'CALCULUS',
      functions: [
        { label: 'exp', latex: 'e^{}' },
        { label: 'ln', latex: '\\ln(' },
        { label: 'log', latex: '\\log(' },
        { label: 'logₐ', latex: '\\log_{}(' },
        { label: 'd/dx', latex: '\\frac{d}{dx}' },
        { label: "f'", latex: "f'" },
        { label: '∫', latex: '\\int' },
        { label: 'Σ', latex: '\\sum' },
        { label: 'Π', latex: '\\prod' },
      ],
    },
    {
      name: 'HYPERBOLIC TRIG FUNCTIONS',
      functions: [
        { label: 'sinh', latex: '\\sinh(' },
        { label: 'cosh', latex: '\\cosh(' },
        { label: 'tanh', latex: '\\tanh(' },
        { label: 'csch', latex: '\\csch(' },
        { label: 'sech', latex: '\\sech(' },
        { label: 'coth', latex: '\\coth(' },
      ],
    },
    {
      name: 'GEOMETRY',
      functions: [
        { label: 'polygon', latex: '\\text{polygon}(' },
        { label: 'distance', latex: '\\text{distance}(' },
        { label: 'midpoint', latex: '\\text{midpoint}(' },
      ],
    },
    {
      name: 'CUSTOM COLORS',
      functions: [
        { label: 'rgb', latex: '\\text{rgb}(' },
        { label: 'hsv', latex: '\\text{hsv}(' },
        { label: 'okhsv', latex: '\\text{okhsv}(' },
        { label: 'oklab', latex: '\\text{oklab}(' },
        { label: 'oklch', latex: '\\text{oklch}(' },
      ],
    },
    {
      name: 'SOUND',
      functions: [
        { label: 'tone', latex: '\\text{tone}(' },
      ],
    },
    {
      name: 'NUMBER THEORY',
      functions: [
        { label: 'lcm', latex: '\\text{lcm}(' },
        { label: 'gcd', latex: '\\text{gcd}(' },
        { label: 'mod', latex: '\\mod' },
        { label: 'ceil', latex: '\\lceil\\rceil' },
        { label: 'floor', latex: '\\lfloor\\rfloor' },
        { label: 'round', latex: '\\text{round}(' },
        { label: 'sign', latex: '\\text{sign}(' },
        { label: 'ⁿ√', latex: '\\sqrt[n]{}' },
        { label: 'nPr', latex: 'P(n,r)' },
        { label: 'nCr', latex: '\\binom{n}{r}' },
      ],
    },
  ];

  /**
   * Handle function button click
   */
  const handleFunctionClick = useCallback((latex: string) => {
    if (!mathContext) return;
    
    // Insert function with cursor after opening paren
    mathContext.insertAtCursor('INSERT', latex);
    
    // Close functions panel
    setShowFunctions(false);
  }, [mathContext]);

  // Render button component
  const renderButton = (
    button: {
      label: string;
      latex: string;
      command: string;
      wide?: boolean;
      blue?: boolean;
      active?: boolean;
    },
    key: string
  ) => {
    const buttonClasses = [
      'dcg-keypad-btn-container',
      button.wide ? 'dcg-keypad-btn-container--wide' : '',
      button.blue ? 'dcg-btn-blue' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const buttonBtnClasses = [
      'dcg-keypad-btn',
      button.blue ? 'dcg-btn-blue' : 'dcg-btn-light-gray',
      button.active ? 'dcg-depressed' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div key={key} className={buttonClasses}>
        <button
          className={buttonBtnClasses}
          {...({ 'dcg-command': button.command } as any)}
          onClick={() => handleButtonClick(button.latex)}
          aria-label={button.label}
        >
          <span className="dcg-keypad-btn-content">{button.label}</span>
        </button>
      </div>
    );
  };

  // If keyboard is not visible, show only the toggle button
  if (!isVisible) {
    return (
      <div className="dcg-keypad dcg-keypad--hidden">
        <div className="dcg-show-keypad-container">
          <button
            className="dcg-show-keypad"
            onClick={toggleKeyboard}
            aria-label="Show keyboard"
          >
            <span>⌨</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dcg-calculator-api-container-v1_12">
      <div ref={keyboardRef} className="dcg-keypad">
        <div className="dcg-keys-background">
          <div className="dcg-keys-container">
            {!isABC ? (
              // Default numeric mode - 3 column layout
              <div className="dcg-keypad-layout">
                {/* Left Column: Variables */}
                <div className="dcg-keypad-column dcg-keypad-column--variables">
                  <div className="dcg-keypad-row">
                    {defaultButtons[0].map((btn, idx) => renderButton(btn, `var-0-${idx}`))}
                  </div>
                  <div className="dcg-keypad-row">
                    {defaultButtons[1].map((btn, idx) => renderButton(btn, `var-1-${idx}`))}
                  </div>
                  <div className="dcg-keypad-row">
                    {defaultButtons[2].map((btn, idx) => renderButton(btn, `var-2-${idx}`))}
                  </div>
                  <div className="dcg-keypad-row">
                    {defaultButtons[3].map((btn, idx) => renderButton(btn, `var-3-${idx}`))}
                  </div>
                </div>

                {/* Middle Column: Numbers & Operators */}
                <div className="dcg-keypad-column dcg-keypad-column--numbers">
                  {numberButtons.map((row, rowIdx) => (
                    <div key={`num-row-${rowIdx}`} className="dcg-keypad-row">
                      {row.map((btn, idx) => renderButton(btn, `num-${rowIdx}-${idx}`))}
                    </div>
                  ))}
                </div>

                {/* Right Column: Functions & Navigation */}
                <div className="dcg-keypad-column dcg-keypad-column--navigation">
                  {navButtons.map((row, rowIdx) => (
                    <div key={`nav-row-${rowIdx}`} className="dcg-keypad-row">
                      {row.map((btn, idx) => renderButton(btn, `nav-${rowIdx}-${idx}`))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // ABC mode - full width rows
              <>
                {abcButtons.map((row, rowIdx) => (
                  <div key={`abc-row-${rowIdx}`} className="dcg-keypad-row">
                    {row.map((btn, idx) => renderButton(btn, `abc-${rowIdx}-${idx}`))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Functions popover */}
        {showFunctions && (
          <div ref={functionsPopoverRef} className="dcg-functions-popover">
            <div className="dcg-functions-popover-content">
              {functionCategories.map((category, catIdx) => (
                <div key={`category-${catIdx}`} className="dcg-function-category">
                  <div className="dcg-function-category-title">{category.name}</div>
                  <div className="dcg-function-category-buttons">
                    {category.functions.map((func, funcIdx) => (
                      <button
                        key={`func-${catIdx}-${funcIdx}`}
                        className="dcg-function-btn"
                        onClick={() => handleFunctionClick(func.latex)}
                      >
                        {func.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Minimize button */}
        <div className="dcg-minimize-keypad-container">
          <button
            className="dcg-minimize-keypad"
            onClick={toggleKeyboard}
            aria-label="Hide keyboard"
          >
            <span>−</span>
          </button>
        </div>
      </div>
    </div>
  );
};

MathKeyboard.displayName = 'MathKeyboard';

