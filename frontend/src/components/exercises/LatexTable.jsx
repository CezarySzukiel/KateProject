import './latexTable.css';
import {useState, useRef} from 'react';
import DynamicModal from './DynamicModal';
import latexSymbols from '../../latexSymbols';
import { Latex } from './Latex'

const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

export function LatexTable(props) {
    const {activeInputRef} = props
    const columns = 10;
    const symbolChunks = chunkArray(latexSymbols, columns);
    const inputRef = useRef(null);
    const [modals, setModals] = useState([]);
    const handleSymbolClick = (symbol) => {
        const variables = symbol.match(/[{[][^}\]]+[}\]]/g) || [];
        const cleanedVariables = variables.map((variable) => variable.slice(1, -1));
        if (cleanedVariables.length > 0) {
            setModals((prevModals) => [
                ...prevModals,
                {symbol, variables: cleanedVariables, isOpen: true},
            ]);
        } else {
            props.setUserAnswer(updateInputValue(symbol, activeInputRef))
        }

    };

    const handleModalClose = (index) => {
        setModals((prevModals) => {
            const newModals = [...prevModals];
            newModals.splice(index, 1);
            return newModals;
        });
    };

    const formatSymbol = (symbol, values) => {
        let updatedSymbol = symbol.symbol;
        Object.keys(values).forEach((variable) => {
            const re = /[{[]([a-zA-Z0-9]+)[}\]]/g;
            updatedSymbol = updatedSymbol.replace(re, (match, p1) => {
                if (values[p1] !== undefined) {
                    return `{${values[p1]}}`;
                }
                return match;
            });
        });
        return updatedSymbol;
    };

    const updateInputValue = (symbol, activeInputRef) => {
        if (activeInputRef) {
            const start = activeInputRef.selectionStart;
            const end = activeInputRef.selectionEnd;
            let text = activeInputRef.value;
            text = text.slice(0, start) + symbol + text.slice(end);
            activeInputRef.value = text;
            setTimeout(() => {
                activeInputRef.setSelectionRange(start + symbol.length, start + symbol.length);
                activeInputRef.focus();
            }, 0);
            return [text]
        }
    };

    const handleModalSubmit = (index, values) => {
        console.log('values: ', values)
        const symbol = formatSymbol(modals[index], values)
        console.log('symbol: ', symbol)
        props.setUserAnswer(updateInputValue(symbol, activeInputRef))
    };

    return (
        <div className={'latex-table'}>
            <table>
                <tbody>
                {symbolChunks.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((symbol, colIndex) => (
                            <td key={colIndex} onClick={() => handleSymbolClick(symbol)}>

                                <Latex text={symbol} />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {modals.map((modal, index) => (
                <DynamicModal
                    key={index}
                    isOpen={modal.isOpen}
                    onClose={() => handleModalClose(index)}
                    onSubmit={(values) => handleModalSubmit(index, values)}
                    variables={modal.variables}
                    setActiveInput={props.setActiveInput}
                />
            ))}
        </div>
    );
};
