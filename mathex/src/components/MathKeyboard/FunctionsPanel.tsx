import React from 'react';
import './FunctionsPanel.css';

/**
 * Function button configuration
 */
interface FunctionButton {
  label: string;
  latex: string;
  ariaLabel: string;
}

/**
 * Function category configuration
 */
interface FunctionCategory {
  id: string;
  title: string;
  buttons: FunctionButton[];
}

/**
 * Props for FunctionsPanel
 */
export interface FunctionsPanelProps {
  isOpen: boolean;
  onFunctionClick: (latex: string) => void;
  onClose: () => void;
}

/**
 * All 13 function categories from Desmos
 */
const FUNCTION_CATEGORIES: FunctionCategory[] = [
  // Category 1: TRIG FUNCTIONS
  {
    id: 'trig',
    title: 'TRIG FUNCTIONS',
    buttons: [
      { label: 'sin', latex: '\\sin(', ariaLabel: 'sine' },
      { label: 'cos', latex: '\\cos(', ariaLabel: 'cosine' },
      { label: 'tan', latex: '\\tan(', ariaLabel: 'tangent' },
      { label: 'csc', latex: '\\csc(', ariaLabel: 'cosecant' },
      { label: 'sec', latex: '\\sec(', ariaLabel: 'secant' },
      { label: 'cot', latex: '\\cot(', ariaLabel: 'cotangent' },
    ],
  },

  // Category 2: INVERSE TRIG FUNCTIONS
  {
    id: 'inverse-trig',
    title: 'INVERSE TRIG FUNCTIONS',
    buttons: [
      { label: 'sin⁻¹', latex: '\\sin^{-1}(', ariaLabel: 'arcsine' },
      { label: 'cos⁻¹', latex: '\\cos^{-1}(', ariaLabel: 'arccosine' },
      { label: 'tan⁻¹', latex: '\\tan^{-1}(', ariaLabel: 'arctangent' },
      { label: 'csc⁻¹', latex: '\\csc^{-1}(', ariaLabel: 'arccosecant' },
      { label: 'sec⁻¹', latex: '\\sec^{-1}(', ariaLabel: 'arcsecant' },
      { label: 'cot⁻¹', latex: '\\cot^{-1}(', ariaLabel: 'arccotangent' },
    ],
  },

  // Category 3: STATISTICS
  {
    id: 'statistics',
    title: 'STATISTICS',
    buttons: [
      { label: 'mean', latex: '\\text{mean}(', ariaLabel: 'mean' },
      { label: 'median', latex: '\\text{median}(', ariaLabel: 'median' },
      { label: 'min', latex: '\\min(', ariaLabel: 'minimum' },
      { label: 'max', latex: '\\max(', ariaLabel: 'maximum' },
      { label: 'quartile', latex: '\\text{quartile}(', ariaLabel: 'quartile' },
      { label: 'quantile', latex: '\\text{quantile}(', ariaLabel: 'quantile' },
      { label: 'stdev', latex: '\\text{stdev}(', ariaLabel: 'standard deviation' },
      { label: 'stdevp', latex: '\\text{stdevp}(', ariaLabel: 'population standard deviation' },
      { label: 'var', latex: '\\text{var}(', ariaLabel: 'variance' },
      { label: 'varp', latex: '\\text{varp}(', ariaLabel: 'population variance' },
      { label: 'cov', latex: '\\text{cov}(', ariaLabel: 'covariance' },
      { label: 'covp', latex: '\\text{covp}(', ariaLabel: 'population covariance' },
      { label: 'mad', latex: '\\text{mad}(', ariaLabel: 'mean absolute deviation' },
      { label: 'corr', latex: '\\text{corr}(', ariaLabel: 'correlation' },
      { label: 'spearman', latex: '\\text{spearman}(', ariaLabel: 'spearman correlation' },
      { label: 'stats', latex: '\\text{stats}(', ariaLabel: 'statistics' },
      { label: 'count', latex: '\\text{count}(', ariaLabel: 'count' },
      { label: 'total', latex: '\\text{total}(', ariaLabel: 'total' },
    ],
  },

  // Category 4: LIST OPERATIONS
  {
    id: 'list-operations',
    title: 'LIST OPERATIONS',
    buttons: [
      { label: 'repeat', latex: '\\text{repeat}(', ariaLabel: 'repeat' },
      { label: 'join', latex: '\\text{join}(', ariaLabel: 'join' },
      { label: 'sort', latex: '\\text{sort}(', ariaLabel: 'sort' },
      { label: 'shuffle', latex: '\\text{shuffle}(', ariaLabel: 'shuffle' },
      { label: 'unique', latex: '\\text{unique}(', ariaLabel: 'unique' },
      { label: 'for', latex: '\\text{for}(', ariaLabel: 'for loop' },
    ],
  },

  // Category 5: VISUALIZATIONS
  {
    id: 'visualizations',
    title: 'VISUALIZATIONS',
    buttons: [
      { label: 'histogram', latex: '\\text{histogram}(', ariaLabel: 'histogram' },
      { label: 'dotplot', latex: '\\text{dotplot}(', ariaLabel: 'dot plot' },
      { label: 'boxplot', latex: '\\text{boxplot}(', ariaLabel: 'box plot' },
    ],
  },

  // Category 6: PROBABILITY DISTRIBUTIONS
  {
    id: 'probability',
    title: 'PROBABILITY DISTRIBUTIONS',
    buttons: [
      { label: 'normaldist', latex: '\\text{normaldist}(', ariaLabel: 'normal distribution' },
      { label: 'tdist', latex: '\\text{tdist}(', ariaLabel: 't distribution' },
      { label: 'chisqdist', latex: '\\text{chisqdist}(', ariaLabel: 'chi-squared distribution' },
      { label: 'uniformdist', latex: '\\text{uniformdist}(', ariaLabel: 'uniform distribution' },
      { label: 'binomialdist', latex: '\\text{binomialdist}(', ariaLabel: 'binomial distribution' },
      { label: 'poissondist', latex: '\\text{poissondist}(', ariaLabel: 'poisson distribution' },
      { label: 'geodist', latex: '\\text{geodist}(', ariaLabel: 'geometric distribution' },
      { label: 'pdf', latex: '\\text{pdf}(', ariaLabel: 'probability density function' },
      { label: 'cdf', latex: '\\text{cdf}(', ariaLabel: 'cumulative distribution function' },
      { label: 'inversecdf', latex: '\\text{inversecdf}(', ariaLabel: 'inverse CDF' },
      { label: 'random', latex: '\\text{random}(', ariaLabel: 'random' },
    ],
  },

  // Category 7: INFERENCE
  {
    id: 'inference',
    title: 'INFERENCE',
    buttons: [
      { label: 'ztest', latex: '\\text{ztest}(', ariaLabel: 'z-test' },
      { label: 'ttest', latex: '\\text{ttest}(', ariaLabel: 't-test' },
      { label: 'zproptest', latex: '\\text{zproptest}(', ariaLabel: 'z proportion test' },
      { label: 'chisqtest', latex: '\\text{chisqtest}(', ariaLabel: 'chi-squared test' },
      { label: 'chisqgof', latex: '\\text{chisqgof}(', ariaLabel: 'chi-squared goodness of fit' },
      { label: 'null', latex: '\\text{null}(', ariaLabel: 'null hypothesis' },
      { label: 'p', latex: '\\text{p}(', ariaLabel: 'p-value' },
      { label: 'pleft', latex: '\\text{pleft}(', ariaLabel: 'left p-value' },
      { label: 'pright', latex: '\\text{pright}(', ariaLabel: 'right p-value' },
      { label: 'score', latex: '\\text{score}(', ariaLabel: 'score' },
      { label: 'dof', latex: '\\text{dof}(', ariaLabel: 'degrees of freedom' },
      { label: 'stderr', latex: '\\text{stderr}(', ariaLabel: 'standard error' },
      { label: 'conf', latex: '\\text{conf}(', ariaLabel: 'confidence' },
      { label: 'lower', latex: '\\text{lower}(', ariaLabel: 'lower bound' },
      { label: 'upper', latex: '\\text{upper}(', ariaLabel: 'upper bound' },
      { label: 'estimate', latex: '\\text{estimate}(', ariaLabel: 'estimate' },
    ],
  },

  // Category 8: CALCULUS
  {
    id: 'calculus',
    title: 'CALCULUS',
    buttons: [
      { label: 'exp', latex: 'e^{', ariaLabel: 'exponential' },
      { label: 'ln', latex: '\\ln(', ariaLabel: 'natural logarithm' },
      { label: 'log', latex: '\\log(', ariaLabel: 'logarithm' },
      { label: 'logₐ', latex: '\\log_{', ariaLabel: 'logarithm base a' },
      { label: 'd/dx', latex: '\\frac{d}{dx}', ariaLabel: 'derivative' },
      { label: "f'", latex: "f'(", ariaLabel: 'derivative notation' },
      { label: '∫', latex: '\\int ', ariaLabel: 'integral' },
      { label: 'Σ', latex: '\\sum_{', ariaLabel: 'summation' },
      { label: 'Π', latex: '\\prod_{', ariaLabel: 'product' },
    ],
  },

  // Category 9: HYPERBOLIC TRIG FUNCTIONS
  {
    id: 'hyperbolic-trig',
    title: 'HYPERBOLIC TRIG FUNCTIONS',
    buttons: [
      { label: 'sinh', latex: '\\sinh(', ariaLabel: 'hyperbolic sine' },
      { label: 'cosh', latex: '\\cosh(', ariaLabel: 'hyperbolic cosine' },
      { label: 'tanh', latex: '\\tanh(', ariaLabel: 'hyperbolic tangent' },
      { label: 'csch', latex: '\\text{csch}(', ariaLabel: 'hyperbolic cosecant' },
      { label: 'sech', latex: '\\text{sech}(', ariaLabel: 'hyperbolic secant' },
      { label: 'coth', latex: '\\text{coth}(', ariaLabel: 'hyperbolic cotangent' },
    ],
  },

  // Category 10: GEOMETRY
  {
    id: 'geometry',
    title: 'GEOMETRY',
    buttons: [
      { label: 'polygon', latex: '\\text{polygon}(', ariaLabel: 'polygon' },
      { label: 'distance', latex: '\\text{distance}(', ariaLabel: 'distance' },
      { label: 'midpoint', latex: '\\text{midpoint}(', ariaLabel: 'midpoint' },
    ],
  },

  // Category 11: CUSTOM COLORS
  {
    id: 'custom-colors',
    title: 'CUSTOM COLORS',
    buttons: [
      { label: 'rgb', latex: '\\text{rgb}(', ariaLabel: 'RGB color' },
      { label: 'hsv', latex: '\\text{hsv}(', ariaLabel: 'HSV color' },
      { label: 'okhsv', latex: '\\text{okhsv}(', ariaLabel: 'OkHSV color' },
      { label: 'oklab', latex: '\\text{oklab}(', ariaLabel: 'OkLab color' },
      { label: 'oklch', latex: '\\text{oklch}(', ariaLabel: 'OkLCH color' },
    ],
  },

  // Category 12: SOUND
  {
    id: 'sound',
    title: 'SOUND',
    buttons: [{ label: 'tone', latex: '\\text{tone}(', ariaLabel: 'tone' }],
  },

  // Category 13: NUMBER THEORY
  {
    id: 'number-theory',
    title: 'NUMBER THEORY',
    buttons: [
      { label: 'lcm', latex: '\\text{lcm}(', ariaLabel: 'least common multiple' },
      { label: 'gcd', latex: '\\gcd(', ariaLabel: 'greatest common divisor' },
      { label: 'mod', latex: '\\mod ', ariaLabel: 'modulo' },
      { label: 'ceil', latex: '\\lceil ', ariaLabel: 'ceiling' },
      { label: 'floor', latex: '\\lfloor ', ariaLabel: 'floor' },
      { label: 'round', latex: '\\text{round}(', ariaLabel: 'round' },
      { label: 'sign', latex: '\\text{sign}(', ariaLabel: 'sign' },
      { label: 'ⁿ√', latex: '\\sqrt[n]{', ariaLabel: 'nth root' },
      { label: 'nPr', latex: 'P(n,r)', ariaLabel: 'permutation' },
      { label: 'nCr', latex: '\\binom{n}{r}', ariaLabel: 'combination' },
    ],
  },
];

/**
 * FunctionsPanel - Side panel with mathematical function categories
 *
 * Displays all 13 function categories from Desmos with smooth animations.
 *
 * @component
 */
export const FunctionsPanel: React.FC<FunctionsPanelProps> = ({ isOpen, onFunctionClick, onClose }) => {
  const handleFunctionClick = (latex: string) => {
    onFunctionClick(latex);
  };

  return (
    <div className={`mathex-functions-panel ${isOpen ? 'mathex-functions-panel--open' : ''}`}>
      <div className="mathex-functions-header">
        <h2>Functions</h2>
        <button className="mathex-functions-close" onClick={onClose} aria-label="Close functions panel" type="button">
          ×
        </button>
      </div>

      <div className="mathex-functions-content">
        {FUNCTION_CATEGORIES.map((category) => (
          <div key={category.id} className="mathex-function-category">
            <h3 className="mathex-function-category-title">{category.title}</h3>
            <div className="mathex-function-buttons">
              {category.buttons.map((button) => (
                <button
                  key={button.latex}
                  className="mathex-function-btn"
                  onClick={() => handleFunctionClick(button.latex)}
                  aria-label={button.ariaLabel}
                  type="button"
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FunctionsPanel.displayName = 'FunctionsPanel';
