/**
 * Type definitions for MathQuill
 * MathQuill doesn't have official types, so we define the minimal interface we need
 */

declare module 'mathquill' {
  interface MathFieldConfig {
    spaceBehavesLikeTab?: boolean;
    leftRightIntoCmdGoes?: 'up' | 'down';
    restrictMismatchedBrackets?: boolean;
    sumStartsWithNEquals?: boolean;
    supSubsRequireOperand?: boolean;
    charsThatBreakOutOfSupSub?: string;
    autoSubscriptNumerals?: boolean;
    autoCommands?: string;
    autoOperatorNames?: string;
    substituteTextarea?: () => HTMLTextAreaElement;
    handlers?: {
      edit?: (mathField: MathField) => void;
      upOutOf?: (mathField: MathField) => void;
      downOutOf?: (mathField: MathField) => void;
      enter?: (mathField: MathField) => void;
      moveOutOf?: (direction: number, mathField: MathField) => void;
    };
  }

  interface MathField {
    latex(): string;
    latex(latex: string): MathField;
    write(latex: string): MathField;
    cmd(latex: string): MathField;
    select(): MathField;
    clearSelection(): MathField;
    moveToLeftEnd(): MathField;
    moveToRightEnd(): MathField;
    keystroke(keys: string): MathField;
    typedText(text: string): MathField;
    focus(): MathField;
    blur(): MathField;
    revert(): HTMLElement;
    reflow(): MathField;
    el(): HTMLElement;
  }

  interface StaticMath {
    latex(): string;
    latex(latex: string): StaticMath;
    revert(): HTMLElement;
    reflow(): StaticMath;
    el(): HTMLElement;
  }

  interface MathQuillStatic {
    getInterface(version: number): MathQuillAPI;
  }

  interface MathQuillAPI {
    MathField(element: HTMLElement, config?: MathFieldConfig): MathField;
    StaticMath(element: HTMLElement): StaticMath;
  }

  const MathQuill: MathQuillStatic;
  export default MathQuill;
}
