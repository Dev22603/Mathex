/**
 * LaTeX Parser Utilities
 *
 * Helper functions for parsing and analyzing LaTeX structure
 */

/**
 * Check if a character is a binary operator
 */
export function isOperator(char: string): boolean {
  return ['+', '-', '=', '<', '>',  '*'].includes(char);
}

/**
 * Check if a character is alphanumeric
 */
export function isAlphanumeric(char: string): boolean {
  return /[a-zA-Z0-9]/.test(char);
}

/**
 * Check if a character is alphabetic
 */
export function isAlpha(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

/**
 * Consume balanced delimiters (parentheses, braces, etc.)
 * Returns the position after the closing delimiter
 *
 * @param latex - The LaTeX string
 * @param pos - Starting position (should be at opening delimiter)
 * @param open - Opening delimiter character
 * @param close - Closing delimiter character
 * @returns Position after closing delimiter, or end of string if unmatched
 */
export function consumeBalanced(
  latex: string,
  pos: number,
  open: string,
  close: string
): number {
  if (latex[pos] !== open) return pos;

  let depth = 1;
  let current = pos + 1;

  while (current < latex.length && depth > 0) {
    if (latex[current] === open) depth++;
    if (latex[current] === close) depth--;
    current++;
  }

  return current;
}

/**
 * Consume a LaTeX command starting with backslash
 * Returns the position after the command name
 *
 * @param latex - The LaTeX string
 * @param pos - Starting position (should be at backslash)
 * @returns Position after command name
 */
export function consumeLatexCommand(latex: string, pos: number): number {
  if (latex[pos] !== '\\') return pos;

  let current = pos + 1;

  // Consume alphabetic characters (command name)
  while (current < latex.length && isAlpha(latex[current])) {
    current++;
  }

  return current;
}
