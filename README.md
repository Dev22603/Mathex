# Mathex

A Desmos-like math equation editor component library for React. Build beautiful, interactive math input experiences for educational platforms.

## Features

- 🎨 **Beautiful UI** - Desmos-inspired design with light and dark themes
- ⌨️ **On-Screen Keyboard** - Full math keyboard with symbols, functions, and operators
- 📱 **Context-Aware** - Multi-input support with automatic keyboard routing
- 🔢 **13 Function Categories** - Complete set of math functions from Trig to Calculus
- ⚡ **TypeScript** - Full type safety and IntelliSense support
- 🎯 **Lightweight** - Tree-shakeable and optimized for production

## Installation

```bash
npm install mathex
```

## Quick Start

```tsx
import { MathProvider, MathInput, MathKeyboard } from 'mathex';

function App() {
  const [latex, setLatex] = useState('x^2 + 3x + 1');

  return (
    <MathProvider theme="light">
      <MathInput
        value={latex}
        onChange={setLatex}
        placeholder="Enter equation..."
      />
      <MathKeyboard />
    </MathProvider>
  );
}
```

## Theming

Mathex supports both light and dark themes out of the box.

### Light Theme (Default)

```tsx
<MathProvider theme="light">
  <MathInput />
  <MathKeyboard />
</MathProvider>
```

### Dark Theme

```tsx
<MathProvider theme="dark">
  <MathInput />
  <MathKeyboard />
</MathProvider>
```

### Dynamic Theme Switching

```tsx
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  };

  return (
    <MathProvider theme={theme}>
      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      <MathInput />
      <MathKeyboard />
    </MathProvider>
  );
}
```

### Custom Theme

You can customize the theme by providing a `ThemeConfig` object:

```tsx
const customTheme = {
  colors: {
    primary: '#FF5722',
    background: '#FFF',
    text: '#000',
    border: '#CCC',
  },
  // ... more customization options
};

<MathProvider theme={customTheme}>
  <MathInput />
  <MathKeyboard />
</MathProvider>
```

## Components

### MathProvider

The context provider that manages global state and communication between components.

**Props:**
- `theme` - `'light' | 'dark' | ThemeConfig` - Theme configuration (default: `'light'`)
- `children` - React components to wrap

### MathInput

An input field for entering and displaying mathematical equations.

**Props:**
- `value` - `string` - LaTeX string (controlled mode)
- `defaultValue` - `string` - LaTeX string (uncontrolled mode)
- `onChange` - `(latex: string) => void` - Callback when value changes
- `placeholder` - `string` - Placeholder text
- `disabled` - `boolean` - Disable input
- `className` - `string` - Additional CSS classes
- `style` - `CSSProperties` - Inline styles
- `onError` - `(error: Error) => void` - Error callback

### MathKeyboard

An on-screen keyboard for entering math symbols and functions.

**Props:**
- `isVisible` - `boolean` - Control keyboard visibility
- `onVisibilityChange` - `(visible: boolean) => void` - Visibility change callback
- `className` - `string` - Additional CSS classes
- `style` - `CSSProperties` - Inline styles

## Multiple Inputs

Mathex automatically handles multiple inputs - the keyboard routes input to whichever field is focused:

```tsx
<MathProvider theme="light">
  <div>
    <label>Equation 1:</label>
    <MathInput value={latex1} onChange={setLatex1} />
  </div>

  <div>
    <label>Equation 2:</label>
    <MathInput value={latex2} onChange={setLatex2} />
  </div>

  <div>
    <label>Equation 3:</label>
    <MathInput value={latex3} onChange={setLatex3} />
  </div>

  {/* One keyboard routes to all inputs */}
  <MathKeyboard />
</MathProvider>
```

## Function Categories

The keyboard includes all 13 function categories from Desmos:

1. **Trig Functions** - sin, cos, tan, csc, sec, cot
2. **Inverse Trig** - sin⁻¹, cos⁻¹, tan⁻¹, csc⁻¹, sec⁻¹, cot⁻¹
3. **Calculus** - exp, ln, log, d/dx, ∫, Σ, Π
4. **Number Theory** - lcm, gcd, mod, ceil, floor, round, ⁿ√, nPr, nCr
5. **Hyperbolic Trig** - sinh, cosh, tanh, csch, sech, coth
6. **Statistics** - mean, median, min, max, stdev, var, corr, and more
7. **Probability** - normaldist, tdist, binomialdist, pdf, cdf, random
8. **Inference** - ztest, ttest, chisqtest, confidence intervals
9. **List Operations** - repeat, join, sort, shuffle, unique
10. **Visualizations** - histogram, dotplot, boxplot
11. **Geometry** - polygon, distance, midpoint
12. **Custom Colors** - rgb, hsv, oklab, oklch
13. **Sound** - tone

## Keyboard Modes

- **Default Mode** - Numbers, operators, variables, and common symbols
- **ABC Mode** - QWERTY keyboard for entering letters and Greek symbols

## License

MIT

## Contributing

Contributions welcome! Please open an issue or PR on [GitHub](https://github.com/yourusername/mathex).

## Support

For questions or issues, please visit our [GitHub Issues](https://github.com/yourusername/mathex/issues).
