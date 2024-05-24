import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const MathProblemDisplay = () => {

    const latexCode = `$a=(\\sqrt{3}-\\sqrt{2})^{2}-2\\sqrt{6}$`
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
    return (
        <div>
            <h3>Math Problem</h3>
            {/*<Latex>{latexSymbols}</Latex>*/}
            
            <h2>szukam:</h2>
            <Latex>{latexCode}</Latex>

        </div>
    );
};

export default MathProblemDisplay;