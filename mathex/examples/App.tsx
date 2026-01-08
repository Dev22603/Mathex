import { useState } from 'react';
import { MathInput, MathKeyboard, MathProvider } from 'mathex';
import './App.css';

function App() {
  const [latex1, setLatex1] = useState('x^2 + 3x + 1');
  const [latex2, setLatex2] = useState('\\frac{a}{b}');
  const [latex3, setLatex3] = useState('\\sin(\\theta)');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <MathProvider theme={theme}>
      <div className="app">
        <header className="app-header">
          <div>
            <h1>Mathex - Demo App</h1>
            <p>A Desmos-like math equation editor for React</p>
          </div>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>

        <main className="app-content">
          <section className="demo-section">
            <h2>Math Input Examples</h2>
            <p className="demo-hint">Click on an input field, then use the keyboard at the bottom to insert symbols</p>

            <div className="input-example">
              <label>Equation 1:</label>
              <MathInput
                value={latex1}
                onChange={setLatex1}
                placeholder="Enter equation..."
              />
              <code className="latex-display">LaTeX: {latex1}</code>
            </div>

            <div className="input-example">
              <label>Equation 2:</label>
              <MathInput
                value={latex2}
                onChange={setLatex2}
                placeholder="Enter equation..."
              />
              <code className="latex-display">LaTeX: {latex2}</code>
            </div>

            <div className="input-example">
              <label>Equation 3:</label>
              <MathInput
                value={latex3}
                onChange={setLatex3}
                placeholder="Enter equation..."
              />
              <code className="latex-display">LaTeX: {latex3}</code>
            </div>
          </section>

          <section className="info-section">
            <h3>Keyboard Features</h3>
            <ul>
              <li>Click the keyboard icon at the bottom-left to toggle</li>
              <li>Click "ABC" to switch to letter mode</li>
              <li>Click "functions" to access math functions</li>
              <li>Click outside the keyboard to close it</li>
            </ul>
          </section>
        </main>

        {/* Desmos-style Math Keyboard */}
        <MathKeyboard />
      </div>
    </MathProvider>
  );
}

export default App;
