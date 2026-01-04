import { useState } from 'react';
import { MathInput, MathKeyboard, MathProvider } from 'mathex';
import './App.css';

function App() {
  const [latex1, setLatex1] = useState('x^2 + 3x + 1');
  const [latex2, setLatex2] = useState('\\frac{a}{b}');
  const [latex3, setLatex3] = useState('\\sin(\\theta)');

  return (
    <MathProvider theme="light">
      <div className="app">
        <header className="app-header">
          <h1>Mathex - Demo App</h1>
          <p>A Desmos-like math equation editor for React</p>
        </header>

        <main className="app-content">
          <section className="demo-section">
            <h2>Math Input Examples</h2>

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
            <h3>📋 Project Status: Phase 0 Complete</h3>
            <p>✅ Project structure set up</p>
            <p>✅ Dependencies installed</p>
            <p>✅ TypeScript configured</p>
            <p>⏳ Next: Phase 1 - Implement MathInput with KaTeX</p>
          </section>
        </main>

        <MathKeyboard mode="basic" />
      </div>
    </MathProvider>
  );
}

export default App;
