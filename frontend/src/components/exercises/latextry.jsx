import React from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const MathProblemDisplay = () => {

    const latexCode = "Aby łąć $\left(2x^{2}-\frac{11}{2}x+\frac{y}{2}\right)^{2}$ by{\l}o kwadratem zupe{\l}nym musi zachodzi\'c r\'ownno\'s\'c $$\left(46+\frac{11}{2}y\right)^{2}-4\left(\frac{89}{4}+2y\right)\cdot \left(20+\frac{y^{2}}{4}\right)=0$$$$\left(46+\frac{11}{2}y\right)^{2}=\left(80+y^{2}\right)\cdot \left(\frac{89}{4}+2y\right)$$$$2116+506y+\frac{121}{4}y^{2}=\frac{89}{4}y^{2}+2y^{3}+\frac{7120}{4}+160y$$$$2y^{3}+\frac{89}{4}y^{2}-\frac{121}{4}y^{2}+160y-506y+1780-2116=0$$$$2y^{3}-8y^{2}-346y-336=0$$$$y^{3}-4y^{2}-173y-168=0$$"
    return (
        <div>
            <h3>Math Problem</h3>
            <Latex>{latexCode}</Latex>
        </div>
    );
};

export default MathProblemDisplay;