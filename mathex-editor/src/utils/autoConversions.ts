/**
 * Auto-Conversion Utilities
 *
 * Automatic conversion of common math notation to LaTeX format
 * Example: x/y → \frac{x}{y}
 */

import {
  isOperator,
  isAlphanumeric,
  isAlpha,
  consumeBalanced,
  consumeLatexCommand,
} from './latexParser';

/**
 * Result of a conversion operation
 */
export interface ConversionResult {
  /** The converted LaTeX string */
  newLatex: string;
  /** New cursor position after conversion */
  newCursorPos: number;
  /** Whether conversion was performed */
  converted: boolean;
}

/**
 * Check if conversion should be skipped at the given position
 *
 * Skip conversion if:
 * - The "/" is escaped (preceded by backslash)
 * - The "/" is inside an existing \frac{}{} command
 *
 * @param latex - The LaTeX string
 * @param slashPos - Position of the "/" character
 * @returns true if conversion should be skipped
 */
function shouldSkipConversion(latex: string, slashPos: number): boolean {
  // Check if slash is escaped
  if (slashPos > 0 && latex[slashPos - 1] === '\\') {
    return true;
  }

  // Check if we're inside an existing \frac
  const beforeSlash = latex.substring(0, slashPos);
  const lastFrac = beforeSlash.lastIndexOf('\\frac{');

  if (lastFrac !== -1) {
    // Count braces between \frac and /
    const between = beforeSlash.substring(lastFrac);
    const openBraces = (between.match(/\{/g) || []).length;
    const closeBraces = (between.match(/\}/g) || []).length;

    if (openBraces > closeBraces) {
      return true; // We're inside \frac, skip conversion
    }
  }

  return false;
}

/**
 * Find the start position of the numerator by parsing backward from "/"
 *
 * Consumes:
 * - Alphanumeric characters (variables, numbers)
 * - LaTeX commands (\sin, \theta, etc.)
 * - Balanced parentheses and braces
 * - Superscripts and subscripts (^, _)
 *
 * Stops at:
 * - Binary operators (+, -, =, <, >, *)
 * - Whitespace
 * - Start of string
 * - Unmatched delimiters
 *
 * @param latex - The LaTeX string
 * @param slashPos - Position of the "/" character
 * @returns Starting position of the numerator
 */
function findNumeratorStart(latex: string, slashPos: number): number {
  let pos = slashPos - 1;
  let parenDepth = 0;
  let braceDepth = 0;
  let inCommand = false;

  while (pos >= 0) {
    const char = latex[pos];

    // Check for operators (stop boundaries) when not inside delimiters
    if (parenDepth === 0 && braceDepth === 0 && !inCommand) {
      if (isOperator(char)) {
        return pos + 1; // Start after operator
      }
      if (char === ' ') {
        return pos + 1; // Start after space
      }
    }

    // Track parentheses
    if (char === ')') parenDepth++;
    if (char === '(') {
      parenDepth--;
      if (parenDepth < 0) {
        // Unmatched opening paren
        return pos + 1;
      }
      // Check if this is part of a function call
      if (parenDepth === 0) {
        // Look backward for LaTeX command or function name
        let checkPos = pos - 1;
        while (checkPos >= 0 && isAlpha(latex[checkPos])) {
          checkPos--;
        }
        if (checkPos >= 0 && latex[checkPos] === '\\') {
          // It's a LaTeX function like \sin(x)
          pos = checkPos;
          continue;
        } else if (checkPos < pos - 1) {
          // It's a plain function name like sin(x)
          pos = checkPos + 1;
          continue;
        }
      }
    }

    // Track braces
    if (char === '}') braceDepth++;
    if (char === '{') {
      braceDepth--;
      if (braceDepth < 0) {
        // Unmatched opening brace
        return pos + 1;
      }
      // Check if this is part of a LaTeX command
      if (pos > 0 && braceDepth === 0) {
        let checkPos = pos - 1;
        while (checkPos >= 0 && isAlpha(latex[checkPos])) {
          checkPos--;
        }
        if (checkPos >= 0 && latex[checkPos] === '\\') {
          // It's a LaTeX command with argument
          pos = checkPos;
          continue;
        }
      }
    }

    // Track LaTeX commands
    if (char === '\\') {
      inCommand = true;
    } else if (inCommand && !isAlpha(char)) {
      inCommand = false;
    }

    // Handle superscripts and subscripts
    if ((char === '^' || char === '_') && parenDepth === 0 && braceDepth === 0) {
      // This is part of the numerator, continue
    }

    pos--;
  }

  return 0; // Reached start of string
}

/**
 * Find the end position of the denominator by parsing forward from "/"
 *
 * Uses greedy single-term consumption:
 * - Consumes ONE complete term (number, variable, function, or parenthesized expression)
 * - Includes attached superscripts/subscripts
 * - Stops at operators, whitespace, or end of string
 *
 * @param latex - The LaTeX string
 * @param slashPos - Position of the "/" character
 * @returns Ending position of the denominator (exclusive)
 */
function findDenominatorEnd(latex: string, slashPos: number): number {
  let pos = slashPos + 1;

  if (pos >= latex.length) {
    return pos; // Empty denominator
  }

  // Skip leading whitespace
  while (pos < latex.length && latex[pos] === ' ') {
    pos++;
  }

  if (pos >= latex.length) {
    return pos; // Only whitespace after /
  }

  // Case 1: Starts with opening parenthesis
  if (latex[pos] === '(') {
    pos = consumeBalanced(latex, pos, '(', ')');
  }
  // Case 2: Starts with opening brace
  else if (latex[pos] === '{') {
    pos = consumeBalanced(latex, pos, '{', '}');
  }
  // Case 3: Starts with LaTeX command
  else if (latex[pos] === '\\') {
    pos = consumeLatexCommand(latex, pos);

    // Check if command has arguments in parentheses or braces
    if (pos < latex.length && latex[pos] === '(') {
      pos = consumeBalanced(latex, pos, '(', ')');
    }
    if (pos < latex.length && latex[pos] === '{') {
      pos = consumeBalanced(latex, pos, '{', '}');
    }
  }
  // Case 4: Simple variable/number or decimal number
  else {
    while (pos < latex.length && (isAlphanumeric(latex[pos]) || latex[pos] === '.')) {
      pos++;
    }
  }

  // Check for superscript/subscript attachments
  while (pos < latex.length) {
    if (latex[pos] === '^' || latex[pos] === '_') {
      pos++; // Skip ^ or _
      if (pos < latex.length && latex[pos] === '{') {
        pos = consumeBalanced(latex, pos, '{', '}');
      } else if (pos < latex.length) {
        // Single character superscript/subscript
        pos++;
      }
    } else {
      break;
    }
  }

  return pos;
}

/**
 * Convert "/" to \frac{}{} format
 *
 * Detects the numerator and denominator around the "/" and converts to LaTeX fraction format.
 * Places cursor inside the denominator for natural typing continuation.
 *
 * @param latex - The current LaTeX string
 * @param cursorPos - Current cursor position
 * @returns Conversion result with new LaTeX, cursor position, and conversion status
 */
export function convertSlashToFrac(
  latex: string,
  cursorPos: number
): ConversionResult {
  // Find the "/" at or before cursor
  const slashPos = cursorPos - 1;

  if (slashPos < 0 || latex[slashPos] !== '/') {
    return { newLatex: latex, newCursorPos: cursorPos, converted: false };
  }

  // Check if we should skip conversion
  if (shouldSkipConversion(latex, slashPos)) {
    return { newLatex: latex, newCursorPos: cursorPos, converted: false };
  }

  // Find numerator and denominator boundaries
  const numStart = findNumeratorStart(latex, slashPos);
  const denomEnd = findDenominatorEnd(latex, slashPos);

  const numerator = latex.substring(numStart, slashPos);
  const denominator = latex.substring(slashPos + 1, denomEnd);

  // If both are empty, don't convert (just a lone /)
  if (numerator.trim() === '' && denominator.trim() === '') {
    return { newLatex: latex, newCursorPos: cursorPos, converted: false };
  }

  // Build new LaTeX
  const before = latex.substring(0, numStart);
  const after = latex.substring(denomEnd);
  const fraction = `\\frac{${numerator}}{${denominator}}`;
  const newLatex = before + fraction + after;

  // Calculate cursor position
  // If numerator is empty, place cursor in numerator; otherwise in denominator
  let newCursorPos: number;
  if (numerator.trim() === '') {
    newCursorPos = numStart + '\\frac{'.length;
  } else {
    newCursorPos = numStart + `\\frac{${numerator}}{`.length;
  }

  return {
    newLatex,
    newCursorPos,
    converted: true,
  };
}
