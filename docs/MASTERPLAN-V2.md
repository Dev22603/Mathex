# Math Equation Editor - Enhanced Specifications v2.0
## Supplement to Master Plan v1.0

This document provides enhanced specifications based on detailed Desmos screenshots and additional requirements discussion. Use this alongside the main masterplan.md.

---

## 1. Keyboard Layout Specifications

### 1.1 Main Keyboard (Default Mode)

Based on Desmos screenshots, here's the button layout with groupings:

```
┌─────────────────────────────────────────────────────────────────────┐
│  VARIABLES        NUMBERS & OPERATORS       FUNCTIONS & NAVIGATION  │
├─────────────────────────────────────────────────────────────────────┤
│  [x] [y] [a²][aᵇ]   [7][8][9][÷]   [     functions    ]            │
│  [(] [)] [<] [>]     [4][5][6][×]   [  ←  ][  →  ]                 │
│  [|a|][,][≤][≥]      [1][2][3][−]   [  backspace   ]                │
│  [ABC][🔊][√][π]     [0][.][=][+]   [    ENTER      ]               │
└─────────────────────────────────────────────────────────────────────┘

Layout Notes:
- Left section: Variables, parentheses, special symbols
- Middle section: Number pad with operators (gray background for numbers)
- Right section: Functions panel, navigation arrows, backspace, enter (blue)
- Enter button spans full width of right section
```

### 1.2 ABC Mode Layout

When ABC button is clicked, displays QWERTY letter keyboard:

```
┌──────────────────────────────────────────────────────────┐
│  [q][w][e][r][t][y][u][i][o][p]                          │
│  [a][s][d][f][g][h][j][k][l][θ]  ← theta                 │
│  [⬆][z][x][c][v][b][n][m][backspace]                     │
│  [123][aᵦ][!%][[ ]][{ }][~:][,'][   ENTER   ]            │
└──────────────────────────────────────────────────────────┘

Behavior Notes:
- "123" returns to number mode
- ⬆ (shift) toggles UPPERCASE/lowercase for letters
- θ (theta) included as commonly used Greek letter
```

### 1.3 Row 4 Special Buttons Behavior

The bottom row has special dual-character buttons with unique shift behavior:

**Subscript/Superscript Button (aᵦ / aᵇ)**:
- Display swaps completely when shift is pressed
- Unshifted: Shows `aᵦ` → activates subscript mode for next character
- Shifted: Shows `aᵇ` → activates superscript mode for next character

**Dual-Character Buttons (! %, [ ], { }, ~ :, , ')**:
- Both characters always visible on the button
- One character is clear/emphasized, other is blurred/faded (opacity ~0.35)
- Shift toggles which character is active (clear vs blurred)
- Clicking inserts only the active (clear) character

```
Example: "! %" button
- Unshifted: "!" is clear, "%" is blurred → inserts "!"
- Shifted: "!" is blurred, "%" is clear → inserts "%"
```

### 1.4 Button LaTeX Mappings

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
| 🔊 | 🔊 | - | Speak equation (no-op) |
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
sin   cos   tan
csc   sec   cot

LaTeX: \sin(, \cos(, \tan(, \csc(, \sec(, \cot(
```

### Category 2: INVERSE TRIG FUNCTIONS
```
sin⁻¹  cos⁻¹  tan⁻¹
csc⁻¹  sec⁻¹  cot⁻¹

LaTeX: \sin^{-1}(, \cos^{-1}(, \tan^{-1}(
```

### Category 3: STATISTICS
```
mean    median    min
max     quartile  quantile
stdev   stdevp    var
varp    cov       covp
mad     corr      spearman
stats   count     total
```

### Category 4: LIST OPERATIONS
```
repeat  join   sort
shuffle unique for
```

### Category 5: VISUALIZATIONS
```
histogram  dotplot  boxplot
```

### Category 6: PROBABILITY DISTRIBUTIONS
```
normaldist  tdist  chisqdist
uniformdist binomialdist
poissondist geodist
pdf         cdf     inversecdf
random
```

### Category 7: INFERENCE
```
ztest    ttest   zproptest
chisqtest chisqgof null
p        pleft    pright
score    dof      stderr
conf     lower    upper
estimate
```

### Category 8: CALCULUS ⭐ (Priority)
```
exp   ln    log
logₐ  d/dx  f'
∫     Σ     Π

LaTeX:
exp → e^{}
ln → \ln(
log → \log(
logₐ → \log_{}(
d/dx → \frac{d}{dx}
f' → '
∫ → \int_{}^{}
Σ → \sum_{}^{}
Π → \prod_{}^{}
```

### Category 9: HYPERBOLIC TRIG FUNCTIONS
```
sinh  cosh  tanh
csch  sech  coth

LaTeX: \sinh(, \cosh(, \tanh(
```

### Category 10: GEOMETRY
```
polygon distance midpoint
```

### Category 11: CUSTOM COLORS
```
rgb  hsv  okhsv
oklab oklch
```

### Category 12: SOUND
```
tone
```

### Category 13: NUMBER THEORY ⭐ (Priority)
```
lcm  gcd   mod
ceil floor round
sign  ⁿ√   nPr
      nCr

LaTeX:
lcm → \text{lcm}(
gcd → \gcd(
mod → \mod
ceil → \lceil \rceil
floor → \lfloor \rfloor
round → \text{round}(
sign → \text{sign}(
ⁿ√ → \sqrt[]{}
nPr → P(n,r)
nCr → \binom{}{}
```

### Recommended Function Categories for JEE v1.0

**Include (All 13 categories)**:
All categories are implemented in the keyboard for completeness, matching Desmos.

---

## 3. Visual Design Specifications

### 3.1 Color Palette (Light Theme)

```css
/* Primary */
--dcg-accent-color: #2f72dc;
--dcg-accent-color-shaded-10: #2457a8;
--dcg-accent-color-shaded-20: #193d75;

/* Backgrounds */
--dcg-custom-background-color: #fff;
--dcg-custom-background-color-shaded: #eff2f3;

/* Text */
--dcg-custom-text-color: #000;

/* Button Styles */
White buttons: linear-gradient(#fff, #f9f9f9)
Gray buttons: linear-gradient(#f6f6f6, #f0f0f0)
Blue buttons: var(--dcg-accent-color)
```

### 3.2 Visual States

**Button States**:
- Normal: White/gray gradient background
- Hover: Slightly darker background
- Active/Pressed: Darker, no shadow
- Active toggle (shift, subscript): Pressed appearance maintained

**Dual-Character Button States**:
- Clear character: Full opacity, black text
- Blurred character: ~0.35 opacity, gray text

---

## 4. Interaction Patterns

### 4.1 Keyboard Toggle

- Toggle button fixed at bottom-left corner of viewport
- Shows keyboard icon with caret indicator
- Click to show/hide keyboard with slide animation
- When keyboard visible, toggle becomes minimize button above keyboard

### 4.2 Keyboard Behavior

- Fixed position at bottom of browser window
- Click outside keyboard closes it
- Keyboard automatically routes input to focused MathInput
- Multiple MathInputs supported - keyboard follows focus

### 4.3 Special Button Behaviors

**Enter Button**: Blurs/unfocuses the active input (doesn't insert anything)

**Backspace Button**: Dispatches hardware-like Backspace keydown event

**Arrow Buttons (← →)**: Dispatch ArrowLeft/ArrowRight keydown events for cursor navigation

**Shift Button**:
- Toggles uppercase for letters
- Swaps subscript/superscript button display
- Toggles active character on dual-character buttons
- Resets after typing a letter

**Functions Button**: Opens/closes the functions panel popup

### 4.4 Functions Panel

- Slides in from right side when "functions" button clicked
- Shows all 13 categories with sticky headers
- Scrollable with all functions accessible
- Clicking a function inserts its LaTeX and closes only the panel (not keyboard)
- Click outside panel to close

---

## 5. Implementation Status

### 5.1 Completed Features

✅ Main keyboard layout (default mode)
✅ ABC mode with QWERTY layout
✅ All 13 function categories
✅ Toggle keyboard show/hide
✅ Functions panel with scroll
✅ Shift for uppercase letters
✅ Subscript/superscript button (display swap on shift)
✅ Dual-character buttons (blur/emphasis on shift)
✅ Enter blurs input
✅ Backspace dispatches hardware event
✅ Arrow keys dispatch navigation events
✅ Fixed bottom positioning
✅ Click outside to close

### 5.2 Component Structure

```
<MathProvider>
  │
  ├── <MathInput /> (multiple supported)
  │
  └── <MathKeyboard
        isVisible={boolean}
        onVisibilityChange={callback}
      />
</MathProvider>
```

---

## 6. Known Limitations (v1.0)

**Cursor Positioning**:
- Current: Basic cursor support via MathQuill/KaTeX
- Future: Enhanced positioning in later versions

**Mobile**:
- v1.0: Desktop-only (laptop/desktop browsers)
- Future: Mobile optimization planned

**Speaker Button (🔊)**:
- No functionality, UI element only (matches Desmos)

---

## Conclusion

This specification documents the Desmos-style keyboard implementation. The keyboard provides:

- **Full Desmos keyboard replication**: Default mode, ABC mode, all 13 function categories
- **Desktop-focused**: Fixed bottom positioning, click-outside-to-close
- **Shift behaviors**: Letter case toggle, subscript/superscript swap, dual-char blur/emphasis
- **Context integration**: Routes to focused MathInput via MathProvider

**Files**:
- `MathKeyboard.tsx` - Main component
- `MathKeyboard.css` - Desmos-style CSS
- `keyboardData.ts` - Button configurations and function categories
- `types/index.ts` - TypeScript interfaces including ButtonConfig with dualChar support
