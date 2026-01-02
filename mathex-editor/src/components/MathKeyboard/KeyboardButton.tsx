import React from 'react';
import type { ButtonConfig } from '../../types';

/**
 * Props for the KeyboardButton component
 */
export interface KeyboardButtonProps {
  /** Button configuration containing display text and LaTeX */
  config: ButtonConfig;
  /** Click handler that receives the LaTeX to insert */
  onClick: (latex: string) => void;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Whether the button spans multiple columns (for special buttons like Backspace) */
  wide?: boolean;
}

/**
 * KeyboardButton Component
 *
 * A single button in the math keyboard that inserts LaTeX when clicked.
 * Supports hover states, click animations, and custom styling.
 */
export const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  config,
  onClick,
  className = '',
  style,
  wide = false,
}) => {
  const handleClick = () => {
    onClick(config.latex);
  };

  /**
   * Prevent the default mousedown behavior to keep the input focused
   * when clicking keyboard buttons
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const buttonClass = `math-keyboard__button math-keyboard__button--${config.type}${wide ? ' math-keyboard__button--wide' : ''}${className ? ` ${className}` : ''}`;

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={style}
      aria-label={`Insert ${config.display}`}
      title={`Insert ${config.display}`}
    >
      <span className="math-keyboard__button-content">
        {config.display}
      </span>
    </button>
  );
};
