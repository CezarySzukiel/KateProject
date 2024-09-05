import './latexTable.css';
import {useEffect, useState} from 'react';
import DynamicModal from './DynamicModal';
import '../../latexSymbols.json';
import {Latex} from './Latex'
import axios from "axios";


const chunkArray = (array, chunkSize) => {
    /**
     * Chunk an array into array of smaller arrays of a specified size.
     * @param {Array} array - The array to chunk.
     * @param {number} chunkSize - The size of each chunk.
     */
    const chunks = [];
    try {
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    } catch (error) {
        console.error('Error chunking array:', error);
        return error;
    }
};

const fetchLatexSymbols = async () => {
    /**
     * Fetch the latexSymbols.json file.
     */
    try {
        const response = await axios.get('/src/latexSymbols.json');
        return (response.data);
    } catch (error) {
        console.error('Error fetching latexSymbols:', error);
        return error;
    }
};

const getSymbolsObject = (data, type) => {
    /**
     * Get the symbols object with specified type from the data.
     * @param {Array} data - The data to search.
     * @param {string} type - The type of symbols to search for.
     */
    try {
        const symbolsObject = data.find(obj => obj.type === type);
        return symbolsObject.symbols
    } catch (error) {
        console.error('Error getting symbols object:', error);
        return error;
    }
}

export function LatexTable(props) {
    const {activeInputRef} = props
    const columns = 10;
    const [modals, setModals] = useState([]);
    const [formulaSymbols, setFormulaSymbols] = useState([]);
    const [systemOfEquationsSymbols, setSystemOfEquationsSymbols] = useState([]);
    const [greekSmallSymbols, setGreekSmallSymbols] = useState([]);
    const [greekCapitalSymbols, setGreekCapitalSymbols] = useState([]);
    const [relationSymbols, setRelationSymbols] = useState([]);
    const [operatorSymbols, setOperatorSymbols] = useState([]);
    const [operatorBigSymbols, setOperatorBigSymbols] = useState([]);
    const [arrowSymbols, setArrowSymbols] = useState([]);
    const [functionSymbols, setFunctionSymbols] = useState([]);
    const [symbolSymbols, setSymbolSymbols] = useState([]);
    const [lastUsedSymbols, setLastUsedSymbols] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState([]);
    const [stateLabels, setStateLabels] = useState(null);
    const [tempLastUsedSymbols, setTempLastUsedSymbols] = useState([]);

    useEffect(() => {
        fetchLatexSymbols().then((data) => {
            /**
             * Get the symbols object from the data and set the state symbols.
             */
            const formula = getSymbolsObject(data, 'formula');
            const systemOfEquations = getSymbolsObject(data, 'systemOfEquations');
            const greekSmall = getSymbolsObject(data, 'greekSmall');
            const greekCapital = getSymbolsObject(data, 'greekCapital');
            const relation = getSymbolsObject(data, 'relation');
            const operator = getSymbolsObject(data, 'operator');
            const operatorBig = getSymbolsObject(data, 'operatorBig');
            const arrow = getSymbolsObject(data, 'arrow');
            const function_ = getSymbolsObject(data, 'function');
            const symbol = getSymbolsObject(data, 'symbol');
            setFormulaSymbols(chunkArray(formula, columns));
            setSystemOfEquationsSymbols(chunkArray(systemOfEquations, columns));
            setGreekSmallSymbols(chunkArray(greekSmall, columns));
            setGreekCapitalSymbols(chunkArray(greekCapital, columns));
            setRelationSymbols(chunkArray(relation, columns));
            setOperatorSymbols(chunkArray(operator, columns));
            setOperatorBigSymbols(chunkArray(operatorBig, columns));
            setArrowSymbols(chunkArray(arrow, columns));
            setFunctionSymbols(chunkArray(function_, columns));
            setSymbolSymbols(chunkArray(symbol, columns));
        });
        setSelectedLabel(greekSmallSymbols);
    }, []);

    useEffect(() => {
        /**
         * Set the state labels for the table.
         */
        setStateLabels([
            {"state": lastUsedSymbols, "label": "Ostatnio używane"},
            {"state": formulaSymbols, "label": "Formuły matematyczne"},
            {"state": systemOfEquationsSymbols, "label": "Układy równań"},
            {"state": greekSmallSymbols, "label": "Małe litery greckie"},
            {"state": greekCapitalSymbols, "label": "Duże litery greckie"},
            {"state": relationSymbols, "label": "Relacje"},
            {"state": operatorSymbols, "label": "Operatory"},
            {"state": operatorBigSymbols, "label": "Duże operatory"},
            {"state": arrowSymbols, "label": "Strzałki"},
            {"state": functionSymbols, "label": "Funkcje"},
            {"state": symbolSymbols, "label": "Symbole"},
        ]);
    }, [
        formulaSymbols,
        systemOfEquationsSymbols,
        greekSmallSymbols,
        greekCapitalSymbols,
        relationSymbols,
        operatorSymbols,
        operatorBigSymbols,
        arrowSymbols,
        functionSymbols,
        symbolSymbols
    ]);

    useEffect(() => {
        /**
        * set selected label to formula symbols if no label is selected (first render)
         */
        if (selectedLabel.length === 0 && formulaSymbols.length > 0) {
            console.log("ustawiam selected label na formuły matematyczne")
            setSelectedLabel(formulaSymbols);
        }
    }, [formulaSymbols]);

    useEffect(() => {
        /**
         * Set the chunked array of last used symbols.
         */
        setLastUsedSymbols(chunkArray(tempLastUsedSymbols, columns));
    }, [tempLastUsedSymbols]);

    useEffect(() => {
        /**
         * Update the last used symbols state label. it is needed to properly display the last used symbols in the table.
         */
        setStateLabels((prevLabels) => {
            return prevLabels.map(label =>
                label.label === "Ostatnio używane"
                    ? {...label, state: lastUsedSymbols}
                    : label
            );

        });
    }, [lastUsedSymbols]);

    const handleSymbolClick = (symbol) => {
        setTempLastUsedSymbols((prevLastUsedSymbols) => {
            const updatedSymbols = [symbol, ...prevLastUsedSymbols];
            return Array.from(new Set(updatedSymbols));
        });
        const variables = symbol.match(/\{[a-zA-Z0-9]\}|\[[a-zA-Z0-9]\]/g) || [];
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

    const handleLabelClick = (state) => {
        /**
         * Set the selected label to the state of the clicked label.
         * The selected label is mapped to the table with symbols.
         * @param {Array} state - The state of the clicked label.
         */
        setSelectedLabel(state);
    }

    const handleModalClose = (index) => {
        setModals((prevModals) => {
            const newModals = [...prevModals];
            newModals.splice(index, 1);
            return newModals;
        });
    };

    const formatSymbol = (symbol, values) => {
        let updatedSymbol = symbol.symbol;
        Object.keys(values).forEach(() => {
            const re = /[{[]([a-zA-Z0-9])[}\]]/g;
            updatedSymbol = updatedSymbol.replace(re, (match, p1) => {
                if (values[p1] !== undefined) {
                    console.log('match', match.slice(1, -1))
                    console.log('values[p1]', values[p1])
                    return match.replace(match.slice(1, -1), values[p1])
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
        const symbol = formatSymbol(modals[index], values)
        props.setUserAnswer(updateInputValue(symbol, activeInputRef))
    };

    return (
        <div className={'latex-table'}>
            <div className={"labels"}>
                {stateLabels && stateLabels.map((obj, labelIndex) => (
                    <p
                        className={selectedLabel === obj.state ? "selected-label" : ""}
                        key={labelIndex} onClick={() => handleLabelClick(obj.state)}
                    >
                        {obj.label}
                    </p>
                ))}
            </div>
            <table>
                {selectedLabel && selectedLabel.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((symbol, colIndex) => (
                            <td key={colIndex} onClick={() => handleSymbolClick(symbol)}>
                                <Latex text={symbol}></Latex>
                            </td>
                        ))}
                    </tr>
                ))}
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

}
