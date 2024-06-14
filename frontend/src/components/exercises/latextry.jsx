import React from 'react';
import Latex from 'react-latex-next';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Brush, ReferenceDot, ReferenceLine } from "recharts"

import 'katex/dist/katex.min.css';

const MathProblemDisplay = () => {

    const latexCode = "$\\frac{1}{2}$"
    const latexSymbols = `$
    \\textbf{Operatory binarne:} \\\\
    +, -, \\cdot, \\times, \\div, \\ast, \\pm, \\mp, \\oplus, \\otimes, \\cup, \\cap \\\\ \\\\
    \\textbf{Operatory relacyjne:} \\\\
    =, \\neq, \\approx, \\sim, \\leq, \\geq, <, >, \\subset, \\subseteq, \\supset, \\supseteq \\\\ \\\\
    \\textbf{Strzałki:} \\\\
    \\leftarrow, \\rightarrow, \\uparrow, \\downarrow, \\leftrightarrow, \\Leftarrow, \\Rightarrow, \\Uparrow, \\Downarrow, \\Leftrightarrow \\\\ \\\\
    \\textbf{Greckie litery:} \\\\
    \\alpha, \\beta, \\gamma, \\delta, \\epsilon, \\zeta, \\eta, \\theta, \\iota, \\kappa, \\lambda, \\mu, \\nu, \\xi, \\pi, \\rho, \\sigma, \\tau, \\upsilon, \\phi, \\chi, \\psi, \\omega \\\\ \\\\
    \\textbf{Duże litery:} \\\\
    \\Gamma, \\Delta, \\Theta, \\Lambda, \\Xi, \\Pi, \\Sigma, \\Upsilon, \\Phi, \\Psi, \\Omega \\\\ \\\\
    \\textbf{Znaki specjalne:} \\\\
    \\infty, \\partial, \\nabla, \\forall, \\exists, \\emptyset, \\mathbb{R}, \\mathbb{Q}, \\mathbb{N}, \\mathbb{Z}, \\mathbb{C} \\\\ \\\\
    \\textbf{Akcenty:} \\\\
    \\hat{x}, \\bar{x}, \\tilde{x}, \\dot{x} \\\\ \\\\
    \\textbf{Funkcje matematyczne:} \\\\
    \\sin, \\cos, \\tan, \\log, \\ln, \\exp, \\sqrt{x}, \\sum, \\prod, \\int, \\lim
  $`;
    // return (
    //     <div>
    //         <h3>Math Problem</h3>
    //         {/*<Latex>{latexSymbols}</Latex>*/}
            
    //         <h2>szukam:</h2>
    //         <Latex>{latexCode}</Latex>

    //     </div>
    // );
  const data = [{x:0, y:1},{x:1, y:1},{x:1, y:2},{x:2, y:2},{x:2, y:3},{x:3, y:3},{x:3, y:4},{x:4, y:4},{x:4, y:5},{x:5, y:5},{x:5, y:6},{x:6, y:6},{x:6, y:7},{x:7, y:7},{x:7, y:8},{x:8, y:8},{x:8, y:9},{x:9, y:9},]


  return (
    <LineChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="1 6" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <ReferenceLine />
      <Line type="step" dataKey="y" stroke="#8884d8"  dot={false} />
    </LineChart>
  );
};

export default MathProblemDisplay;