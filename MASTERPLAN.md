# Math Equation Editor Component Library - Master Plan

## 1. Executive Overview

### Vision
Build a professional-grade, React-based component library that enables developers to add beautiful, interactive math equation editing capabilities to their web applications. The library will provide a visual, WYSIWYG editing experience similar to Desmos, allowing users to create and edit mathematical equations without touching LaTeX code.

### Primary Use Case
Educational platforms (particularly for JEE exam preparation) where users need to edit mathematical equations within question papers. Teachers and content creators can click on any equation to edit it visually using an intuitive keyboard interface.

### Key Differentiator
Unlike standalone math editors, this is a **component library** that developers can integrate into their own applications, with full control over styling, behavior, and data flow.

---

## 2. Target Audience

### Primary Users (Developers)
- **Educational Platform Builders**: Creating online learning platforms, homework apps, test prep software
- **Content Management System Developers**: Adding math editing capabilities to CMS platforms
- **EdTech Startups**: Building tools for teachers and students
- **Scientific Software Developers**: Applications requiring mathematical notation input

### Secondary Users (End Users)
- Teachers and tutors creating/editing educational content
- Students working on assignments
- Content creators writing math-heavy documentation

### Technical Skill Level
- Developers with React knowledge (intermediate level)
- Comfortable with npm packages and component-based architecture
- Familiar with controlled components and React hooks

---

## 3. Core Features & Functionality

### 3.1 MathInput Component
**Purpose**: A specialized text input field for mathematical equations

**Key Capabilities**:
- Real-time LaTeX rendering using KaTeX
- Dual input support: hardware keyboard and visual math keyboard
- Standard text editing features: cursor positioning, text selection, copy/paste
- Click-to-focus behavior with visual cursor (I-beam)
- Multiple instances on same page, each independently focusable
- LaTeX input/output format
- Error handling: displays raw LaTeX for invalid syntax

**Input Methods**:
- **Hardware Keyboard**: Users type LaTeX syntax (e.g., `x^2`, `\frac{a}{b}`, `\sqrt{x}`)
- **Visual Keyboard**: Click buttons to insert symbols and operators

**Visual States**:
- **Unfocused**: Beautifully rendered equation
- **Focused**: Editable with blinking cursor, still rendered in real-time

### 3.2 MathKeyboard Component
**Purpose**: A toggleable visual keyboard for inserting math symbols and functions

**Key Capabilities**:
- Toggle show/hide via button
- Fixed positioning at bottom of browser window
- Multiple keyboard modes/layouts (preset configurations)
- Automatically connects to currently focused MathInput
- Organized button layouts with categories (numbers, operators, functions, Greek letters)

**Preset Modes**:
1. **Basic Algebra Mode**:
   - Numbers (0-9)
   - Basic operators (+, -, ×, ÷, =)
   - Variables (x, y, a, b)
   - Superscript/subscript (^, _)
   - Parentheses, brackets
   - Common symbols (π, √)

2. **Calculus Mode**:
   - All basic algebra buttons
   - Calculus operators (∫, Σ, lim, d/dx)
   - Trigonometric functions (sin, cos, tan, etc.)
   - Greek letters (α, β, θ, ω)
   - Fractions and roots

3. **Chemistry Mode**:
   - Numbers and basic operators
   - Subscripts for chemical formulas
   - Common elements
   - Arrow symbols

**Keyboard Layout Structure**:
- Main panel: Core buttons (numbers, operators, variables)
- Functions panel: Expandable panel with advanced functions (trig, stats)
- Mode switcher: Toggle between number/variable layouts (like Desmos ABC button)
- Navigation: Arrow keys for cursor movement
- Action buttons: Backspace, Enter/submit

### 3.3 Context/Provider System
**Purpose**: Manage state and communication between components

**Responsibilities**:
- Track which MathInput is currently focused
- Route keyboard input to active input field
- Manage keyboard visibility state
- Handle theme/styling configuration
- Coordinate between multiple MathInput instances

---

## 4. Technical Stack Recommendations

### 4.1 Core Technologies
- **Framework**: React 18+ (with hooks)
- **Language**: TypeScript (for type safety and better DX)
- **Math Rendering**: KaTeX (fast, interactive, perfect for real-time editing)
- **Build Tool**: Vite or Rollup (for component library bundling)
- **Package Manager**: npm

### 4.2 Why These Choices?

**React + TypeScript**:
- Industry standard for component libraries
- Excellent developer experience with autocomplete and type checking
- Large ecosystem and community support
- Easy integration into existing React apps

**KaTeX over MathJax**:
- 10-100x faster rendering (critical for real-time editing)
- Lightweight (~300KB vs ~1MB+)
- No page reflow or jumping
- Specifically designed for interactive use
- Used by Desmos, Khan Academy, Notion
- Covers 95%+ of LaTeX including all JEE-level math

**Vite/Rollup**:
- Optimized for library builds
- Tree-shaking support
- Produces multiple output formats (ESM, CJS, UMD)
- Fast development experience

### 4.3 Supporting Libraries
- **clsx / classnames**: For conditional CSS classes
- **zustand or React Context**: State management (start with Context, scale to Zustand if needed)
- **react-contenteditable or custom**: For editable equation rendering

### 4.4 Development Tools
- **ESLint + Prettier**: Code quality and formatting
- **Jest + React Testing Library**: Unit and integration testing
- **Storybook**: Component documentation and visual testing
- **Changesets**: Version management and changelogs

### 4.5 Browser Support
- **Target**: Modern browsers only (last 2 versions)
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- **Rationale**: Simplifies development, most educational platforms target modern browsers

---

## 5. Architecture & Design

### 5.1 Component Hierarchy

```
<MathProvider theme={theme} config={config}>
  │
  ├── <MathInput id="equation1" />
  ├── <MathInput id="equation2" />
  ├── <MathInput id="equation3" />
  │
  └── <MathKeyboard mode="calculus" position="bottom" />
</MathProvider>
```

### 5.2 State Management Architecture

**Context Structure**:
```typescript
interface MathContextState {
  // Active input tracking
  activeInputId: string | null;
  
  // Keyboard state
  keyboardVisible: boolean;
  keyboardMode: 'basic' | 'calculus' | 'chemistry';
  
  // Input registration
  inputs: Map<string, MathInputState>;
  
  // Theme configuration
  theme: ThemeConfig;
  
  // Actions
  registerInput: (id: string, state: MathInputState) => void;
  unregisterInput: (id: string) => void;
  setActiveInput: (id: string | null) => void;
  toggleKeyboard: () => void;
  setKeyboardMode: (mode: KeyboardMode) => void;
  insertAtCursor: (latex: string) => void;
}
```

**Data Flow**:
1. User clicks MathInput → triggers `setActiveInput(id)`
2. Context updates `activeInputId`
3. MathKeyboard reads `activeInputId` to know where to send input
4. User clicks keyboard button → `insertAtCursor(latex)` called
5. Context routes command to active MathInput
6. MathInput updates its LaTeX state → triggers KaTeX re-render
7. onChange callback fires to parent app with new LaTeX

### 5.3 Component Responsibilities

**MathProvider**:
- Manages global state (active input, keyboard visibility)
- Provides context to all child components
- Handles theme configuration
- Coordinates input/keyboard communication

**MathInput**:
- Registers itself with MathProvider on mount
- Maintains its own LaTeX string state
- Handles cursor position and text selection
- Renders LaTeX with KaTeX in real-time
- Accepts input from both hardware keyboard and MathKeyboard
- Fires onChange callbacks to parent app
- Manages focus/blur states

**MathKeyboard**:
- Reads active input from context
- Provides button interface for symbol insertion
- Handles mode switching (basic/calculus/chemistry)
- Manages keyboard visibility toggle
- Supports keyboard layout configurations
- Sends commands to active MathInput via context

### 5.4 Rendering Strategy

**Real-time LaTeX Rendering**:
- As user types, parse LaTeX string
- Render with KaTeX continuously
- Handle partial/invalid LaTeX gracefully (show raw text)
- Maintain cursor position during re-renders (challenging!)

**Cursor Management**:
- Track cursor position in LaTeX string (character index)
- Convert between rendered position and LaTeX string position
- Handle selection ranges
- Visual cursor indicator

---

## 6. Data Model

### 6.1 LaTeX String Format
**Primary data format**: LaTeX strings

**Examples**:
```latex
Basic: x^2 + 3x + 1
Fractions: \frac{a}{b}
Roots: \sqrt{x}, \sqrt[3]{x}
Greek: \alpha + \beta = \gamma
Functions: \sin(\theta), \cos(x)
Subscripts: x_1, a_{max}
Complex: \int_{0}^{\infty} e^{-x^2} dx
Chemistry: H_2O, CO_2
```

### 6.2 Component Props Interface

**MathInput**:
```typescript
interface MathInputProps {
  // Controlled component pattern
  value?: string;  // LaTeX string
  defaultValue?: string;
  onChange?: (latex: string) => void;
  
  // Identification
  id?: string;
  
  // Appearance
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  
  // Behavior
  autoFocus?: boolean;
  readOnly?: boolean;
  
  // Validation
  onError?: (error: Error) => void;
}
```

**MathKeyboard**:
```typescript
interface MathKeyboardProps {
  // Mode configuration
  mode?: 'basic' | 'calculus' | 'chemistry' | KeyboardConfig;
  
  // Appearance
  position?: 'fixed-bottom' | 'floating';
  className?: string;
  style?: React.CSSProperties;
  
  // Behavior
  defaultVisible?: boolean;
  
  // Customization
  showToggleButton?: boolean;
  customButtons?: ButtonConfig[];
}
```

**MathProvider**:
```typescript
interface MathProviderProps {
  children: React.ReactNode;
  
  // Theme
  theme?: 'light' | 'dark' | ThemeConfig;
  
  // Global configuration
  config?: {
    defaultKeyboardMode?: KeyboardMode;
    katexOptions?: KaTeXOptions;
  };
}
```

### 6.3 Internal State Models

**Cursor State**:
```typescript
interface CursorState {
  position: number;  // Character index in LaTeX string
  selection?: {
    start: number;
    end: number;
  };
}
```

**Input State**:
```typescript
interface MathInputState {
  id: string;
  latex: string;
  cursor: CursorState;
  focused: boolean;
  error: Error | null;
}
```

---

## 7. User Interface & Experience Principles

### 7.1 Design Philosophy
- **Familiar**: Mimic Desmos behavior that users already know
- **Unobtrusive**: Components blend into host application
- **Responsive Feedback**: Instant visual updates as user types/clicks
- **Error-Tolerant**: Gracefully handle incomplete or invalid LaTeX
- **Accessible**: Keyboard navigation, ARIA labels, screen reader support

### 7.2 Visual Design Considerations

**Themes**:
- **Light Theme**: Default, clean, suitable for most educational apps
- **Dark Theme**: For dark-mode applications
- **Custom**: Full CSS override capability

**Customization Points**:
- Primary/accent colors
- Button styles and sizes
- Font families and sizes
- Border radius and shadows
- Spacing and padding
- Keyboard height and width

**CSS Variables Approach**:
```css
--math-primary-color
--math-background-color
--math-text-color
--math-border-color
--math-button-hover-color
--math-keyboard-height
--math-font-size
```

### 7.3 Interaction Patterns

**Keyboard Behavior**:
- Toggle button always visible (in corner or integrated)
- Smooth slide-in/out animation
- Click outside to close? (configurable)
- Escape key to close

**Input Behavior**:
- Click anywhere to position cursor
- Drag to select text
- Double-click to select term/expression
- Standard shortcuts: Ctrl+A (select all), Ctrl+C/V (copy/paste), Ctrl+Z/Y (undo/redo)

**Button Feedback**:
- Hover states
- Click animations
- Visual indication when inserting at cursor

---

## 8. Security & Privacy Considerations

### 8.1 Security Concerns
**Input Validation**:
- LaTeX is generally safe (no code execution)
- KaTeX sanitizes input by design
- Limit input length to prevent performance issues (e.g., 10,000 chars max)

**XSS Prevention**:
- KaTeX renders to HTML safely (no dangerouslySetInnerHTML needed)
- Sanitize any custom HTML if developers extend the library

**Dependency Security**:
- Regular dependency audits (npm audit)
- Pin KaTeX version to tested release
- Monitor for security advisories

### 8.2 Data Privacy
- **No data collection**: Library operates entirely client-side
- **No external requests**: All rendering happens locally
- **Developer responsibility**: Host app manages data storage/transmission
- **No telemetry**: Unless explicitly added by developers

### 8.3 Accessibility
- **Keyboard Navigation**: Full keyboard support (Tab, Arrow keys, Enter)
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear focus indicators
- **Alt Text**: MathML output for screen readers (KaTeX provides this)
- **Color Contrast**: Meet WCAG AA standards in default themes

---

## 9. Development Phases & Milestones

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Core infrastructure and basic functionality

**Tasks**:
- Project setup (TypeScript, React, Vite)
- Basic MathInput component with KaTeX rendering
- Simple text input with LaTeX syntax support
- Hardware keyboard input working
- Basic cursor positioning

**Deliverable**: MathInput component that accepts LaTeX via keyboard and renders it

### Phase 2: Visual Keyboard - Basic Mode (Weeks 4-6)
**Goal**: First version of MathKeyboard with essential buttons

**Tasks**:
- MathKeyboard component structure
- Basic algebra button layout (numbers, operators, variables)
- Button click → insert at cursor functionality
- Keyboard toggle mechanism
- Fixed bottom positioning

**Deliverable**: Basic math keyboard that inserts symbols into MathInput

### Phase 3: Context & Multi-Input (Weeks 7-8)
**Goal**: Enable multiple inputs sharing one keyboard

**Tasks**:
- MathProvider implementation
- Context-based state management
- Input registration/unregistration
- Active input tracking
- Route keyboard input to correct MathInput

**Deliverable**: Multiple MathInputs on page, keyboard sends to focused input

### Phase 4: Advanced Features (Weeks 9-11)
**Goal**: Complete editing experience

**Tasks**:
- Text selection support
- Copy/paste functionality
- Undo/redo implementation (or browser default)
- Error handling for invalid LaTeX
- Function panel (expandable section with trig, calculus functions)
- Mode switching (ABC button for variables)

**Deliverable**: Full-featured editing with all Desmos-like capabilities

### Phase 5: Keyboard Modes (Weeks 12-14)
**Goal**: Preset configurations for different use cases

**Tasks**:
- Calculus mode layout
- Chemistry mode layout
- Mode switching mechanism
- Configuration system for custom modes
- Button organization and categorization

**Deliverable**: Three preset modes fully functional

### Phase 6: Theming & Customization (Weeks 15-16)
**Goal**: Make library adaptable to any design system

**Tasks**:
- CSS variables implementation
- Light/dark themes
- Theme configuration API
- CSS class structure for overrides
- Style documentation

**Deliverable**: Fully themeable components with examples

### Phase 7: Testing & Documentation (Weeks 17-19)
**Goal**: Production-ready quality

**Tasks**:
- Unit tests for all components
- Integration tests for workflows
- Browser compatibility testing
- Storybook documentation
- API documentation (TypeScript types + examples)
- Usage examples and tutorials

**Deliverable**: Well-tested, documented library

### Phase 8: Package & Release (Week 20)
**Goal**: Publish to npm

**Tasks**:
- Build optimization
- npm package configuration
- README and getting started guide
- Version 1.0.0 release
- Example CodeSandbox demos

**Deliverable**: Published npm package ready for use

---

## 10. Potential Technical Challenges & Solutions

### Challenge 1: Cursor Position in Rendered Math
**Problem**: Maintaining cursor position as LaTeX renders to visual math is complex. Character positions in LaTeX string don't map 1:1 to rendered positions.

**Solution Approaches**:
- Use contentEditable with careful cursor tracking
- Maintain parallel data structures (LaTeX string + cursor index)
- Research how Desmos handles this (they likely use a custom solution)
- Consider using existing libraries like MathQuill as reference (open source)
- May need to track cursor in LaTeX string space, not rendered space

**Mitigation**: Start simple (just end-of-string cursor), add full positioning later

### Challenge 2: Real-time Rendering Performance
**Problem**: Re-rendering KaTeX on every keystroke could cause lag for long equations

**Solution Approaches**:
- Debounce rendering (wait 50-100ms after typing stops)
- Use React.memo and useMemo to prevent unnecessary re-renders
- KaTeX is already fast, so likely not an issue until very long equations
- Benchmark and optimize only if needed

**Mitigation**: Start with immediate rendering, optimize if users report lag

### Challenge 3: Selection and Complex Editing
**Problem**: Selecting parts of rendered math, then replacing/deleting is complex

**Solution Approaches**:
- Track selection as [start, end] indices in LaTeX string
- Highlight corresponding rendered output
- On keyboard input, replace selection range in LaTeX string
- This is genuinely hard - consider starting without selection, add later

**Mitigation**: Phase 1: No selection. Phase 2: Add selection support.

### Challenge 4: Mobile/Responsive Adaptation
**Problem**: Current scope is desktop-only, but future mobile support will be challenging

**Solution Approaches**:
- Design with mobile in mind (component structure supports it)
- Use responsive CSS (--keyboard-height: 40vh on mobile)
- Touch-friendly button sizes (minimum 44x44px)
- Consider virtual keyboard positioning on mobile (different from desktop)

**Mitigation**: Document mobile as future roadmap, not v1.0

### Challenge 5: Parsing Complex LaTeX
**Problem**: Users might paste complex LaTeX that needs to be editable

**Solution Approaches**:
- KaTeX handles rendering, so just store/display the string
- For editing, parse LaTeX to identify components (variables, operators, etc.)
- Consider using a LaTeX parser library if needed
- Start with simpler LaTeX, expand support incrementally

**Mitigation**: Support common JEE-level LaTeX in v1, expand later

### Challenge 6: Browser Compatibility
**Problem**: contentEditable, cursor APIs, CSS features may differ across browsers

**Solution Approaches**:
- Test on all target browsers early and often
- Use polyfills where needed
- Feature detection, not browser detection
- Have fallback behaviors for unsupported features

**Mitigation**: Target modern browsers only, clearly document requirements

### Challenge 7: Bundle Size
**Problem**: KaTeX + React + custom code could be large

**Solution Approaches**:
- Tree-shaking (only import used KaTeX features)
- Code splitting (load functions panel on-demand)
- Optimize bundle with Rollup
- KaTeX is ~300KB, which is acceptable for this use case

**Mitigation**: Monitor bundle size, optimize if exceeds 500KB

---

## 11. Future Expansion Possibilities

### Short-term Enhancements (v1.1 - v1.5)
- **Autocomplete**: Suggest LaTeX commands as user types
- **Templates**: Pre-built equation templates (quadratic formula, etc.)
- **History**: Recent equations for quick reuse
- **Drag-and-drop**: Drag from keyboard to position
- **Equation Gallery**: Visual picker for common patterns
- **Keyboard Shortcuts**: Power user features (type `\alpha` to insert α)

### Medium-term Expansion (v2.0+)
- **Mobile Support**: Touch-optimized keyboard, responsive layouts
- **Additional Modes**: Statistics, physics, engineering symbols
- **Collaboration**: Multiple cursors, real-time editing (with external sync)
- **Equation Solving**: Integration with computation libraries (optional)
- **Handwriting Recognition**: Draw equations (via ML model)
- **Export Formats**: PNG, SVG, MathML export

### Long-term Vision (v3.0+)
- **Multi-framework Support**: Vue, Angular, Svelte adapters
- **Graphing Component**: Add graphing capabilities (become full Desmos alternative)
- **Computation Engine**: Evaluate equations, solve, graph
- **AI Assistance**: Auto-complete complex equations, suggest corrections
- **Accessibility++**: Enhanced screen reader support, audio equation reading
- **Plugin System**: Allow third-party extensions

### Ecosystem Expansion
- **WordPress Plugin**: Easy integration for educational sites
- **Notion/Obsidian Plugins**: Note-taking tool integrations
- **LMS Integrations**: Canvas, Moodle, Blackboard connectors
- **API Version**: Headless API for non-web platforms
- **Desktop Apps**: Electron wrapper for offline use

---

## 12. Success Metrics & Goals

### Development Metrics
- **Code Coverage**: >80% test coverage
- **Bundle Size**: <500KB gzipped
- **Performance**: <50ms render time for typical equations
- **Browser Support**: 100% pass rate on target browsers
- **Documentation**: Every public API documented with examples

### Adoption Metrics (Post-launch)
- **npm Downloads**: 1,000+ monthly downloads in first year
- **GitHub Stars**: 500+ stars
- **Production Usage**: 50+ production websites using the library
- **Community**: Active issues/PRs, developer discussions
- **Quality**: <5% issue rate (issues per 100 downloads)

### User Experience Metrics
- **Developer Satisfaction**: Survey feedback, GitHub discussions
- **Ease of Integration**: Time to first working implementation
- **Documentation Quality**: Reduced support questions over time
- **Performance**: No user-reported lag or rendering issues

---

## 13. Project Resources & Next Steps

### Recommended Team Structure
**For Initial Development**:
- 1 Lead Developer (React/TypeScript expert)
- 1 UI/UX Contributor (design and interaction patterns)
- Optional: Math education consultant (validate JEE coverage)

### Time Estimate
- **Full v1.0 Development**: 16-20 weeks (4-5 months) with 1 full-time developer
- **With Team**: Could be accelerated to 12-16 weeks

### Technical Skills Needed
- Advanced React and TypeScript
- Component library architecture
- CSS and theming systems
- Testing (Jest, React Testing Library)
- npm package publishing
- Basic understanding of LaTeX
- Familiarity with contentEditable or similar editing APIs

### Immediate Next Steps
1. **Environment Setup**: Initialize React + TypeScript + Vite project
2. **Proof of Concept**: Build minimal MathInput with KaTeX (1-2 days)
3. **Research**: Study Desmos interaction patterns, examine MathQuill source code
4. **Architecture**: Finalize component API and context structure
5. **Phase 1 Kickoff**: Begin foundation development

### Resources to Study
- **KaTeX Documentation**: https://katex.org/docs/api.html
- **MathQuill Source**: https://github.com/mathquill/mathquill (reference implementation)
- **Desmos**: https://www.desmos.com/calculator (interaction patterns)
- **React Component Library Best Practices**: Building robust, reusable components
- **LaTeX Reference**: Common mathematical notation and syntax

---

## 14. Risk Assessment

### Technical Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Cursor positioning too complex | High | Medium | Start simple, iterate, reference MathQuill |
| Performance issues with KaTeX | Medium | Low | KaTeX is proven fast, benchmark early |
| Browser incompatibilities | Medium | Medium | Target modern browsers, test continuously |
| Bundle size too large | Low | Low | Monitor size, optimize as needed |

### Project Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Scope creep | High | Medium | Strict phase planning, defer features to v2 |
| Developer learning curve | Medium | Low | Clear documentation, examples |
| Competition from existing solutions | Medium | Low | Focus on better DX and JEE-specific features |
| Maintenance burden | Medium | Medium | Clean code, good tests, active community |

### Market Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low adoption | Medium | Low | Solve real problem (JEE editors), market to EdTech |
| Existing alternatives sufficient | Low | Medium | Differentiate with ease of use, presets |
| Niche too small | Low | Low | Educational market is large and growing |

---

## 15. Conclusion

This math equation editor component library represents a focused, achievable project with clear value proposition for educational platform developers. By following this masterplan, you'll build a production-ready library that:

- Solves a real problem (visual math editing for JEE and educational content)
- Provides excellent developer experience (TypeScript, React, clean API)
- Delivers high-quality user experience (fast, intuitive, Desmos-like)
- Allows for future expansion (mobile, additional features, ecosystem)

The phased approach ensures steady progress with working software at each milestone. Starting with desktop-only and three keyboard modes keeps scope manageable while delivering core value.

**Key Success Factors**:
1. **Focus**: Resist feature creep, ship v1.0 with core features
2. **Quality**: Prioritize smooth editing experience over feature count
3. **Documentation**: Make integration easy for developers
4. **Community**: Be responsive to early adopters, iterate based on feedback
5. **Performance**: KaTeX + React optimization keeps it fast

This blueprint provides a solid foundation. As you build, you'll discover nuances and make decisions - that's expected. Use this masterplan as your north star, but stay flexible and pragmatic.

**Ready to build something amazing!** 🚀

---

## Appendix A: LaTeX Syntax Coverage

### Priority 1 (Must Have - JEE Core)
- Superscripts: `x^2`, `x^{10}`
- Subscripts: `x_1`, `a_{max}`
- Fractions: `\frac{a}{b}`
- Square roots: `\sqrt{x}`, `\sqrt[n]{x}`
- Basic operators: `+`, `-`, `\times`, `\div`, `=`, `\neq`
- Parentheses: `()`, `[]`, `\{}`
- Absolute value: `|x|`
- Inequalities: `\leq`, `\geq`, `<`, `>`

### Priority 2 (Important - Advanced JEE)
- Greek letters: `\alpha`, `\beta`, `\theta`, `\pi`, `\omega`
- Trig functions: `\sin`, `\cos`, `\tan`, `\cot`, `\sec`, `\csc`
- Logarithms: `\log`, `\ln`
- Limits: `\lim_{x \to a}`
- Derivatives: `\frac{d}{dx}`, `f'(x)`
- Integrals: `\int`, `\int_{a}^{b}`
- Summation: `\sum_{i=1}^{n}`
- Products: `\prod`

### Priority 3 (Nice to Have)
- Matrices: `\begin{matrix}...\end{matrix}`
- Binomial coefficients: `\binom{n}{k}`
- Vectors: `\vec{v}`, `\overrightarrow{AB}`
- Sets: `\in`, `\subset`, `\cup`, `\cap`
- Logic: `\land`, `\lor`, `\neg`, `\forall`, `\exists`
- Advanced calculus: `\partial`, `\nabla`

---

## Appendix B: Component API Reference

### Quick Start Example
```typescript
import { MathProvider, MathInput, MathKeyboard } from 'math-equation-editor';

function App() {
  const [equation, setEquation] = useState('x^2 + 3x + 1');
  
  return (
    <MathProvider theme="light">
      <div>
        <label>Enter equation:</label>
        <MathInput 
          value={equation}
          onChange={setEquation}
          placeholder="Type equation..."
        />
        
        <MathKeyboard mode="calculus" />
      </div>
    </MathProvider>
  );
}
```

This API is preliminary and will be refined during development.

---

*Masterplan Version: 1.0*  
*Last Updated: December 2024*  
*Created for: Math Equation Editor Component Library*