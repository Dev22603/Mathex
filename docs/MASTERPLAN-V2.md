# Math Equation Editor - Enhanced Specifications v2.0
## Supplement to Master Plan v1.0

This document provides enhanced specifications based on detailed Desmos screenshots and additional requirements discussion. Use this alongside the main masterplan.md.

---

## 1. Exact Keyboard Layout Specifications

### 1.1 Main Keyboard (Default Mode) - Pixel-Perfect Layout

Based on Desmos screenshots, here's the exact button layout with groupings:

```
┌─────────────────────────────────────────────────────────────────────┐
│  VARIABLES        NUMBERS & OPERATORS       FUNCTIONS & NAVIGATION  │
├─────────────────────────────────────────────────────────────────────┤
│  [x] [y] [a²][aᵇ]   [7][8][9][÷]   [     functions    ]            │
│  [(] [)] [<] [>]     [4][5][6][×]   [  ←  ][  →  ]                 │
│  [|a|][,][≤][≥]      [1][2][3][−]   [  backspace   ]                │
│  [ABC][🔊][√][π]     [0][.][=][+]   [    ENTER      ]               │
└─────────────────────────────────────────────────────────────────────┘

Button Dimensions:
- Standard button: 60px × 50px
- Number buttons (0-9): 60px × 50px (gray background #E8E8E8)
- Enter button: 150px × 50px (blue background #2F7DEF)
- Functions button: 150px × 50px (gray background)
- Backspace: 150px × 50px
- Gap between sections: 20px
- Gap between buttons: 6px
```

### 1.2 ABC Mode Layout

When ABC button is clicked:

```
┌──────────────────────────────────────────────────────────┐
│  [q][w][e][r][t][y][u][i][o][p]                          │
│  [a][s][d][f][g][h][j][k][l][θ]  ← theta                 │
│  [⬆][z][x][c][v][b][n][m][backspace]                     │
│  [123][aᵦ][!%][[ ]][{ }][~.][,][   ENTER   ]            │
└──────────────────────────────────────────────────────────┘

Notes:
- "123" returns to number mode
- ⬆ (shift) toggles UPPERCASE/lowercase
- aᵦ enables subscript for next character
- θ (theta) is included as commonly used Greek letter
```

### 1.3 Button LaTeX Mappings

| Button | Display | LaTeX | Notes |
|--------|---------|-------|-------|
| x | x | x | Variable |
| y | y | y | Variable |
| a² | a² | ^{2} | Square template |
| aᵇ | aᵇ | ^{} | Power template, cursor inside {} |
| ( | ( | ( | Open paren |
| ) | ) | ) | Close paren |
| < | < | < | Less than |
| > | > | > | Greater than |
| \|a\| | \|a\| | \|\| | Absolute value template |
| , | , | , | Comma |
| ≤ | ≤ | \leq | Less than or equal |
| ≥ | ≥ | \geq | Greater than or equal |
| ABC | ABC | - | Mode switch |
| 🔊 | 🔊 | - | Speak equation |
| √ | √ | \sqrt{} | Square root template |
| π | π | \pi | Pi symbol |
| 0-9 | 0-9 | 0-9 | Numbers |
| . | . | . | Decimal point |
| = | = | = | Equals |
| + | + | + | Plus |
| − | − | - | Minus |
| × | × | \times | Multiply |
| ÷ | ÷ | \div | Divide |

---

## 2. Complete Function Categories (All 13 from Desmos)

### Category 1: TRIG FUNCTIONS
```
┌────────────────────────┐
│  sin   cos   tan       │
│  csc   sec   cot       │
└────────────────────────┘

LaTeX: \sin(, \cos(, \tan(, \csc(, \sec(, \cot(
Auto-close: Yes (adds closing paren)
```

### Category 2: INVERSE TRIG FUNCTIONS
```
┌────────────────────────┐
│  sin⁻¹  cos⁻¹  tan⁻¹  │
│  csc⁻¹  sec⁻¹  cot⁻¹  │
└────────────────────────┘

LaTeX: \sin^{-1}(, \cos^{-1}(, \tan^{-1}(
Alternative: \arcsin(, \arccos(, \arctan(
```

### Category 3: STATISTICS
```
┌────────────────────────────────┐
│  mean    median    min         │
│  max     quartile  quantile    │
│  stdev   stdevp    var         │
│  varp    cov       covp        │
│  mad     corr      spearman    │
│  stats   count     total       │
└────────────────────────────────┘

Note: These are Desmos-specific statistical functions
For JEE library: Include basic stats (mean, median, stdev)
Can skip: quantile, spearman, covp (less relevant)
```

### Category 4: LIST OPERATIONS
```
┌────────────────────────┐
│  repeat  join   sort   │
│  shuffle unique for    │
└────────────────────────┘

Note: Desmos list manipulation
For JEE: May not be relevant, can skip
```

### Category 5: VISUALIZATIONS
```
┌────────────────────────────┐
│  histogram  dotplot  boxplot │
└────────────────────────────┘

Note: Graphing functions
For JEE: Skip (no graphing in v1)
```

### Category 6: PROBABILITY DISTRIBUTIONS
```
┌──────────────────────────────────┐
│  normaldist  tdist  chisqdist    │
│  uniformdist binomialdist        │
│  poissondist geodist             │
│  pdf         cdf     inversecdf  │
│  random                          │
└──────────────────────────────────┘

For JEE: Include basic (binomial, normal)
Can skip: geodist, inversecdf
```

### Category 7: INFERENCE
```
┌────────────────────────────────┐
│  ztest    ttest   zproptest    │
│  chisqtest chisqgof null       │
│  p        pleft    pright      │
│  score    dof      stderr      │
│  conf     lower    upper       │
│  estimate                      │
└────────────────────────────────┘

For JEE: Likely not needed
Skip in v1, add if requested
```

### Category 8: CALCULUS ⭐ (Priority)
```
┌────────────────────────┐
│  exp   ln    log       │
│  logₐ  d/dx  f'        │
│  ∫     Σ     Π         │
└────────────────────────┘

LaTeX:
exp → e^{}
ln → \ln(
log → \log(
logₐ → \log_{}(
d/dx → \frac{d}{dx}
f' → f'
∫ → \int
Σ → \sum
Π → \prod

Priority: HIGH (essential for JEE)
```

### Category 9: HYPERBOLIC TRIG FUNCTIONS
```
┌────────────────────────┐
│  sinh  cosh  tanh      │
│  csch  sech  coth      │
└────────────────────────┘

LaTeX: \sinh(, \cosh(, \tanh(
Priority: MEDIUM (sometimes used in JEE)
```

### Category 10: GEOMETRY
```
┌─────────────────────────────┐
│  polygon distance midpoint  │
└─────────────────────────────┘

Note: Desmos graphing functions
For JEE: Skip (coordinate geometry uses different approach)
```

### Category 11: CUSTOM COLORS
```
┌────────────────────────┐
│  rgb  hsv  okhsv       │
│  oklab oklch           │
└────────────────────────┘

Note: Color functions for graphing
For JEE: Skip entirely
```

### Category 12: SOUND
```
┌──────┐
│ tone │
└──────┘

Note: Audio generation
For JEE: Skip entirely
```

### Category 13: NUMBER THEORY ⭐ (Priority)
```
┌────────────────────────┐
│  lcm  gcd   mod        │
│  ceil floor round      │
│  sign  ⁿ√   nPr        │
│        nCr             │
└────────────────────────┘

LaTeX:
lcm → \text{lcm}(
gcd → \text{gcd}(
mod → \mod
ceil → \lceil \rceil
floor → \lfloor \rfloor
round → \text{round}(
sign → \text{sign}(
ⁿ√ → \sqrt[n]{}
nPr → P(n,r) or nPr
nCr → \binom{n}{r} or nCr

Priority: HIGH (JEE uses these)
```

### Recommended Function Categories for JEE v1.0

**Include**:
1. ✅ Trig Functions
2. ✅ Inverse Trig
3. ✅ Calculus (full)
4. ✅ Hyperbolic Trig
5. ✅ Number Theory
6. ⚠️ Statistics (basic: mean, median, stdev only)

**Skip for v1.0**:
- ❌ List Operations
- ❌ Visualizations
- ❌ Probability (add in v1.2 if requested)
- ❌ Inference
- ❌ Geometry (Desmos-specific)
- ❌ Custom Colors
- ❌ Sound

---

## 3. Visual Design Specifications

### 3.1 Color Palette (Exact from Screenshots)

**Light Theme**:
```css
/* Primary */
--primary-blue: #2F7DEF;
--primary-blue-hover: #1D6FDE;

/* Backgrounds */
--bg-white: #FFFFFF;
--bg-light-gray: #F5F5F5;  /* Keyboard background */
--bg-gray: #E8E8E8;        /* Number buttons */
--bg-hover: #F0F0F0;

/* Borders */
--border-gray: #D0D0D0;
--border-light: #E0E0E0;
--border-blue: #2F7DEF;    /* Focus indicator */

/* Text */
--text-black: #000000;
--text-gray: #666666;
--text-light: #999999;

/* Selection */
--selection-blue: #C9E1FF;  /* Text selection background */

/* Error */
--error-bg: #FFF3E0;
--warning-orange: #FF9800;
```

### 3.2 Typography

```css
/* Rendered Math */
--math-font: 'KaTeX_Main', 'Times New Roman', serif;
--math-size: 18px;
--math-line-height: 1.6;

/* UI Text */
--ui-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--ui-size: 14px;

/* Buttons */
--button-font-size: 16px;
--button-font-weight: 500;

/* Function Categories */
--category-font-size: 11px;
--category-font-weight: 700;
--category-transform: uppercase;
--category-letter-spacing: 0.5px;
--category-color: #666666;
```

### 3.3 Spacing & Sizing

```css
/* MathInput */
--input-padding: 12px 16px;
--input-min-height: 48px;
--input-border-width: 2px;
--input-focus-border-width: 3px;  /* Blue left border */
--input-border-radius: 4px;

/* MathKeyboard */
--keyboard-padding: 16px;
--keyboard-border-radius: 8px 8px 0 0;  /* Rounded top only */
--keyboard-bottom-position: 0;

/* Buttons */
--button-width: 60px;
--button-height: 50px;
--button-gap: 6px;
--button-border-radius: 6px;
--button-border: 1px solid #CCCCCC;

/* Functions Panel */
--panel-width: 240px;
--panel-padding: 16px;
--panel-button-height: 44px;
--panel-button-gap: 8px;
--category-margin-top: 24px;
--category-margin-bottom: 12px;
```

### 3.4 Visual States

**MathInput - Unfocused**:
```css
.math-input {
  border: 2px solid #D0D0D0;
  border-left: 3px solid transparent;
  background: #FFFFFF;
}
```

**MathInput - Focused**:
```css
.math-input.focused {
  border-left-color: #2F7DEF;  /* Blue indicator */
}

.cursor {
  width: 2px;
  height: 24px;
  background: #000000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```

**MathInput - Error**:
```css
.math-input.error {
  background: #FFF3E0;
}

.error-icon {
  color: #FF9800;
  font-size: 16px;
}
```

**Selection Highlighting**:
```css
.math-input ::selection {
  background: #C9E1FF;
  color: inherit;
}
```

---

## 4. Detailed Interaction Patterns

### 4.1 Error State Handling

**Scenario 1: Incomplete LaTeX**
```
User types: \frac{x

Display:
┌───────────────────────┐
│ ⚠️  x/[gray box]      │
└───────────────────────┘

Behavior:
- Warning triangle (⚠️) appears left side
- Renders numerator: x
- Gray placeholder box for missing denominator
- User can continue typing to complete
- No error modal or blocking
```

**Scenario 2: Invalid Command**
```
User types: \unknown{x}

Display:
┌───────────────────────┐
│ ⚠️  \unknown{x}       │
└───────────────────────┘

Behavior:
- Warning triangle appears
- Shows raw LaTeX (not rendered)
- Text remains editable
- User can fix or delete
```

**Scenario 3: Cursor in Incomplete Equation**
```
LaTeX: x^2 + \frac{a|
Cursor position: after 'a' (shown as |)

Display: x² + a/[gray box]
Cursor: Blinking after 'a' in numerator

User can:
- Continue typing in numerator
- Press → to move to denominator
- Press } to close numerator and move to denominator
```

### 4.2 Multi-Input Focus Behavior

**Visual Indicators**:
```
Input 1 (focused):
┌─────────────────────────┐
│ █  x² + 3x + 1         │  ← Blue left border (3px)
│    (cursor blinking)    │
└─────────────────────────┘

Input 2 (unfocused):
┌─────────────────────────┐
│    y = 2x              │  ← Gray left border (3px transparent)
└─────────────────────────┘

Input 3 (unfocused):
┌─────────────────────────┐
│    z = x + y           │
└─────────────────────────┘
```

**Switching Focus**:
```
1. User clicks Input 2
2. Input 1: Blue border → Gray (unfocused)
3. Input 2: Gray → Blue (focused)
4. Cursor appears in Input 2
5. Keyboard now routes to Input 2
6. Input 3 remains unchanged
```

### 4.3 Keyboard Button Press Feedback

**Timing Sequence**:
```
Frame 1 (0ms): Normal state
  Background: #FFFFFF
  Border: 1px solid #CCCCCC

Frame 2 (hover, 0-150ms): Mouse over
  Background: #F0F0F0
  Transform: translateY(-1px)
  Box-shadow: 0 2px 4px rgba(0,0,0,0.1)

Frame 3 (active, mousedown): Pressed
  Background: #E8E8E8
  Transform: translateY(0)
  Box-shadow: inset 0 2px 4px rgba(0,0,0,0.1)

Frame 4 (release): Ripple animation (300ms)
  Circular ripple from click point
  Opacity: 0.2 → 0

Frame 5 (150ms after release): Return to normal or hover
```

### 4.4 Functions Panel Interaction

**Opening Sequence**:
```
1. User clicks "functions" button (0ms)
2. Panel slides in from right (0-300ms)
   - Transform: translateX(100%) → translateX(0)
   - Easing: cubic-bezier(0.4, 0, 0.2, 1)
3. First category visible (if none expanded)
4. Scrollbar appears if content > viewport height
```

**Scrolling Behavior**:
```
- Smooth scroll with momentum
- Category headers sticky while scrolling through category
- Scroll to category when header clicked
- Scrollbar: 8px wide, auto-hide on desktop
```

**Function Selection**:
```
1. User clicks "sin" button
2. Button highlights briefly (100ms)
   - Background: #F0F0F0
3. LaTeX inserted at cursor: \sin(
4. Cursor positioned after opening paren: \sin(|)
5. Panel remains open (user might insert more)
6. User can click outside to close panel
```

---

## 5. Implementation Details

### 5.1 Cursor Positioning Algorithm (Simplified for v1.0)

**Phase 1 Approach** (easiest):
```typescript
// Cursor only at end of string
function getCursorPosition(): number {
  return latex.length;
}

// Clicking anywhere in equation moves cursor to end
function handleClick(e: MouseEvent) {
  setCursorPosition(latex.length);
}
```

**Phase 2 Approach** (word boundaries):
```typescript
// Cursor at "safe" positions:
// - Start/end of string
// - Before/after complete LaTeX commands
// - Between terms (after operators, spaces)

const safePositions = findSafePositions(latex);
// [0, 3, 6, 9, 12] for "x^2 + 3x + 1"

function handleClick(e: MouseEvent) {
  const clickX = e.clientX;
  const nearestPosition = findNearestSafePosition(clickX, safePositions);
  setCursorPosition(nearestPosition);
}
```

**Phase 3 Approach** (character-level, post-v1.0):
```typescript
// Full character-by-character positioning
// Requires mapping visual positions to LaTeX indices
// Complex but provides best UX
```

### 5.2 LaTeX Template Handling

**Templates with Placeholders**:
```typescript
const TEMPLATES = {
  fraction: {
    latex: '\\frac{|}{}',
    cursorPos: 6,  // After \frac{
    placeholders: [
      { start: 6, end: 6 },   // Numerator
      { start: 8, end: 8 }    // Denominator
    ]
  },
  
  squareRoot: {
    latex: '\\sqrt{|}',
    cursorPos: 6,
    placeholders: [{ start: 6, end: 6 }]
  },
  
  power: {
    latex: '^{|}',
    cursorPos: 2,
    placeholders: [{ start: 2, end: 2 }]
  }
};

function insertTemplate(template: Template) {
  const { latex: templateLatex, cursorPos } = template;
  
  // Insert at current cursor
  const before = latex.substring(0, cursorPosition);
  const after = latex.substring(cursorPosition);
  const newLatex = before + templateLatex + after;
  
  // Position cursor at first placeholder
  const newCursorPos = cursorPosition + cursorPos;
  
  setLatex(newLatex);
  setCursorPosition(newCursorPos);
}
```

### 5.3 Keyboard Mode Configuration

```typescript
interface KeyboardMode {
  id: string;
  name: string;
  buttons: ButtonConfig[][];
  functionCategories: string[];  // IDs of categories to include
}

const BASIC_MODE: KeyboardMode = {
  id: 'basic',
  name: 'Basic Algebra',
  buttons: BASIC_BUTTON_GRID,
  functionCategories: [
    'trig',
    'inverse-trig',
    'calculus',
    'number-theory'
  ]
};

const CALCULUS_MODE: KeyboardMode = {
  id: 'calculus',
  name: 'Calculus',
  buttons: CALCULUS_BUTTON_GRID,
  functionCategories: [
    'trig',
    'inverse-trig',
    'calculus',
    'hyperbolic-trig',
    'number-theory'
  ]
};
```

---

## 6. Testing Scenarios

### 6.1 Edge Cases to Test

**Cursor Positioning**:
- [ ] Click at end of equation
- [ ] Click in middle of equation
- [ ] Click on rendered superscript
- [ ] Click on fraction (numerator vs denominator)
- [ ] Rapid clicking (shouldn't crash)

**Selection**:
- [ ] Select all (Ctrl+A)
- [ ] Select partial text with mouse drag
- [ ] Double-click to select word
- [ ] Select across multiple LaTeX commands
- [ ] Delete selection
- [ ] Type to replace selection

**Multi-Input**:
- [ ] Three inputs on page
- [ ] Click input 1 → keyboard routes correctly
- [ ] Click input 2 → keyboard switches
- [ ] Click input 3 → keyboard switches
- [ ] Type in each input → goes to correct one
- [ ] Rapid switching between inputs

**Error Handling**:
- [ ] Type incomplete \frac{
- [ ] Type unknown \command
- [ ] Paste invalid text
- [ ] Paste valid LaTeX
- [ ] Mix valid and invalid
- [ ] Recover from error state

**Performance**:
- [ ] 10 inputs on page (should be smooth)
- [ ] 50 inputs on page (may slow down)
- [ ] 100 inputs on page (performance test)
- [ ] Very long equation (1000+ chars)
- [ ] Rapid typing (no dropped characters)

---

## 7. Recommendations & Priorities

### 7.1 Phase 1 Focus (Weeks 1-8)

**Must Have**:
1. ✅ Basic MathInput with KaTeX rendering
2. ✅ Cursor at end of string
3. ✅ Hardware keyboard input
4. ✅ Basic visual keyboard (numbers, operators)
5. ✅ Multi-input support via context
6. ✅ Toggle keyboard show/hide

**Can Wait**:
- ❌ Full cursor positioning (add in Phase 2)
- ❌ Complex selection (add in Phase 2)
- ❌ All 13 function categories (start with 5)
- ❌ ABC mode (add in Phase 3)

### 7.2 Function Category Priority

**v1.0** (Include):
1. Trig Functions (sin, cos, tan, csc, sec, cot)
2. Inverse Trig (sin⁻¹, cos⁻¹, tan⁻¹)
3. Calculus (∫, d/dx, Σ, Π, ln, log)
4. Number Theory (lcm, gcd, mod, floor, ceil)

**v1.1** (Add if requested):
5. Hyperbolic Trig (sinh, cosh, tanh)
6. Statistics (mean, median, stdev)

**v2.0** (Future):
7. Probability Distributions
8. Other Desmos-specific functions

### 7.3 Known Limitations (v1.0)

Document these clearly:

**Cursor Positioning**:
- v1.0: Cursor only at end of equation
- Workaround: Use backspace to edit from end
- Future: Full positioning in v1.5

**Selection**:
- v1.0: Browser-native selection (may not be perfect)
- Future: Custom highlight overlays in v2.0

**Mobile**:
- v1.0: Desktop-only (laptop/desktop browsers)
- Future: Mobile optimization in v1.3

**Graphing**:
- v1.0: No graphing capabilities
- Future: Maybe v3.0 if there's demand

---

## Conclusion

This enhanced specification document provides pixel-perfect details for implementing the math equation editor based on Desmos's proven UX patterns. 

**Key Additions in v2.0**:
- ✅ Exact keyboard layout with measurements
- ✅ All 13 function categories documented
- ✅ Color palette and visual design specs
- ✅ Detailed interaction patterns
- ✅ Error state handling examples
- ✅ Implementation recommendations
- ✅ Prioritized feature list

**Use This Document To**:
1. Reference exact Desmos layouts during implementation
2. Understand which function categories to include
3. Match visual design (colors, spacing, animations)
4. Handle edge cases and error states
5. Prioritize features for each release

**Next Steps**:
- Review both masterplan.md (v1.0) and this supplement
- Start with Phase 1 implementation
- Reference this doc for visual/interaction details
- Iterate based on user testing

Ready to build! 🚀