/**
 * All 13 function categories from Desmos
 * Complete implementation matching Desmos exactly
 */

export interface FunctionButton {
  /** Display text on button */
  display: string;
  /** LaTeX to insert */
  latex: string;
  /** Aria label for accessibility */
  ariaLabel: string;
  /** Whether to render display as KaTeX */
  useKatex?: boolean;
}

export interface FunctionCategory {
  /** Category unique ID */
  id: string;
  /** Display name for section heading */
  name: string;
  /** Optional help link */
  helpLink?: string;
  /** Array of function buttons in this category */
  functions: FunctionButton[];
}

/**
 * All 13 function categories exactly as in Desmos
 */
export const FUNCTION_CATEGORIES: FunctionCategory[] = [
  // 1. TRIG FUNCTIONS
  {
    id: 'trig',
    name: 'Trig Functions',
    functions: [
      { display: 'sin', latex: '\\sin(', ariaLabel: 'Sine', useKatex: true },
      { display: 'cos', latex: '\\cos(', ariaLabel: 'Cosine', useKatex: true },
      { display: 'tan', latex: '\\tan(', ariaLabel: 'Tangent', useKatex: true },
      { display: 'csc', latex: '\\csc(', ariaLabel: 'Cosecant', useKatex: true },
      { display: 'sec', latex: '\\sec(', ariaLabel: 'Secant', useKatex: true },
      { display: 'cot', latex: '\\cot(', ariaLabel: 'Cotangent', useKatex: true },
    ],
  },

  // 2. INVERSE TRIG FUNCTIONS
  {
    id: 'inverse-trig',
    name: 'Inverse Trig Functions',
    functions: [
      { display: 'sin^{-1}', latex: '\\sin^{-1}(', ariaLabel: 'Inverse Sine', useKatex: true },
      { display: 'cos^{-1}', latex: '\\cos^{-1}(', ariaLabel: 'Inverse Cosine', useKatex: true },
      { display: 'tan^{-1}', latex: '\\tan^{-1}(', ariaLabel: 'Inverse Tangent', useKatex: true },
      { display: 'csc^{-1}', latex: '\\csc^{-1}(', ariaLabel: 'Inverse Cosecant', useKatex: true },
      { display: 'sec^{-1}', latex: '\\sec^{-1}(', ariaLabel: 'Inverse Secant', useKatex: true },
      { display: 'cot^{-1}', latex: '\\cot^{-1}(', ariaLabel: 'Inverse Cotangent', useKatex: true },
    ],
  },

  // 3. STATISTICS
  {
    id: 'statistics',
    name: 'Statistics',
    functions: [
      { display: 'mean', latex: '\\text{mean}(', ariaLabel: 'Mean', useKatex: true },
      { display: 'median', latex: '\\text{median}(', ariaLabel: 'Median', useKatex: true },
      { display: 'min', latex: '\\text{min}(', ariaLabel: 'Minimum', useKatex: true },
      { display: 'max', latex: '\\text{max}(', ariaLabel: 'Maximum', useKatex: true },
      { display: 'quartile', latex: '\\text{quartile}(', ariaLabel: 'Quartile', useKatex: true },
      { display: 'quantile', latex: '\\text{quantile}(', ariaLabel: 'Quantile', useKatex: true },
      { display: 'stdev', latex: '\\text{stdev}(', ariaLabel: 'Standard Deviation', useKatex: true },
      { display: 'stdevp', latex: '\\text{stdevp}(', ariaLabel: 'Standard Deviation of Population', useKatex: true },
      { display: 'var', latex: '\\text{var}(', ariaLabel: 'Variance', useKatex: true },
      { display: 'varp', latex: '\\text{varp}(', ariaLabel: 'Population Variance', useKatex: true },
      { display: 'cov', latex: '\\text{cov}(', ariaLabel: 'Covariance', useKatex: true },
      { display: 'covp', latex: '\\text{covp}(', ariaLabel: 'Population Covariance', useKatex: true },
      { display: 'mad', latex: '\\text{mad}(', ariaLabel: 'Median Absolute Deviation', useKatex: true },
      { display: 'corr', latex: '\\text{corr}(', ariaLabel: 'Correlation', useKatex: true },
      { display: 'spearman', latex: '\\text{spearman}(', ariaLabel: 'Spearman Rank Correlation', useKatex: true },
      { display: 'stats', latex: '\\text{stats}(', ariaLabel: 'Summary statistics', useKatex: true },
      { display: 'count', latex: '\\text{count}(', ariaLabel: 'Count', useKatex: true },
      { display: 'total', latex: '\\text{total}(', ariaLabel: 'Total', useKatex: true },
    ],
  },

  // 4. LIST OPERATIONS
  {
    id: 'list-operations',
    name: 'List Operations',
    functions: [
      { display: 'repeat', latex: '\\text{repeat}(', ariaLabel: 'Repeat', useKatex: true },
      { display: 'join', latex: '\\text{join}(', ariaLabel: 'Join', useKatex: true },
      { display: 'sort', latex: '\\text{sort}(', ariaLabel: 'Sort', useKatex: true },
      { display: 'shuffle', latex: '\\text{shuffle}(', ariaLabel: 'Shuffle', useKatex: true },
      { display: 'unique', latex: '\\text{unique}(', ariaLabel: 'Unique', useKatex: true },
      { display: 'for', latex: '\\text{for}(', ariaLabel: 'For loop', useKatex: true },
    ],
  },

  // 5. VISUALIZATIONS
  {
    id: 'visualizations',
    name: 'Visualizations',
    helpLink: 'https://help.desmos.com/hc/en-us/articles/360022405991-Data-Visualizations',
    functions: [
      { display: 'histogram', latex: '\\text{histogram}(', ariaLabel: 'Histogram', useKatex: true },
      { display: 'dotplot', latex: '\\text{dotplot}(', ariaLabel: 'Dot Plot', useKatex: true },
      { display: 'boxplot', latex: '\\text{boxplot}(', ariaLabel: 'Box Plot', useKatex: true },
    ],
  },

  // 6. PROBABILITY DISTRIBUTIONS
  {
    id: 'probability-distributions',
    name: 'Probability Distributions',
    helpLink: 'https://help.desmos.com/hc/en-us/articles/360022401451-Distributions',
    functions: [
      { display: 'normaldist', latex: '\\text{normaldist}(', ariaLabel: 'Normal Distribution', useKatex: true },
      { display: 'tdist', latex: '\\text{tdist}(', ariaLabel: 'Student-t Distribution', useKatex: true },
      { display: 'chisqdist', latex: '\\text{chisqdist}(', ariaLabel: 'Chi-Square Distribution', useKatex: true },
      { display: 'uniformdist', latex: '\\text{uniformdist}(', ariaLabel: 'Uniform Distribution', useKatex: true },
      { display: 'binomialdist', latex: '\\text{binomialdist}(', ariaLabel: 'Binomial Distribution', useKatex: true },
      { display: 'poissondist', latex: '\\text{poissondist}(', ariaLabel: 'Poisson Distribution', useKatex: true },
      { display: 'geodist', latex: '\\text{geodist}(', ariaLabel: 'Geometric Distribution', useKatex: true },
      { display: 'pdf', latex: '\\text{pdf}(', ariaLabel: 'Probability Density Function', useKatex: true },
      { display: 'cdf', latex: '\\text{cdf}(', ariaLabel: 'Cumulative Distribution Function', useKatex: true },
      { display: 'inversecdf', latex: '\\text{inversecdf}(', ariaLabel: 'Inverse CDF function', useKatex: true },
      { display: 'random', latex: '\\text{random}(', ariaLabel: 'Random Number', useKatex: true },
    ],
  },

  // 7. INFERENCE
  {
    id: 'inference',
    name: 'Inference',
    functions: [
      { display: 'ztest', latex: '\\text{ztest}(', ariaLabel: 'Z Test', useKatex: true },
      { display: 'ttest', latex: '\\text{ttest}(', ariaLabel: 'T Test', useKatex: true },
      { display: 'zproptest', latex: '\\text{zproptest}(', ariaLabel: 'Z Test of Proportions', useKatex: true },
      { display: 'chisqtest', latex: '\\text{chisqtest}(', ariaLabel: 'Chi-Square Test', useKatex: true },
      { display: 'chisqgof', latex: '\\text{chisqgof}(', ariaLabel: 'Chi-Square Goodness of Fit Test', useKatex: true },
      { display: 'null', latex: '\\text{null}(', ariaLabel: 'Null', useKatex: true },
      { display: 'p', latex: 'p', ariaLabel: 'p', useKatex: true },
      { display: 'pleft', latex: '\\text{pleft}(', ariaLabel: 'P Left', useKatex: true },
      { display: 'pright', latex: '\\text{pright}(', ariaLabel: 'P Right', useKatex: true },
      { display: 'score', latex: '\\text{score}(', ariaLabel: 'Score', useKatex: true },
      { display: 'dof', latex: '\\text{dof}(', ariaLabel: 'Degrees of Freedom', useKatex: true },
      { display: 'stderr', latex: '\\text{stderr}(', ariaLabel: 'Standard Error', useKatex: true },
      { display: 'conf', latex: '\\text{conf}(', ariaLabel: 'Confidence Level', useKatex: true },
      { display: 'lower', latex: '\\text{lower}(', ariaLabel: 'Lower', useKatex: true },
      { display: 'upper', latex: '\\text{upper}(', ariaLabel: 'Upper', useKatex: true },
      { display: 'estimate', latex: '\\text{estimate}(', ariaLabel: 'Estimate', useKatex: true },
    ],
  },

  // 8. CALCULUS
  {
    id: 'calculus',
    name: 'Calculus',
    functions: [
      { display: 'exp', latex: '\\exp(', ariaLabel: 'Exponential', useKatex: true },
      { display: 'ln', latex: '\\ln(', ariaLabel: 'Natural Log', useKatex: true },
      { display: 'log', latex: '\\log(', ariaLabel: 'Log', useKatex: true },
      { display: 'log_a', latex: '\\log_{', ariaLabel: 'Log base a', useKatex: true },
      { display: '\\frac{d}{dx}', latex: '\\frac{d}{dx}', ariaLabel: 'Derivative', useKatex: true },
      { display: "f'", latex: "f'", ariaLabel: 'Function derivative', useKatex: true },
      { display: '\\int', latex: '\\int', ariaLabel: 'Integral', useKatex: true },
      { display: '\\sum', latex: '\\sum', ariaLabel: 'Sum', useKatex: true },
      { display: '\\prod', latex: '\\prod', ariaLabel: 'Product', useKatex: true },
    ],
  },

  // 9. HYPERBOLIC TRIG FUNCTIONS
  {
    id: 'hyperbolic-trig',
    name: 'Hyperbolic Trig Functions',
    functions: [
      { display: 'sinh', latex: '\\sinh(', ariaLabel: 'Hyperbolic Sine', useKatex: true },
      { display: 'cosh', latex: '\\cosh(', ariaLabel: 'Hyperbolic Cosine', useKatex: true },
      { display: 'tanh', latex: '\\tanh(', ariaLabel: 'Hyperbolic Tangent', useKatex: true },
      { display: 'csch', latex: '\\text{csch}(', ariaLabel: 'Hyperbolic Cosecant', useKatex: true },
      { display: 'sech', latex: '\\text{sech}(', ariaLabel: 'Hyperbolic Secant', useKatex: true },
      { display: 'coth', latex: '\\coth(', ariaLabel: 'Hyperbolic Cotangent', useKatex: true },
    ],
  },

  // 10. GEOMETRY
  {
    id: 'geometry',
    name: 'Geometry',
    functions: [
      { display: 'polygon', latex: '\\text{polygon}(', ariaLabel: 'Polygon', useKatex: true },
      { display: 'distance', latex: '\\text{distance}(', ariaLabel: 'Distance', useKatex: true },
      { display: 'midpoint', latex: '\\text{midpoint}(', ariaLabel: 'Midpoint', useKatex: true },
    ],
  },

  // 11. CUSTOM COLORS
  {
    id: 'custom-colors',
    name: 'Custom Colors',
    helpLink: 'https://help.desmos.com/hc/en-us/articles/4406795899533-Custom-Colors',
    functions: [
      { display: 'rgb', latex: '\\text{rgb}(', ariaLabel: 'RGB', useKatex: true },
      { display: 'hsv', latex: '\\text{hsv}(', ariaLabel: 'HSV', useKatex: true },
      { display: 'okhsv', latex: '\\text{okhsv}(', ariaLabel: 'OKHSV', useKatex: true },
      { display: 'oklab', latex: '\\text{oklab}(', ariaLabel: 'OKLAB', useKatex: true },
      { display: 'oklch', latex: '\\text{oklch}(', ariaLabel: 'OKLCH', useKatex: true },
    ],
  },

  // 12. SOUND
  {
    id: 'sound',
    name: 'Sound',
    helpLink: 'https://help.desmos.com/hc/en-us/articles/21373904717197-Tone',
    functions: [
      { display: 'tone', latex: '\\text{tone}(', ariaLabel: 'Tone', useKatex: true },
    ],
  },

  // 13. NUMBER THEORY
  {
    id: 'number-theory',
    name: 'Number Theory',
    functions: [
      { display: 'lcm', latex: '\\text{lcm}(', ariaLabel: 'Least Common Multiple', useKatex: true },
      { display: 'gcd', latex: '\\gcd(', ariaLabel: 'Greatest Common Divisor', useKatex: true },
      { display: 'mod', latex: '\\mod', ariaLabel: 'Modulo', useKatex: true },
      { display: 'ceil', latex: '\\lceil \\rceil', ariaLabel: 'Ceiling', useKatex: true },
      { display: 'floor', latex: '\\lfloor \\rfloor', ariaLabel: 'Floor', useKatex: true },
      { display: 'round', latex: '\\text{round}(', ariaLabel: 'Round', useKatex: true },
      { display: 'sign', latex: '\\text{sign}(', ariaLabel: 'Sign', useKatex: true },
      { display: '\\sqrt[n]{}', latex: '\\sqrt[n]{}', ariaLabel: 'Nth Root', useKatex: true },
      { display: 'nPr', latex: '\\text{nPr}', ariaLabel: 'Permutations', useKatex: true },
      { display: 'nCr', latex: '\\text{nCr}', ariaLabel: 'Combinations', useKatex: true },
    ],
  },
];
