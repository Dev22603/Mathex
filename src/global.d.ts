/**
 * Global type declarations for third-party libraries
 */

// MathQuill - minimal types for our usage
declare module 'mathquill' {
  export default class MathQuill {
    static getInterface(version: number): any;
  }
}

// MathQuill CSS
declare module 'mathquill/build/mathquill.css' {
  const content: any;
  export default content;
}
