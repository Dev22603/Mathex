# MathKeyboard Pixel-Perfect Redesign

Based on screenshots: `cursor in equation next to 2x.png` and `123 toggled to abc.png`

## Current Issues

The current keyboard implementation is incorrect. The Desmos keyboard has a completely different layout:

### Numbers Mode - Actual Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LEFT (Variables)  │  CENTER (Numbers)  │  RIGHT (Ops)  │  FAR RIGHT         │
├───────────────────┼────────────────────┼───────────────┼────────────────────┤
│  x    y   a²  aᵇ  │    7    8    9     │      ÷        │   [functions]      │
│  (    )   <   >   │    4    5    6     │      ×        │    ←    →          │
│ |a|   ;   ≤   ≥   │    1    2    3     │      −        │      ⌫             │
│ ABC  🔊   √   π   │    0    .    =     │      +        │    [return ↩]      │
└───────────────────┴────────────────────┴───────────────┴────────────────────┘
```

- **4 sections**: Variables (4x4), Numbers (4x3), Operators (4x1), Actions (4x wide)
- **ABC button**: Gray, bottom-left of variables section
- **Functions button**: Wide button at top-right
- **Arrow buttons**: ← and → for cursor navigation
- **Delete**: ⌫ symbol
- **Return**: Large blue button spanning row height

### ABC Mode - Actual Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  q    w    e    r    t    y    u    i    o    p                             │
│  a    s    d    f    g    h    j    k    l    θ                             │
│ [shift]  z    x    c    v    b    n    m         [⌫]                        │
│ [123]   aᵦ   !%   []   {}   ~'   ,            [return ↩]                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Row 1**: 10 letter keys (q-p)
- **Row 2**: 9 letter keys + theta (θ)
- **Row 3**: Shift (wide gray), z-m letters, Delete (wide gray)
- **Row 4**: 123 button (gray), subscript (aᵦ), special chars (!%, [], {}, ~', ,), Return (blue, wide)

### Toggle Button
- **Location**: Fixed bottom-left corner
- **Icon**: ⌨️ keyboard icon + ▼ dropdown arrow
- **Style**: Gray background, rounded top-right corner only
- **Behavior**: Click to toggle keyboard visibility

## Redesign Tasks

### Phase A: Analysis & Planning
- [ ] A1. Measure exact pixel dimensions from screenshots
- [ ] A2. Extract exact colors (gray tones, blue, white, borders)
- [ ] A3. Document button sizes and spacing
- [ ] A4. Document font sizes and weights
- [ ] A5. Create detailed CSS specifications

### Phase B: Layout Configuration
- [ ] B1. Rewrite `keyboardConfig.ts` with 4-section numbers layout
- [ ] B2. Add variables section (x, y, a², aᵇ, parentheses, etc.)
- [ ] B3. Add numbers section (0-9, calculator layout)
- [ ] B4. Add operators section (÷, ×, −, +)
- [ ] B5. Add actions section (functions, arrows, delete, return)
- [ ] B6. Rewrite ABC layout (QWERTY with shift, special chars)
- [ ] B7. Add button metadata (type, size, style class)

### Phase C: Component Structure
- [ ] C1. Update `MathKeyboard.tsx` to support 4-section grid
- [ ] C2. Implement proper section rendering
- [ ] C3. Add functions button with panel toggle
- [ ] C4. Add arrow buttons for cursor navigation
- [ ] C5. Update mode toggle logic (ABC ↔ 123)
- [ ] C6. Ensure proper button click handlers

### Phase D: Styling - Toggle Button
- [ ] D1. Position toggle at fixed bottom-left
- [ ] D2. Add keyboard icon (⌨️) + dropdown arrow (▼)
- [ ] D3. Style with gray background (#E8E8E8)
- [ ] D4. Round only top-right corner (border-radius)
- [ ] D5. Match exact dimensions from screenshot

### Phase E: Styling - Numbers Mode
- [ ] E1. Create 4-section grid layout
- [ ] E2. Style variables section (white buttons, standard size)
- [ ] E3. Style numbers section (gray buttons #C5C5C5)
- [ ] E4. Style operators section (white buttons, standard size)
- [ ] E5. Style functions button (wide, gray)
- [ ] E6. Style arrow buttons (standard size)
- [ ] E7. Style delete button (standard size with ⌫)
- [ ] E8. Style return button (blue #2F7DEF, tall/wide)
- [ ] E9. Add ABC button styling (gray, bottom-left)

### Phase F: Styling - ABC Mode
- [ ] F1. Create full-width QWERTY layout
- [ ] F2. Style letter keys (white, standard size)
- [ ] F3. Style shift button (gray, wider)
- [ ] F4. Style delete button (gray, wider)
- [ ] F5. Style 123 button (gray, wider)
- [ ] F6. Style special character buttons
- [ ] F7. Style return button (blue, very wide)
- [ ] F8. Ensure proper row alignment and spacing

### Phase G: Fine-tuning
- [ ] G1. Match exact button padding and margins
- [ ] G2. Match exact font sizes and weights
- [ ] G3. Match exact border colors and widths
- [ ] G4. Match exact shadows (if any)
- [ ] G5. Match exact hover states
- [ ] G6. Match exact active/pressed states
- [ ] G7. Verify responsive behavior

### Phase H: LaTeX Mapping
- [ ] H1. Map all variable buttons to correct LaTeX
- [ ] H2. Map superscript (a²) to `^2` insertion
- [ ] H3. Map power (aᵇ) to `^{}` with cursor positioning
- [ ] H4. Map subscript (aᵦ) to `_{}` with cursor positioning
- [ ] H5. Map square root to `\sqrt{}`
- [ ] H6. Map symbols (π, θ, etc.) to LaTeX
- [ ] H7. Map comparison operators (≤, ≥, <, >)
- [ ] H8. Ensure all special characters work correctly

### Phase I: Functionality
- [ ] I1. Implement cursor navigation (← → buttons)
- [ ] I2. Implement backspace (⌫) at cursor position
- [ ] I3. Implement return button behavior
- [ ] I4. Implement shift key for ABC mode (uppercase)
- [ ] I5. Implement functions panel (expandable)
- [ ] I6. Test insertion at cursor position (not just append)
- [ ] I7. Test mode switching (123 ↔ ABC)

### Phase J: Testing & Validation
- [ ] J1. Build and verify no TypeScript errors
- [ ] J2. Visual comparison with screenshots
- [ ] J3. Test all buttons in numbers mode
- [ ] J4. Test all buttons in ABC mode
- [ ] J5. Test mode switching
- [ ] J6. Test cursor navigation
- [ ] J7. Test with multiple MathInput components
- [ ] J8. Verify provider integration works correctly

### Phase K: Documentation
- [ ] K1. Update component documentation
- [ ] K2. Add inline comments for complex layout logic
- [ ] K3. Document CSS structure and variables
- [ ] K4. Update examples/App.tsx with better demo
- [ ] K5. Take comparison screenshots (before/after)

## Key Specifications (To Be Measured)

### Colors
- **White buttons**: #FFFFFF
- **Gray buttons (numbers)**: #C5C5C5 (approx)
- **Gray buttons (special)**: #E8E8E8 (approx)
- **Blue return**: #2F7DEF
- **Border**: #D0D0D0 (approx)
- **Background**: #F5F5F5 (approx)

### Button Sizes (To Be Measured)
- Standard button: ~50-60px width × 40-45px height
- Wide button (shift, delete): ~80-100px width
- Very wide button (return): ~120-150px width
- Tall button (return): spans multiple rows visually

### Spacing
- Gap between buttons: ~4-6px
- Padding inside buttons: ~8-12px
- Keyboard padding: ~12-16px

### Typography
- Font family: System font, sans-serif
- Font size: ~16-18px for symbols, ~14px for text
- Font weight: 400 (normal) for most, 500 (medium) for return

## Notes

- The current implementation is completely wrong in terms of layout
- This requires a COMPLETE rewrite of the keyboard structure
- The numbers mode has a complex 4-section layout, not a simple grid
- ABC mode is full-width QWERTY, not the same grid as numbers
- Toggle button design is different (keyboard icon + arrow)
- Need to implement functions panel (collapsible)
- Need to implement cursor navigation arrows
- This is a significant undertaking - estimate 8-12 hours of work

## References

- Screenshot 1: `docs/Screenshots of Desmos/cursor in equation next to 2x.png`
- Screenshot 2: `docs/Screenshots of Desmos/123 toggled to abc.png`
