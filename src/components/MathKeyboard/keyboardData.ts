/**
 * Keyboard layout data and configurations for MathKeyboard
 * Based on Desmos calculator keyboard
 */

import type { ButtonConfig, FunctionCategory } from '../../types';

// ============================================
// DEFAULT KEYBOARD LAYOUT (Numbers + Variables)
// ============================================

/**
 * Left section: Variables, parentheses, etc.
 * Layout:
 * [x] [y] [a²] [aᵇ]
 * [(] [)] [<]  [>]
 * [|a|][,] [≤] [≥]
 * [ABC][🔊][√] [π]
 */
export const defaultLeftSection: ButtonConfig[][] = [
  [
    { display: 'x', latex: 'x', type: 'variable', style: 'white' },
    { display: 'y', latex: 'y', type: 'variable', style: 'white' },
    { display: 'a²', latex: '^{2}', type: 'operator', style: 'white' },
    { display: 'aᵇ', latex: '^{}', type: 'operator', style: 'white' },
  ],
  [
    { display: '(', latex: '(', type: 'symbol', style: 'white' },
    { display: ')', latex: ')', type: 'symbol', style: 'white' },
    { display: '<', latex: '<', type: 'operator', style: 'white' },
    { display: '>', latex: '>', type: 'operator', style: 'white' },
  ],
  [
    { display: '|a|', latex: '||', type: 'operator', style: 'white' },
    { display: ',', latex: ',', type: 'symbol', style: 'white' },
    { display: '≤', latex: '\\leq ', type: 'operator', style: 'white' },
    { display: '≥', latex: '\\geq ', type: 'operator', style: 'white' },
  ],
  [
    { display: 'A B C', latex: 'ABC_MODE', type: 'action', style: 'gray-light' },
    { display: '🔊', latex: 'SPEAK', type: 'action', style: 'gray-light' },
    { display: '√', latex: '\\sqrt{}', type: 'function', style: 'white' },
    { display: 'π', latex: '\\pi ', type: 'symbol', style: 'white' },
  ],
];

/**
 * Middle section: Number pad + operators
 * Layout:
 * [7][8][9][÷]
 * [4][5][6][×]
 * [1][2][3][−]
 * [0][.][=][+]
 */
export const defaultMiddleSection: ButtonConfig[][] = [
  [
    { display: '7', latex: '7', type: 'number', style: 'gray-light' },
    { display: '8', latex: '8', type: 'number', style: 'gray-light' },
    { display: '9', latex: '9', type: 'number', style: 'gray-light' },
    { display: '÷', latex: '\\div ', type: 'operator', style: 'white' },
  ],
  [
    { display: '4', latex: '4', type: 'number', style: 'gray-light' },
    { display: '5', latex: '5', type: 'number', style: 'gray-light' },
    { display: '6', latex: '6', type: 'number', style: 'gray-light' },
    { display: '×', latex: '\\times ', type: 'operator', style: 'white' },
  ],
  [
    { display: '1', latex: '1', type: 'number', style: 'gray-light' },
    { display: '2', latex: '2', type: 'number', style: 'gray-light' },
    { display: '3', latex: '3', type: 'number', style: 'gray-light' },
    { display: '−', latex: '-', type: 'operator', style: 'white' },
  ],
  [
    { display: '0', latex: '0', type: 'number', style: 'gray-light' },
    { display: '.', latex: '.', type: 'number', style: 'gray-light' },
    { display: '=', latex: '=', type: 'operator', style: 'gray-light' },
    { display: '+', latex: '+', type: 'operator', style: 'white' },
  ],
];

/**
 * Right section: Functions, navigation, actions
 * Layout:
 * [  functions  ]
 * [  ←  ][  →  ]
 * [   backspace  ]
 * [    enter     ]
 */
export const defaultRightSection: ButtonConfig[][] = [
  [
    { display: 'functions', latex: 'FUNCTIONS', type: 'action', style: 'gray-light', size: 'extra-wide' },
  ],
  [
    { display: '←', latex: 'ARROW_LEFT', type: 'action', style: 'gray-light' },
    { display: '→', latex: 'ARROW_RIGHT', type: 'action', style: 'gray-light' },
  ],
  [
    { display: '⌫', latex: 'BACKSPACE', type: 'action', style: 'gray-light', size: 'extra-wide' },
  ],
  [
    { display: '↵', latex: 'ENTER', type: 'action', style: 'blue', size: 'extra-wide' },
  ],
];

// ============================================
// ABC KEYBOARD LAYOUT (Letters)
// ============================================

/**
 * ABC keyboard - QWERTY layout
 * Row 1: q w e r t y u i o p
 * Row 2: a s d f g h j k l θ
 * Row 3: ⬆ z x c v b n m ⌫
 * Row 4: 123 aᵦ !% [] {} ~ ,' ↵
 */
export const abcKeyboardRows: ButtonConfig[][] = [
  // Row 1
  [
    { display: 'q', latex: 'q', type: 'letter', style: 'white' },
    { display: 'w', latex: 'w', type: 'letter', style: 'white' },
    { display: 'e', latex: 'e', type: 'letter', style: 'white' },
    { display: 'r', latex: 'r', type: 'letter', style: 'white' },
    { display: 't', latex: 't', type: 'letter', style: 'white' },
    { display: 'y', latex: 'y', type: 'letter', style: 'white' },
    { display: 'u', latex: 'u', type: 'letter', style: 'white' },
    { display: 'i', latex: 'i', type: 'letter', style: 'white' },
    { display: 'o', latex: 'o', type: 'letter', style: 'white' },
    { display: 'p', latex: 'p', type: 'letter', style: 'white' },
  ],
  // Row 2
  [
    { display: 'a', latex: 'a', type: 'letter', style: 'white' },
    { display: 's', latex: 's', type: 'letter', style: 'white' },
    { display: 'd', latex: 'd', type: 'letter', style: 'white' },
    { display: 'f', latex: 'f', type: 'letter', style: 'white' },
    { display: 'g', latex: 'g', type: 'letter', style: 'white' },
    { display: 'h', latex: 'h', type: 'letter', style: 'white' },
    { display: 'j', latex: 'j', type: 'letter', style: 'white' },
    { display: 'k', latex: 'k', type: 'letter', style: 'white' },
    { display: 'l', latex: 'l', type: 'letter', style: 'white' },
    { display: 'θ', latex: '\\theta ', type: 'symbol', style: 'white' },
  ],
  // Row 3
  [
    { display: '⬆', latex: 'SHIFT', type: 'action', style: 'gray-light', size: 'wide' },
    { display: 'z', latex: 'z', type: 'letter', style: 'white' },
    { display: 'x', latex: 'x', type: 'letter', style: 'white' },
    { display: 'c', latex: 'c', type: 'letter', style: 'white' },
    { display: 'v', latex: 'v', type: 'letter', style: 'white' },
    { display: 'b', latex: 'b', type: 'letter', style: 'white' },
    { display: 'n', latex: 'n', type: 'letter', style: 'white' },
    { display: 'm', latex: 'm', type: 'letter', style: 'white' },
    { display: '⌫', latex: 'BACKSPACE', type: 'action', style: 'gray-light', size: 'wide' },
  ],
  // Row 4
  [
    { display: '1 2 3', latex: '123_MODE', type: 'action', style: 'gray-light', size: 'wide' },
    { display: 'aᵦ', latex: 'SUBSCRIPT', type: 'action', style: 'white' },
    {
      display: '! %',
      latex: 'DUAL_EXCLAIM_PERCENT',
      type: 'symbol',
      style: 'white',
      dualChar: {
        primary: '!',
        primaryLatex: '!',
        secondary: '%',
        secondaryLatex: '%',
      }
    },
    {
      display: '[ ]',
      latex: 'DUAL_BRACKETS',
      type: 'symbol',
      style: 'white',
      dualChar: {
        primary: '[',
        primaryLatex: '[',
        secondary: ']',
        secondaryLatex: ']',
      }
    },
    {
      display: '{ }',
      latex: 'DUAL_BRACES',
      type: 'symbol',
      style: 'white',
      dualChar: {
        primary: '{',
        primaryLatex: '\\{',
        secondary: '}',
        secondaryLatex: '\\}',
      }
    },
    {
      display: '~ :',
      latex: 'DUAL_TILDE_COLON',
      type: 'symbol',
      style: 'white',
      dualChar: {
        primary: '~',
        primaryLatex: '\\sim ',
        secondary: ':',
        secondaryLatex: ':',
      }
    },
    {
      display: ", '",
      latex: 'DUAL_COMMA_QUOTE',
      type: 'symbol',
      style: 'white',
      dualChar: {
        primary: ',',
        primaryLatex: ',',
        secondary: "'",
        secondaryLatex: "'",
      }
    },
    { display: '↵', latex: 'ENTER', type: 'action', style: 'blue', size: 'wide' },
  ],
];

// ============================================
// FUNCTIONS PANEL - All 13 Categories
// ============================================

export const functionCategories: FunctionCategory[] = [
  // 1. TRIG FUNCTIONS
  {
    id: 'trig',
    name: 'TRIG FUNCTIONS',
    functions: [
      { display: 'sin', latex: '\\sin()', description: 'Sine function' },
      { display: 'cos', latex: '\\cos()', description: 'Cosine function' },
      { display: 'tan', latex: '\\tan()', description: 'Tangent function' },
      { display: 'csc', latex: '\\csc()', description: 'Cosecant function' },
      { display: 'sec', latex: '\\sec()', description: 'Secant function' },
      { display: 'cot', latex: '\\cot()', description: 'Cotangent function' },
    ],
  },
  // 2. INVERSE TRIG FUNCTIONS
  {
    id: 'inverse-trig',
    name: 'INVERSE TRIG FUNCTIONS',
    functions: [
      { display: 'sin⁻¹', latex: '\\sin^{-1}()', description: 'Inverse sine' },
      { display: 'cos⁻¹', latex: '\\cos^{-1}()', description: 'Inverse cosine' },
      { display: 'tan⁻¹', latex: '\\tan^{-1}()', description: 'Inverse tangent' },
      { display: 'csc⁻¹', latex: '\\csc^{-1}()', description: 'Inverse cosecant' },
      { display: 'sec⁻¹', latex: '\\sec^{-1}()', description: 'Inverse secant' },
      { display: 'cot⁻¹', latex: '\\cot^{-1}()', description: 'Inverse cotangent' },
    ],
  },
  // 3. STATISTICS
  {
    id: 'statistics',
    name: 'STATISTICS',
    functions: [
      { display: 'mean', latex: '\\text{mean}()', description: 'Mean/average' },
      { display: 'median', latex: '\\text{median}()', description: 'Median value' },
      { display: 'min', latex: '\\min()', description: 'Minimum value' },
      { display: 'max', latex: '\\max()', description: 'Maximum value' },
      { display: 'quartile', latex: '\\text{quartile}()', description: 'Quartile' },
      { display: 'quantile', latex: '\\text{quantile}()', description: 'Quantile' },
      { display: 'stdev', latex: '\\text{stdev}()', description: 'Standard deviation' },
      { display: 'stdevp', latex: '\\text{stdevp}()', description: 'Population std dev' },
      { display: 'var', latex: '\\text{var}()', description: 'Variance' },
      { display: 'varp', latex: '\\text{varp}()', description: 'Population variance' },
      { display: 'cov', latex: '\\text{cov}()', description: 'Covariance' },
      { display: 'covp', latex: '\\text{covp}()', description: 'Population covariance' },
      { display: 'mad', latex: '\\text{mad}()', description: 'Mean absolute deviation' },
      { display: 'corr', latex: '\\text{corr}()', description: 'Correlation' },
      { display: 'spearman', latex: '\\text{spearman}()', description: 'Spearman correlation' },
      { display: 'stats', latex: '\\text{stats}()', description: 'Statistics summary' },
      { display: 'count', latex: '\\text{count}()', description: 'Count' },
      { display: 'total', latex: '\\text{total}()', description: 'Total/sum' },
    ],
  },
  // 4. LIST OPERATIONS
  {
    id: 'list-operations',
    name: 'LIST OPERATIONS',
    functions: [
      { display: 'repeat', latex: '\\text{repeat}()', description: 'Repeat elements' },
      { display: 'join', latex: '\\text{join}()', description: 'Join lists' },
      { display: 'sort', latex: '\\text{sort}()', description: 'Sort list' },
      { display: 'shuffle', latex: '\\text{shuffle}()', description: 'Shuffle list' },
      { display: 'unique', latex: '\\text{unique}()', description: 'Unique elements' },
      { display: 'for', latex: '\\text{for}', description: 'For loop' },
    ],
  },
  // 5. VISUALIZATIONS
  {
    id: 'visualizations',
    name: 'VISUALIZATIONS',
    functions: [
      { display: 'histogram', latex: '\\text{histogram}()', description: 'Histogram' },
      { display: 'dotplot', latex: '\\text{dotplot}()', description: 'Dot plot' },
      { display: 'boxplot', latex: '\\text{boxplot}()', description: 'Box plot' },
    ],
  },
  // 6. PROBABILITY DISTRIBUTIONS
  {
    id: 'distributions',
    name: 'PROBABILITY DISTRIBUTIONS',
    functions: [
      { display: 'normaldist', latex: '\\text{normaldist}()', description: 'Normal distribution' },
      { display: 'tdist', latex: '\\text{tdist}()', description: 'T distribution' },
      { display: 'chisqdist', latex: '\\text{chisqdist}()', description: 'Chi-squared distribution' },
      { display: 'uniformdist', latex: '\\text{uniformdist}()', description: 'Uniform distribution' },
      { display: 'binomialdist', latex: '\\text{binomialdist}()', description: 'Binomial distribution' },
      { display: 'poissondist', latex: '\\text{poissondist}()', description: 'Poisson distribution' },
      { display: 'geodist', latex: '\\text{geodist}()', description: 'Geometric distribution' },
      { display: 'pdf', latex: '\\text{pdf}()', description: 'Probability density function' },
      { display: 'cdf', latex: '\\text{cdf}()', description: 'Cumulative distribution function' },
      { display: 'inversecdf', latex: '\\text{inversecdf}()', description: 'Inverse CDF' },
      { display: 'random', latex: '\\text{random}()', description: 'Random number' },
    ],
  },
  // 7. INFERENCE
  {
    id: 'inference',
    name: 'INFERENCE',
    functions: [
      { display: 'ztest', latex: '\\text{ztest}()', description: 'Z-test' },
      { display: 'ttest', latex: '\\text{ttest}()', description: 'T-test' },
      { display: 'zproptest', latex: '\\text{zproptest}()', description: 'Z proportion test' },
      { display: 'chisqtest', latex: '\\text{chisqtest}()', description: 'Chi-squared test' },
      { display: 'chisqgof', latex: '\\text{chisqgof}()', description: 'Chi-squared goodness of fit' },
      { display: 'null', latex: '\\text{null}()', description: 'Null hypothesis' },
      { display: 'p', latex: '\\text{p}()', description: 'P-value' },
      { display: 'pleft', latex: '\\text{pleft}()', description: 'Left p-value' },
      { display: 'pright', latex: '\\text{pright}()', description: 'Right p-value' },
      { display: 'score', latex: '\\text{score}()', description: 'Test score' },
      { display: 'dof', latex: '\\text{dof}()', description: 'Degrees of freedom' },
      { display: 'stderr', latex: '\\text{stderr}()', description: 'Standard error' },
      { display: 'conf', latex: '\\text{conf}()', description: 'Confidence interval' },
      { display: 'lower', latex: '\\text{lower}()', description: 'Lower bound' },
      { display: 'upper', latex: '\\text{upper}()', description: 'Upper bound' },
      { display: 'estimate', latex: '\\text{estimate}()', description: 'Point estimate' },
    ],
  },
  // 8. CALCULUS
  {
    id: 'calculus',
    name: 'CALCULUS',
    functions: [
      { display: 'exp', latex: 'e^{', description: 'Exponential' },
      { display: 'ln', latex: '\\ln()', description: 'Natural logarithm' },
      { display: 'log', latex: '\\log()', description: 'Logarithm base 10' },
      { display: 'logₐ', latex: '\\log_{}()', description: 'Logarithm base a' },
      { display: 'd/dx', latex: '\\frac{d}{dx}', description: 'Derivative' },
      { display: "f'", latex: "'", description: 'Prime notation' },
      { display: '∫', latex: '\\int_{}^{}', description: 'Integral' },
      { display: 'Σ', latex: '\\sum_{}^{}', description: 'Summation' },
      { display: 'Π', latex: '\\prod_{}^{}', description: 'Product' },
    ],
  },
  // 9. HYPERBOLIC TRIG FUNCTIONS
  {
    id: 'hyperbolic-trig',
    name: 'HYPERBOLIC TRIG FUNCTIONS',
    functions: [
      { display: 'sinh', latex: '\\sinh()', description: 'Hyperbolic sine' },
      { display: 'cosh', latex: '\\cosh()', description: 'Hyperbolic cosine' },
      { display: 'tanh', latex: '\\tanh()', description: 'Hyperbolic tangent' },
      { display: 'csch', latex: '\\text{csch}()', description: 'Hyperbolic cosecant' },
      { display: 'sech', latex: '\\text{sech}()', description: 'Hyperbolic secant' },
      { display: 'coth', latex: '\\coth()', description: 'Hyperbolic cotangent' },
    ],
  },
  // 10. GEOMETRY
  {
    id: 'geometry',
    name: 'GEOMETRY',
    functions: [
      { display: 'polygon', latex: '\\text{polygon}()', description: 'Polygon' },
      { display: 'distance', latex: '\\text{distance}()', description: 'Distance' },
      { display: 'midpoint', latex: '\\text{midpoint}()', description: 'Midpoint' },
    ],
  },
  // 11. CUSTOM COLORS
  {
    id: 'colors',
    name: 'CUSTOM COLORS',
    functions: [
      { display: 'rgb', latex: '\\text{rgb}()', description: 'RGB color' },
      { display: 'hsv', latex: '\\text{hsv}()', description: 'HSV color' },
      { display: 'okhsv', latex: '\\text{okhsv}()', description: 'OKHSV color' },
      { display: 'oklab', latex: '\\text{oklab}()', description: 'OKLAB color' },
      { display: 'oklch', latex: '\\text{oklch}()', description: 'OKLCH color' },
    ],
  },
  // 12. SOUND
  {
    id: 'sound',
    name: 'SOUND',
    functions: [
      { display: 'tone', latex: '\\text{tone}()', description: 'Generate tone' },
    ],
  },
  // 13. NUMBER THEORY
  {
    id: 'number-theory',
    name: 'NUMBER THEORY',
    functions: [
      { display: 'lcm', latex: '\\text{lcm}()', description: 'Least common multiple' },
      { display: 'gcd', latex: '\\gcd()', description: 'Greatest common divisor' },
      { display: 'mod', latex: '\\mod ', description: 'Modulo' },
      { display: 'ceil', latex: '\\lceil \\rceil', description: 'Ceiling' },
      { display: 'floor', latex: '\\lfloor \\rfloor', description: 'Floor' },
      { display: 'round', latex: '\\text{round}()', description: 'Round' },
      { display: 'sign', latex: '\\text{sign}()', description: 'Sign function' },
      { display: 'ⁿ√', latex: '\\sqrt[]{}', description: 'Nth root' },
      { display: 'nPr', latex: 'P()', description: 'Permutation' },
      { display: 'nCr', latex: '\\binom{}{}', description: 'Combination' },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get uppercase/shifted version of ABC keyboard for shift mode
 * This handles:
 * - Letters become uppercase
 * - aᵦ (subscript) becomes aᵇ (superscript)
 * Dual-character buttons (!, %, etc.) are handled by blur/emphasis styling
 */
export function getUppercaseAbcKeyboard(): ButtonConfig[][] {
  return abcKeyboardRows.map((row) =>
    row.map((btn) => {
      // Handle letter buttons - uppercase when shifted
      if (btn.type === 'letter') {
        return {
          ...btn,
          display: btn.display.toUpperCase(),
          latex: btn.latex.toUpperCase(),
        };
      }

      // Handle subscript -> superscript swap
      if (btn.latex === 'SUBSCRIPT') {
        return {
          ...btn,
          display: 'aᵇ',
          latex: 'SUPERSCRIPT',
        };
      }

      // All other buttons remain the same (including dual-char buttons)
      return btn;
    })
  );
}
