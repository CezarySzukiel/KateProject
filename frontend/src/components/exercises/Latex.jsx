import './latex.css'
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';

export function Latex(props) {
    const {text} = props
    const parseText = (text) => {
        const regex = /(\$\$.*?\$\$|\$.*?\$)/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
                return <TeX key={index} math={part.slice(2, -2)}/>;
            } else if (part.startsWith('$') && part.endsWith('$')) {
                return <TeX key={index} math={part.slice(1, -1)}/>;
            } else {
                return part
            }
        });
    };
    console.log('parseText: ', parseText)
    return (
        <div className={'latex'}>
            {text && parseText(text)}
        </div>
    )
}