import { useState } from 'react';
import { MathInput } from './components/MathInput';
import './App.css';

function App() {
  const [equation1, setEquation1] = useState('x^2 + 3x + 1');
  const [equation2, setEquation2] = useState('\\frac{a}{b}');
  const [equation3, setEquation3] = useState('\\sqrt{x^2 + y^2}');

  return (
    <div className="app">
      <header className="app-header">
        <h1>🧮 Math Equation Editor</h1>
        <p>React component library for visual math equation editing</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Basic MathInput Component (Phase 1)</h2>
          <p className="demo-description">
            Interactive math input with real-time LaTeX rendering using KaTeX
          </p>

          <div className="demo-grid">
            {/* Example 1: Quadratic equation */}
            <div className="demo-item">
              <label htmlFor="eq1">Quadratic Equation:</label>
              <MathInput
                id="eq1"
                value={equation1}
                onChange={setEquation1}
                placeholder="Enter equation..."
              />
              <code className="latex-display">LaTeX: {equation1}</code>
            </div>

            {/* Example 2: Fraction */}
            <div className="demo-item">
              <label htmlFor="eq2">Fraction:</label>
              <MathInput
                id="eq2"
                value={equation2}
                onChange={setEquation2}
                placeholder="Enter fraction..."
              />
              <code className="latex-display">LaTeX: {equation2}</code>
            </div>

            {/* Example 3: Square root */}
            <div className="demo-item">
              <label htmlFor="eq3">Square Root:</label>
              <MathInput
                id="eq3"
                value={equation3}
                onChange={setEquation3}
                placeholder="Enter expression..."
              />
              <code className="latex-display">LaTeX: {equation3}</code>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Try Different LaTeX Commands</h2>
          <div className="examples-grid">
            <div className="example-card">
              <h3>Basic Operations</h3>
              <ul>
                <li><code>x^2</code> → x²</li>
                <li><code>x_1</code> → x₁</li>
                <li><code>a + b</code> → a + b</li>
                <li><code>a \times b</code> → a × b</li>
              </ul>
            </div>

            <div className="example-card">
              <h3>Fractions & Roots</h3>
              <ul>
                <li><code>\frac{'{a}'}{'{b}'}</code> → Fraction</li>
                <li><code>\sqrt{'{x}'}</code> → Square root</li>
                <li><code>\sqrt[3]{'{x}'}</code> → Cube root</li>
              </ul>
            </div>

            <div className="example-card">
              <h3>Greek Letters</h3>
              <ul>
                <li><code>\alpha</code> → α</li>
                <li><code>\beta</code> → β</li>
                <li><code>\theta</code> → θ</li>
                <li><code>\pi</code> → π</li>
              </ul>
            </div>

            <div className="example-card">
              <h3>Functions</h3>
              <ul>
                <li><code>\sin(x)</code> → sin(x)</li>
                <li><code>\cos(x)</code> → cos(x)</li>
                <li><code>\ln(x)</code> → ln(x)</li>
                <li><code>\int</code> → ∫</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="status-section">
          <h2>📋 Development Status</h2>
          <div className="status-grid">
            <div className="status-item status-completed">
              <span className="status-icon">✅</span>
              <div>
                <strong>Phase 1: Foundation</strong>
                <p>Basic MathInput with KaTeX rendering</p>
              </div>
            </div>

            <div className="status-item status-pending">
              <span className="status-icon">⏳</span>
              <div>
                <strong>Phase 2: MathKeyboard</strong>
                <p>Visual keyboard with buttons (Coming Soon)</p>
              </div>
            </div>

            <div className="status-item status-pending">
              <span className="status-icon">⏳</span>
              <div>
                <strong>Phase 3: Multi-Input</strong>
                <p>Context provider for multiple inputs (Coming Soon)</p>
              </div>
            </div>

            <div className="status-item status-pending">
              <span className="status-icon">⏳</span>
              <div>
                <strong>Phase 4+: Advanced Features</strong>
                <p>Selection, copy/paste, templates, modes (Coming Soon)</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Math Equation Editor v0.1.0 - Phase 1 Demo</p>
        <p>Built with React + TypeScript + KaTeX + Vite</p>
      </footer>
    </div>
  );
}

export default App;
