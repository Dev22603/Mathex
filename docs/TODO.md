# TODO: Math Equation Editor Component Library

**Project**: React-based component library for visual math equation editing
**Package Name**: `mathex`
**Vision**: Build a Desmos-like WYSIWYG math editor that developers can integrate into educational platforms

**Current Status**: 📋 Planning Phase - Project Not Started Yet

## Quick Usage Overview (Target API)
```jsx
import { MathInput, MathKeyboard } from 'mathex';

function App() {
  return (
    <div>
      <MathInput onChange={(latex) => console.log(latex)} />
      <MathKeyboard />
    </div>
  );
}
```

---

## PHASE 0: Project Setup & Infrastructure

### 0.1 Initial Setup
- [ ] Initialize React + TypeScript + Vite project
  - [ ] Run `npm create vite@latest mathex -- --template react-ts`
  - [ ] Configure TypeScript strict mode
  - [ ] Set up proper tsconfig.json
- [ ] Install core dependencies
  - [ ] `npm install katex react react-dom`
  - [ ] `npm install -D @types/katex`
  - [ ] `npm install clsx` (for conditional CSS classes)
- [ ] Configure build tools
  - [ ] Set up Vite for library mode
  - [ ] Configure rollup output (ESM, CJS, UMD)
  - [ ] Enable tree-shaking

### 0.2 Development Tools
- [ ] ESLint + Prettier setup
  - [ ] Install eslint, prettier
  - [ ] Configure rules (.eslintrc, .prettierrc)
  - [ ] Add format/lint scripts to package.json
- [ ] Git configuration
  - [ ] Create .gitignore (node_modules, dist, .env)
  - [ ] Set up initial commit
  - [ ] Create development branch structure

### 0.3 Project Structure
- [ ] Create folder structure:
  ```
  src/
  ├── components/
  │   ├── MathInput/
  │   ├── MathKeyboard/
  │   └── MathProvider/
  ├── hooks/
  ├── types/
  ├── utils/
  ├── styles/
  └── index.ts (main export)
  ```
- [ ] Set up barrel exports (index.ts files)
- [ ] Create base type definitions

---

## PHASE 1: Foundation - Basic MathInput Component

### 1.1 Basic MathInput Component Structure
- [ ] Create MathInput component file
  - [ ] File: `src/components/MathInput/MathInput.tsx`
  - [ ] Define MathInputProps interface
  - [ ] Set up basic React component
- [ ] Implement props interface:
  ```typescript
  interface MathInputProps {
    value?: string;           // LaTeX string (controlled)
    defaultValue?: string;    // LaTeX string (uncontrolled)
    onChange?: (latex: string) => void;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    readOnly?: boolean;
    onError?: (error: Error) => void;
  }
  ```

### 1.2 KaTeX Integration
- [ ] Install and configure KaTeX
  - [ ] Import KaTeX styles in component
  - [ ] Create render function using katex.renderToString()
- [ ] Implement LaTeX rendering
  - [ ] Parse LaTeX string from props
  - [ ] Render with KaTeX
  - [ ] Display rendered output in component
- [ ] Error handling
  - [ ] Try-catch around KaTeX rendering
  - [ ] Show raw LaTeX on error with warning icon
  - [ ] Call onError prop if provided

### 1.3 Basic Text Input
- [ ] Implement editable container
  - [ ] Use contentEditable div (Desmos-like approach)
  - [ ] Capture user typing
  - [ ] Update LaTeX state on input
  - [ ] **Note**: Research Desmos behavior - start simple, iterate based on testing
- [ ] Hardware keyboard support
  - [ ] onKeyDown handler for typing
  - [ ] Support basic LaTeX syntax: `x^2`, `\frac{a}{b}`, etc.
  - [ ] Real-time re-rendering as user types

### 1.4 Cursor Management (Simple Version)
- [ ] Cursor state
  - [ ] Track cursor position (start at end of string)
  - [ ] Display visual cursor (blinking I-beam)
- [ ] Basic cursor positioning
  - [ ] Cursor always at end for Phase 1
  - [ ] Handle clicking to focus (cursor goes to end)
  - [ ] Arrow key navigation (left/right)

### 1.5 Focus/Blur Handling
- [ ] Focus state management
  - [ ] onFocus handler - show cursor
  - [ ] onBlur handler - hide cursor
  - [ ] Visual focus indicator (blue left border)
- [ ] Multiple instances support
  - [ ] Each MathInput tracks its own focus state
  - [ ] Only one input focused at a time

### 1.6 Styling
- [ ] Create base CSS/styles
  - [ ] File: `src/components/MathInput/MathInput.css`
  - [ ] Implement unfocused state styles
  - [ ] Implement focused state (blue 3px left border)
  - [ ] Implement error state (orange background)
  - [ ] Cursor blinking animation
- [ ] CSS variables for theming
  - [ ] Define color variables
  - [ ] Define sizing variables

---

## PHASE 2: MathKeyboard - Basic Version

### 2.1 MathKeyboard Component Structure
- [ ] Create MathKeyboard component
  - [ ] File: `src/components/MathKeyboard/MathKeyboard.tsx`
  - [ ] Define MathKeyboardProps interface
- [ ] Props interface:
  ```typescript
  interface MathKeyboardProps {
    mode?: 'basic' | 'calculus' | 'chemistry';
    position?: 'fixed-bottom' | 'floating';
    className?: string;
    style?: React.CSSProperties;
    defaultVisible?: boolean;
    showToggleButton?: boolean;
  }
  ```

### 2.2 Basic Button Layout
- [ ] Define button configuration types
  ```typescript
  interface ButtonConfig {
    display: string;      // What shows on button
    latex: string;        // LaTeX to insert
    type: 'symbol' | 'number' | 'operator' | 'function';
  }
  ```
- [ ] Create Basic Mode button grid
  - [ ] Numbers: 0-9
  - [ ] Operators: +, -, ×, ÷, =
  - [ ] Variables: x, y
  - [ ] Basic symbols: (, ), π, √
  - [ ] Superscript/power: a²(^2), aᵇ(^{})
  - [ ] Comparison: <, >, ≤, ≥
  - [ ] Special: |a|, comma

### 2.3 Button Component
- [ ] Create reusable Button component
  - [ ] File: `src/components/MathKeyboard/KeyboardButton.tsx`
  - [ ] Props: display, onClick, className
  - [ ] Hover states
  - [ ] Click animation/feedback
- [ ] Button styling
  - [ ] 60px × 50px dimensions
  - [ ] 6px gap between buttons
  - [ ] Hover: translateY(-1px) + shadow
  - [ ] Active: pressed effect

### 2.4 Keyboard Layout Grid
- [ ] Implement grid layout
  - [ ] Use CSS Grid or Flexbox
  - [ ] 3 sections: Variables, Numbers, Functions/Nav
  - [ ] Proper spacing (20px between sections)
- [ ] Special buttons
  - [ ] Backspace button (150px wide)
  - [ ] Enter button (150px wide, blue)
  - [ ] Arrow keys (← →) for navigation
  - [ ] Functions button (150px wide, opens panel)

### 2.5 Toggle Visibility
- [ ] Visibility state management
  - [ ] useState for keyboard visible/hidden
  - [ ] Toggle button (always visible)
- [ ] Show/hide animation
  - [ ] Slide up from bottom (300ms)
  - [ ] Slide down to hide
  - [ ] CSS transitions

### 2.6 Fixed Positioning
- [ ] Position keyboard at bottom of viewport
  - [ ] `position: fixed; bottom: 0;`
  - [ ] Full width or centered
  - [ ] z-index management
- [ ] Responsive background
  - [ ] Light gray background (#F5F5F5)
  - [ ] Rounded top corners (8px)
  - [ ] Proper padding (16px)

---

## PHASE 3: Context & Multi-Input Communication

### 3.1 MathProvider Setup
- [ ] Create Context
  - [ ] File: `src/components/MathProvider/MathContext.tsx`
  - [ ] Define MathContextState interface
  - [ ] Create React Context
- [ ] Context state structure:
  ```typescript
  interface MathContextState {
    activeInputId: string | null;
    keyboardVisible: boolean;
    keyboardMode: 'basic' | 'calculus' | 'chemistry';
    inputs: Map<string, MathInputState>;
    theme: ThemeConfig;
  }
  ```

### 3.2 Context Actions/Methods
- [ ] Implement context methods
  - [ ] `registerInput(id, state)` - input registers on mount
  - [ ] `unregisterInput(id)` - input unregisters on unmount
  - [ ] `setActiveInput(id)` - switch focus
  - [ ] `toggleKeyboard()` - show/hide keyboard
  - [ ] `setKeyboardMode(mode)` - change keyboard layout
  - [ ] `insertAtCursor(latex)` - route to active input

### 3.3 MathProvider Component
- [ ] Create Provider wrapper component
  - [ ] File: `src/components/MathProvider/MathProvider.tsx`
  - [ ] Wraps children with context
  - [ ] Manages global state (useReducer or useState)
- [ ] Props interface:
  ```typescript
  interface MathProviderProps {
    children: React.ReactNode;
    theme?: 'light' | 'dark' | ThemeConfig;
    config?: {
      defaultKeyboardMode?: KeyboardMode;
      katexOptions?: KaTeXOptions;
    };
  }
  ```

### 3.4 Update MathInput to Use Context
- [ ] Add context integration
  - [ ] useContext(MathContext) in MathInput
  - [ ] Register/unregister on mount/unmount
  - [ ] Update focus handling to use context
- [ ] Active input tracking
  - [ ] Call setActiveInput on focus
  - [ ] Clear active input on blur
- [ ] Receive commands from keyboard
  - [ ] Listen for insertAtCursor calls
  - [ ] Update LaTeX when command received

### 3.5 Update MathKeyboard to Use Context
- [ ] Connect keyboard to context
  - [ ] useContext(MathContext) in MathKeyboard
  - [ ] Read activeInputId to know where to send input
- [ ] Route button clicks
  - [ ] On button click → call insertAtCursor(latex)
  - [ ] Context routes to active input
  - [ ] Input updates its LaTeX state

### 3.6 Multi-Input Testing
- [ ] Test with multiple inputs
  - [ ] Create demo with 3+ MathInput components
  - [ ] Verify clicking switches focus correctly
  - [ ] Verify keyboard routes to correct input
  - [ ] Test rapid switching

---

## PHASE 4: Advanced Editing Features

### 4.1 Improved Cursor Positioning
- [ ] Enhanced cursor tracking
  - [ ] Track cursor position in LaTeX string (character index)
  - [ ] Click positioning (map click to nearest position)
  - [ ] Arrow key navigation (left, right, home, end)
- [ ] Word boundary detection
  - [ ] Identify "safe" cursor positions
  - [ ] Between terms, operators
  - [ ] Before/after LaTeX commands

### 4.2 Text Selection
- [ ] Selection state
  - [ ] Track selection range [start, end]
  - [ ] Visual selection highlight
- [ ] Selection interactions
  - [ ] Mouse drag to select
  - [ ] Double-click to select term
  - [ ] Ctrl+A to select all
  - [ ] Shift+Arrow to extend selection
- [ ] Selection operations
  - [ ] Delete selection
  - [ ] Type to replace selection
  - [ ] Insert from keyboard replaces selection

### 4.3 Copy/Paste
- [ ] Copy functionality
  - [ ] Ctrl+C to copy LaTeX to clipboard
  - [ ] Copy rendered format (maybe MathML)
- [ ] Paste functionality
  - [ ] Ctrl+V to paste
  - [ ] Parse pasted content
  - [ ] Validate LaTeX before inserting
  - [ ] Sanitize input

### 4.4 Undo/Redo
- [ ] History management
  - [ ] Track LaTeX string history
  - [ ] Max history size (e.g., 50 states)
- [ ] Undo/Redo implementation
  - [ ] Ctrl+Z for undo
  - [ ] Ctrl+Y or Ctrl+Shift+Z for redo
  - [ ] Update cursor position on undo/redo

### 4.5 LaTeX Templates
- [ ] Define template system
  ```typescript
  interface Template {
    latex: string;         // Template with placeholder
    cursorPos: number;     // Where to place cursor
    placeholders: {start: number, end: number}[];
  }
  ```
- [ ] Common templates
  - [ ] Fraction: `\frac{|}{}`
  - [ ] Square root: `\sqrt{|}`
  - [ ] Power: `^{|}`
  - [ ] Subscript: `_{|}`
  - [ ] Absolute value: `|x|`
- [ ] Template insertion
  - [ ] Insert template at cursor
  - [ ] Position cursor at first placeholder
  - [ ] Tab to jump to next placeholder

### 4.6 Function Panel
- [ ] Create expandable functions panel
  - [ ] File: `src/components/MathKeyboard/FunctionPanel.tsx`
  - [ ] Slide in from right side
  - [ ] Scrollable list of categories
- [ ] Panel layout
  - [ ] Width: 240px
  - [ ] Category headers (sticky)
  - [ ] Function buttons (44px height each)
  - [ ] 8px gap between buttons

---

## PHASE 5: Function Categories Implementation

### 5.1 Define Function Category System
- [ ] Create category configuration
  ```typescript
  interface FunctionCategory {
    id: string;
    name: string;
    functions: FunctionConfig[];
  }

  interface FunctionConfig {
    display: string;       // Button label (e.g., "sin")
    latex: string;         // LaTeX to insert (e.g., "\sin(")
    description?: string;  // Tooltip
  }
  ```

### 5.2 Trig Functions (Priority 1)
- [ ] Category: "TRIG FUNCTIONS"
- [ ] Functions to implement:
  - [ ] sin → `\sin(`
  - [ ] cos → `\cos(`
  - [ ] tan → `\tan(`
  - [ ] csc → `\csc(`
  - [ ] sec → `\sec(`
  - [ ] cot → `\cot(`

### 5.3 Inverse Trig Functions (Priority 1)
- [ ] Category: "INVERSE TRIG"
- [ ] Functions:
  - [ ] sin⁻¹ → `\sin^{-1}(`
  - [ ] cos⁻¹ → `\cos^{-1}(`
  - [ ] tan⁻¹ → `\tan^{-1}(`
  - [ ] csc⁻¹ → `\csc^{-1}(`
  - [ ] sec⁻¹ → `\sec^{-1}(`
  - [ ] cot⁻¹ → `\cot^{-1}(`

### 5.4 Calculus (Priority 1)
- [ ] Category: "CALCULUS"
- [ ] Functions:
  - [ ] exp → `e^{}`
  - [ ] ln → `\ln(`
  - [ ] log → `\log(`
  - [ ] logₐ → `\log_{}`
  - [ ] d/dx → `\frac{d}{dx}`
  - [ ] f' → `f'`
  - [ ] ∫ → `\int`
  - [ ] Σ → `\sum`
  - [ ] Π → `\prod`

### 5.5 Number Theory (Priority 1)
- [ ] Category: "NUMBER THEORY"
- [ ] Functions:
  - [ ] lcm → `\text{lcm}(`
  - [ ] gcd → `\text{gcd}(`
  - [ ] mod → `\mod`
  - [ ] ceil → `\lceil \rceil`
  - [ ] floor → `\lfloor \rfloor`
  - [ ] round → `\text{round}(`
  - [ ] sign → `\text{sign}(`
  - [ ] ⁿ√ → `\sqrt[n]{}`
  - [ ] nPr → `P(n,r)`
  - [ ] nCr → `\binom{n}{r}`

### 5.6 Hyperbolic Trig Functions (Priority 1)
- [ ] Category: "HYPERBOLIC TRIG FUNCTIONS"
- [ ] Functions:
  - [ ] sinh → `\sinh(`
  - [ ] cosh → `\cosh(`
  - [ ] tanh → `\tanh(`
  - [ ] csch → `\text{csch}(`
  - [ ] sech → `\text{sech}(`
  - [ ] coth → `\coth(`

### 5.7 Statistics (Priority 1)
- [ ] Category: "STATISTICS"
- [ ] Functions:
  - [ ] mean → `\text{mean}(`
  - [ ] median → `\text{median}(`
  - [ ] min → `\min(`
  - [ ] max → `\max(`
  - [ ] quartile → `\text{quartile}(`
  - [ ] quantile → `\text{quantile}(`
  - [ ] stdev → `\text{stdev}(`
  - [ ] stdevp → `\text{stdevp}(`
  - [ ] var → `\text{var}(`
  - [ ] varp → `\text{varp}(`
  - [ ] cov → `\text{cov}(`
  - [ ] covp → `\text{covp}(`
  - [ ] mad → `\text{mad}(`
  - [ ] corr → `\text{corr}(`
  - [ ] spearman → `\text{spearman}(`
  - [ ] stats → `\text{stats}(`
  - [ ] count → `\text{count}(`
  - [ ] total → `\text{total}(`

### 5.8 Probability Distributions (Priority 1)
- [ ] Category: "PROBABILITY DISTRIBUTIONS"
- [ ] Functions:
  - [ ] normaldist → `\text{normaldist}(`
  - [ ] tdist → `\text{tdist}(`
  - [ ] chisqdist → `\text{chisqdist}(`
  - [ ] uniformdist → `\text{uniformdist}(`
  - [ ] binomialdist → `\text{binomialdist}(`
  - [ ] poissondist → `\text{poissondist}(`
  - [ ] geodist → `\text{geodist}(`
  - [ ] pdf → `\text{pdf}(`
  - [ ] cdf → `\text{cdf}(`
  - [ ] inversecdf → `\text{inversecdf}(`
  - [ ] random → `\text{random}(`

### 5.9 Inference (Priority 1)
- [ ] Category: "INFERENCE"
- [ ] Functions:
  - [ ] ztest → `\text{ztest}(`
  - [ ] ttest → `\text{ttest}(`
  - [ ] zproptest → `\text{zproptest}(`
  - [ ] chisqtest → `\text{chisqtest}(`
  - [ ] chisqgof → `\text{chisqgof}(`
  - [ ] null → `\text{null}(`
  - [ ] p → `p`
  - [ ] pleft → `\text{pleft}(`
  - [ ] pright → `\text{pright}(`
  - [ ] score → `\text{score}(`
  - [ ] dof → `\text{dof}(`
  - [ ] stderr → `\text{stderr}(`
  - [ ] conf → `\text{conf}(`
  - [ ] lower → `\text{lower}(`
  - [ ] upper → `\text{upper}(`
  - [ ] estimate → `\text{estimate}(`

### 5.10 List Operations (Priority 1)
- [ ] Category: "LIST OPERATIONS"
- [ ] Functions:
  - [ ] repeat → `\text{repeat}(`
  - [ ] join → `\text{join}(`
  - [ ] sort → `\text{sort}(`
  - [ ] shuffle → `\text{shuffle}(`
  - [ ] unique → `\text{unique}(`
  - [ ] for → `\text{for}(`

### 5.11 Visualizations (Priority 1)
- [ ] Category: "VISUALIZATIONS"
- [ ] Functions:
  - [ ] histogram → `\text{histogram}(`
  - [ ] dotplot → `\text{dotplot}(`
  - [ ] boxplot → `\text{boxplot}(`

### 5.12 Geometry (Priority 1)
- [ ] Category: "GEOMETRY"
- [ ] Functions:
  - [ ] polygon → `\text{polygon}(`
  - [ ] distance → `\text{distance}(`
  - [ ] midpoint → `\text{midpoint}(`

### 5.13 Custom Colors (Priority 1)
- [ ] Category: "CUSTOM COLORS"
- [ ] Functions:
  - [ ] rgb → `\text{rgb}(`
  - [ ] hsv → `\text{hsv}(`
  - [ ] okhsv → `\text{okhsv}(`
  - [ ] oklab → `\text{oklab}(`
  - [ ] oklch → `\text{oklch}(`

### 5.14 Sound (Priority 1)
- [ ] Category: "SOUND"
- [ ] Functions:
  - [ ] tone → `\text{tone}(`

---

## PHASE 6: Keyboard Modes

### 6.1 Mode Configuration System
- [ ] Create mode configuration structure
  ```typescript
  interface KeyboardMode {
    id: string;
    name: string;
    buttons: ButtonConfig[][];
    functionCategories: string[];
  }
  ```

### 6.2 Basic Algebra Mode
- [ ] Define BASIC_MODE configuration
  - [ ] Button grid (numbers, operators, basic symbols)
  - [ ] All 13 function categories available in functions panel
- [ ] Implement mode switching
  - [ ] Mode selector in keyboard
  - [ ] Update button layout on mode change

### 6.3 Calculus Mode
- [ ] Define CALCULUS_MODE configuration
  - [ ] All basic buttons
  - [ ] Additional calculus-specific buttons on main keyboard
  - [ ] All 13 function categories available in functions panel
- [ ] Add mode to selector

### 6.4 Chemistry Mode (Optional for v1.0)
- [ ] Define CHEMISTRY_MODE configuration
  - [ ] Numbers and basic operators
  - [ ] Subscripts for chemical formulas
  - [ ] Common elements (H, O, C, N, etc.)
  - [ ] Arrow symbols
- [ ] Simplified function panel for chemistry

### 6.5 ABC Mode (Letter Input)
- [ ] Create ABC keyboard layout
  - [ ] QWERTY layout (q-p, a-l, z-m)
  - [ ] Shift button (uppercase toggle)
  - [ ] "123" button (return to number mode)
  - [ ] Greek letters (θ on keyboard)
  - [ ] Subscript toggle (aᵦ button)
- [ ] Mode switching
  - [ ] ABC button on main keyboard
  - [ ] 123 button on ABC keyboard
  - [ ] Toggle between modes

### 6.6 Custom Mode Support
- [ ] API for custom modes
  - [ ] Allow users to define custom button layouts
  - [ ] Validate configuration
  - [ ] Merge with built-in modes

---

## PHASE 7: Theming & Customization

### 7.1 CSS Variables System
- [ ] Define complete CSS variable set
  ```css
  /* Colors */
  --math-primary-color: #2F7DEF;
  --math-background-color: #FFFFFF;
  --math-text-color: #000000;
  --math-border-color: #D0D0D0;
  --math-button-hover-color: #F0F0F0;

  /* Sizing */
  --math-font-size: 18px;
  --math-button-width: 60px;
  --math-button-height: 50px;
  --math-keyboard-height: auto;

  /* Spacing */
  --math-button-gap: 6px;
  --math-section-gap: 20px;
  ```

### 7.2 Light Theme (Default)
- [ ] Implement light theme colors
  - [ ] File: `src/styles/themes/light.css`
  - [ ] All colors from MASTERPLAN-V2.md Section 3.1
- [ ] Apply as default theme

### 7.3 Dark Theme
- [ ] Define dark theme colors
  - [ ] File: `src/styles/themes/dark.css`
  - [ ] Invert colors appropriately
  - [ ] Maintain contrast ratios (WCAG AA)
- [ ] Theme switcher
  - [ ] Prop on MathProvider: `theme="dark"`
  - [ ] Apply dark theme CSS variables

### 7.4 Custom Theme Support
- [ ] ThemeConfig interface
  ```typescript
  interface ThemeConfig {
    colors?: {
      primary?: string;
      background?: string;
      text?: string;
      border?: string;
      buttonHover?: string;
    };
    sizing?: {
      fontSize?: string;
      buttonWidth?: string;
      buttonHeight?: string;
    };
  }
  ```
- [ ] Apply custom theme
  - [ ] Accept ThemeConfig object in MathProvider
  - [ ] Override CSS variables dynamically

### 7.5 Component Styling Customization
- [ ] className prop support
  - [ ] Allow custom classes on all components
  - [ ] Document class structure for overrides
- [ ] style prop support
  - [ ] Inline styles for quick customization
  - [ ] Document which styles are safe to override

---

## PHASE 8: Error Handling & Edge Cases

### 8.1 LaTeX Validation
- [ ] Validate LaTeX input
  - [ ] Check for balanced braces {}, [], ()
  - [ ] Detect incomplete commands
  - [ ] Validate LaTeX syntax
- [ ] Error states
  - [ ] Warning icon (⚠️) for errors
  - [ ] Orange/yellow background
  - [ ] Show raw LaTeX when can't render

### 8.2 Graceful Degradation
- [ ] Handle incomplete LaTeX
  - [ ] `\frac{x` → show x/[gray box]
  - [ ] Gray placeholder for missing parts
  - [ ] Allow user to continue editing
- [ ] Unknown commands
  - [ ] `\unknown{x}` → show raw text with warning
  - [ ] Don't crash, just don't render

### 8.3 Performance Optimization
- [ ] Debounce rendering
  - [ ] Wait 50ms after typing stops before re-rendering
  - [ ] Prevent lag on long equations
- [ ] React.memo optimization
  - [ ] Memoize components that don't need re-render
  - [ ] useMemo for expensive computations
- [ ] Virtualization (if needed)
  - [ ] For 50+ inputs on page
  - [ ] Render only visible inputs

### 8.4 Input Sanitization
- [ ] Limit input length
  - [ ] Max 10,000 characters
  - [ ] Prevent performance issues
- [ ] Sanitize pasted content
  - [ ] Strip HTML tags
  - [ ] Validate LaTeX
  - [ ] Warn on potentially malicious input

### 8.5 Browser Compatibility
- [ ] Test on target browsers
  - [ ] Chrome 90+
  - [ ] Firefox 88+
  - [ ] Safari 14+
  - [ ] Edge 90+
- [ ] Polyfills if needed
  - [ ] Check contentEditable compatibility
  - [ ] Cursor API compatibility
  - [ ] CSS Grid/Flexbox support

---

## PHASE 9: Testing

### 9.1 Unit Tests Setup
- [ ] Install testing libraries
  - [ ] `npm install -D vitest @testing-library/react @testing-library/user-event`
  - [ ] Configure vitest.config.ts
- [ ] Test utilities
  - [ ] Create test helpers
  - [ ] Mock KaTeX if needed
  - [ ] Setup/teardown functions

### 9.2 MathInput Tests
- [ ] Component rendering
  - [ ] Renders without crashing
  - [ ] Displays initial value
  - [ ] Applies className and style
- [ ] User interactions
  - [ ] Types text → LaTeX updates
  - [ ] Click to focus → cursor appears
  - [ ] Blur → cursor disappears
  - [ ] onChange callback fires
- [ ] Edge cases
  - [ ] Empty input
  - [ ] Invalid LaTeX → error state
  - [ ] Very long equation
  - [ ] Special characters

### 9.3 MathKeyboard Tests
- [ ] Component rendering
  - [ ] Renders with correct buttons
  - [ ] Toggle visibility works
  - [ ] Mode switching works
- [ ] Button interactions
  - [ ] Click button → correct LaTeX inserted
  - [ ] Hover states work
  - [ ] Functions panel opens/closes
- [ ] Multi-input routing
  - [ ] Keyboard sends to active input only
  - [ ] Switching inputs updates routing

### 9.4 Context/Provider Tests
- [ ] Context state management
  - [ ] registerInput adds input to map
  - [ ] unregisterInput removes input
  - [ ] setActiveInput updates state
- [ ] Multi-component communication
  - [ ] Multiple inputs share one keyboard
  - [ ] Active input receives keyboard input
  - [ ] Inactive inputs don't receive input

### 9.5 Integration Tests
- [ ] Full workflow tests
  - [ ] User types in input → equation renders
  - [ ] User clicks keyboard button → symbol inserted
  - [ ] User switches inputs → keyboard follows
  - [ ] User copies/pastes → works correctly
- [ ] Error scenarios
  - [ ] Invalid LaTeX → shows error state
  - [ ] Network failure (shouldn't happen - all local)
  - [ ] Rapid clicking → no crashes

### 9.6 Accessibility Tests
- [ ] Keyboard navigation
  - [ ] Tab to focus input
  - [ ] Arrow keys to navigate
  - [ ] Enter to submit
  - [ ] Escape to close keyboard
- [ ] ARIA labels
  - [ ] Screen reader announces input purpose
  - [ ] Buttons have proper labels
  - [ ] Errors announced
- [ ] Color contrast
  - [ ] All text meets WCAG AA
  - [ ] Focus indicators visible

---

## PHASE 10: Documentation

### 10.1 Code Documentation
- [ ] JSDoc comments
  - [ ] Document all public APIs
  - [ ] Explain complex algorithms
  - [ ] Parameter descriptions
  - [ ] Return value descriptions
- [ ] TypeScript types
  - [ ] Export all public interfaces
  - [ ] Generic types where appropriate
  - [ ] Detailed type comments

### 10.2 Storybook Setup
- [ ] Install Storybook
  - [ ] `npx storybook@latest init`
  - [ ] Configure for React + Vite
- [ ] Write stories
  - [ ] MathInput stories (all states)
  - [ ] MathKeyboard stories (all modes)
  - [ ] MathProvider stories (theming)
  - [ ] Combined examples

### 10.3 README.md
- [ ] Project overview
  - [ ] What is it?
  - [ ] Key features
  - [ ] Live demo link
- [ ] Installation
  - [ ] npm install command
  - [ ] Peer dependencies
- [ ] Quick start
  - [ ] Basic usage example
  - [ ] Code snippet
- [ ] Documentation links
  - [ ] API reference
  - [ ] Storybook link
  - [ ] Examples

### 10.4 API Documentation
- [ ] Component API reference
  - [ ] MathInput props
  - [ ] MathKeyboard props
  - [ ] MathProvider props
- [ ] Hook documentation (if any)
- [ ] Utility functions (if exported)
- [ ] Type definitions

### 10.5 Usage Examples
- [ ] Basic example
  - [ ] Single input with keyboard
- [ ] Multiple inputs
  - [ ] 3+ inputs sharing keyboard
- [ ] Custom theme
  - [ ] Light/dark theme switching
- [ ] Custom mode
  - [ ] Custom button layout
- [ ] JEE platform integration
  - [ ] Question paper editor example

### 10.6 Migration Guides (for future versions)
- [ ] v1.0 → v1.1 guide
- [ ] Breaking changes documentation
- [ ] Deprecation notices

---

## PHASE 11: Package & Release

### 11.1 Build Configuration
- [ ] Optimize production build
  - [ ] Configure Vite for library mode
  - [ ] Set external dependencies (react, react-dom)
  - [ ] Enable minification
- [ ] Output formats
  - [ ] ESM: `dist/index.es.js`
  - [ ] CJS: `dist/index.cjs.js`
  - [ ] UMD: `dist/index.umd.js`
  - [ ] Type definitions: `dist/index.d.ts`

### 11.2 Package.json Configuration
- [ ] Metadata
  - [ ] Name: `mathex`
  - [ ] Version: `1.0.0`
  - [ ] Description: "A Desmos-like math equation editor component library for React"
  - [ ] Keywords: math, equation, editor, react, latex, katex, desmos, wysiwyg, educational
  - [ ] License: MIT
  - [ ] Author info
  - [ ] Repository URL
- [ ] Entry points
  - [ ] main: CJS bundle
  - [ ] module: ESM bundle
  - [ ] types: TypeScript definitions
  - [ ] exports: Modern exports map
- [ ] Peer dependencies
  - [ ] react: ^18.0.0
  - [ ] react-dom: ^18.0.0
- [ ] Scripts
  - [ ] build, test, lint, format, storybook

### 11.3 Bundle Size Optimization
- [ ] Analyze bundle
  - [ ] Use rollup-plugin-visualizer
  - [ ] Identify large dependencies
- [ ] Optimize
  - [ ] Tree-shake unused KaTeX features
  - [ ] Code splitting if needed
  - [ ] Ensure < 500KB gzipped
- [ ] Document bundle size
  - [ ] Add badge to README
  - [ ] Track over time

### 11.4 npm Package Preparation
- [ ] Create .npmignore
  - [ ] Exclude: src/, tests/, storybook/, examples/
  - [ ] Include: dist/, README.md, LICENSE
- [ ] Generate package
  - [ ] `npm pack` to test
  - [ ] Verify contents
- [ ] Test installation locally
  - [ ] `npm link` in package
  - [ ] `npm link mathex-editor` in test app
  - [ ] Verify it works

### 11.5 Version 1.0.0 Release
- [ ] Pre-release checklist
  - [ ] All tests passing
  - [ ] Documentation complete
  - [ ] Examples working
  - [ ] No critical bugs
- [ ] Create git tag
  - [ ] `git tag v1.0.0`
  - [ ] `git push --tags`
- [ ] Publish to npm
  - [ ] `npm login`
  - [ ] `npm publish` (or `npm publish --access public`)
- [ ] Create GitHub release
  - [ ] Release notes
  - [ ] Changelog
  - [ ] Download links

### 11.6 Demo & Marketing
- [ ] CodeSandbox demos
  - [ ] Basic example
  - [ ] Multiple inputs
  - [ ] Custom theme
  - [ ] Full featured (all modes)
- [ ] GitHub Pages demo
  - [ ] Deploy Storybook to gh-pages
  - [ ] Interactive playground
- [ ] Announcement
  - [ ] Post on Twitter/X
  - [ ] Post on Reddit (r/reactjs, r/webdev)
  - [ ] Dev.to article
  - [ ] Hacker News (maybe)

---

## PHASE 12: Post-Launch (v1.1+)

### 12.1 Community & Support
- [ ] Issue templates
  - [ ] Bug report template
  - [ ] Feature request template
  - [ ] Question template
- [ ] Contributing guidelines
  - [ ] CONTRIBUTING.md
  - [ ] Code of conduct
  - [ ] Pull request template
- [ ] Response protocol
  - [ ] Respond to issues within 48 hours
  - [ ] Triage and label issues
  - [ ] Create milestones for bug fixes

### 12.2 v1.1 Enhancements
- [ ] Full cursor positioning (character-level)
- [ ] Improved selection handling
- [ ] Additional keyboard shortcuts
- [ ] Performance improvements
- [ ] Advanced templates

### 12.3 v1.2 Features
- [ ] Templates gallery
  - [ ] Pre-built equation templates
  - [ ] Quadratic formula, trig identities, etc.
- [ ] Autocomplete
  - [ ] Suggest LaTeX commands as user types
  - [ ] Common equations
- [ ] History
  - [ ] Recent equations
  - [ ] Quick reuse

### 12.4 v1.3 Mobile Support
- [ ] Responsive keyboard layout
- [ ] Touch-optimized buttons (44x44px min)
- [ ] Virtual keyboard positioning
- [ ] Mobile testing (iOS, Android)
- [ ] Gesture support

### 12.5 v2.0 Vision
- [ ] Multi-framework support (Vue, Angular adapters)
- [ ] Graphing component (Desmos-like)
- [ ] Computation engine (solve, evaluate)
- [ ] AI assistance (autocomplete, suggestions)
- [ ] Plugin system

---

## APPENDIX: Development Best Practices

### A1. Code Quality Standards
- [ ] TypeScript strict mode enabled
- [ ] ESLint with no warnings
- [ ] Prettier formatting enforced
- [ ] Test coverage >80%
- [ ] No console.log in production code
- [ ] Meaningful variable/function names

### A2. Git Workflow
- [ ] Use feature branches
- [ ] Meaningful commit messages
- [ ] Squash before merge
- [ ] Keep commits atomic
- [ ] Tag releases

### A3. Performance Targets
- [ ] <50ms render time for typical equations
- [ ] <100ms keyboard response time
- [ ] <500KB bundle size (gzipped)
- [ ] 60fps animations
- [ ] Works smoothly with 50+ inputs on page

### A4. Browser Testing Schedule
- [ ] Test on Chrome (every feature)
- [ ] Test on Firefox (every major milestone)
- [ ] Test on Safari (before release)
- [ ] Test on Edge (before release)

---

## PRIORITY MATRIX

### Must Have (v1.0)
1. ✅ MathInput with KaTeX rendering
2. ✅ Basic MathKeyboard (numbers, operators, basic symbols)
3. ✅ Multi-input support via MathProvider
4. ✅ ALL 13 function categories:
   - Trig Functions
   - Inverse Trig Functions
   - Calculus
   - Hyperbolic Trig Functions
   - Number Theory
   - Statistics
   - Probability Distributions
   - Inference
   - List Operations
   - Visualizations
   - Geometry
   - Custom Colors
   - Sound
5. ✅ ABC mode (letter input keyboard)
6. ✅ Light theme
7. ✅ Basic documentation (README, API docs)
8. ✅ npm package published

### Should Have (v1.0)
- ⚠️ Dark theme
- ⚠️ Comprehensive tests (80%+ coverage)
- ⚠️ Storybook (Phase 10/Documentation)
- ⚠️ Multiple keyboard modes (Basic, Calculus)

### Nice to Have (v1.1)
- 💡 Full cursor positioning (character-level)
- 💡 Advanced selection handling
- 💡 Chemistry mode
- 💡 Advanced templates
- 💡 Equation history

### Future (v2.0+)
- 🔮 Mobile support
- 🔮 Graphing capabilities
- 🔮 AI assistance
- 🔮 Plugin system
- 🔮 Multi-framework support

---

## ESTIMATED TIMELINE

**Phase 0-1**: 3 weeks (Setup + Basic MathInput)
**Phase 2-3**: 3 weeks (Basic Keyboard + Context)
**Phase 4**: 2 weeks (Advanced editing)
**Phase 5**: 4 weeks (All 13 Function Categories - intensive!)
**Phase 6**: 2 weeks (Keyboard Modes)
**Phase 7-8**: 2 weeks (Theming + Error handling)
**Phase 9**: 2 weeks (Testing)
**Phase 10-11**: 2 weeks (Documentation with Storybook + Release)

**Total**: ~20 weeks (5 months) for v1.0

**Note**: Phase 5 expanded from 3 to 4 weeks due to implementing all 13 Desmos function categories

---

## RESOURCES & REFERENCES

### Technical Documentation
- [ ] KaTeX Documentation: https://katex.org/docs/api.html
- [ ] React TypeScript Cheatsheet: https://react-typescript-cheatsheet.netlify.app/
- [ ] Vite Library Mode: https://vitejs.dev/guide/build.html#library-mode

### Inspiration & Research
- [ ] Desmos Calculator: https://www.desmos.com/calculator
- [ ] MathQuill Source Code: https://github.com/mathquill/mathquill
- [ ] Khan Academy Math Input
- [ ] LaTeX Reference: https://katex.org/docs/supported.html

### Tools
- [ ] TypeScript Playground
- [ ] Regex101 (for LaTeX parsing)
- [ ] BundlePhobia (check package sizes)
- [ ] npm trends (compare alternatives)

---

**Last Updated**: 2026-01-01
**Version**: 1.0
**Status**: Ready to begin development
