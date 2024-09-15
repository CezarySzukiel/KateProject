import './latexTable.css';
import {useState, useRef, useEffect} from 'react';
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
    const inputRef = useRef(null);
    const [modals, setModals] = useState([]);
    const [formulaSymbols, setFormulaSymbols] = useState([]);
    const [systemOfEquationsSymbols, setSystemOfEquationsSymbols] = useState([]);
    const [matricesSymbols, setMatricesSymbols] = useState([]);
    const [greekSmallSymbols, setGreekSmallSymbols] = useState([]);
    const [greekCapitalSymbols, setGreekCapitalSymbols] = useState([]);
    const [relationSymbols, setRelationSymbols] = useState([]);
    const [operatorSymbols, setOperatorSymbols] = useState([]);
    const [operatorBigSymbols, setOperatorBigSymbols] = useState([]);
    const [arrowSymbols, setArrowSymbols] = useState([]);
    const [functionSymbols, setFunctionSymbols] = useState([]);
    const [symbolSymbols, setSymbolSymbols] = useState([]);
    const [lastUsedSymbols, setLastUsedSymbols] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(() => greekSmallSymbols);
    const [stateLabels, setStateLabels] = useState(null);

    useEffect(() => {
        fetchLatexSymbols().then((data) => {
            // const formula = getSymbolsObject(data, 'formula');
            // const systemOfEquations = getSymbolsObject(data, 'systemOfEquations');
            // const matrices = getSymbolsObject(data, 'matrices');
            // const greekSmall = getSymbolsObject(data, 'greekSmall');
            // const greekCapital = getSymbolsObject(data, 'greekCapital');
            // const relation = getSymbolsObject(data, 'relation');
            // const operator = getSymbolsObject(data, 'operator');
            // const operatorBig = getSymbolsObject(data, 'operatorBig');
            // const arrow = getSymbolsObject(data, 'arrow');
            // const function_ = getSymbolsObject(data, 'function');
            // const symbol = getSymbolsObject(data, 'symbol');
            // setFormulaSymbols(chunkArray(formula, columns));
            // setSystemOfEquationsSymbols(chunkArray(systemOfEquations, columns));
            // setMatricesSymbols(chunkArray(matrices, columns));
            // setGreekSmallSymbols(chunkArray(greekSmall, columns));
            // setGreekCapitalSymbols(chunkArray(greekCapital, columns));
            // setRelationSymbols(chunkArray(relation, columns));
            // setOperatorSymbols(chunkArray(operator, columns));
            // setOperatorBigSymbols(chunkArray(operatorBig, columns));
            // setArrowSymbols(chunkArray(arrow, columns));
            // setFunctionSymbols(chunkArray(function_, columns));
            // setSymbolSymbols(chunkArray(symbol, columns));
            setFormulaSymbols(getSymbolsObject(data, 'formula'));
            setSystemOfEquationsSymbols(getSymbolsObject(data, 'systemOfEquations'));
            setMatricesSymbols(getSymbolsObject(data, 'matrices'));
            setGreekSmallSymbols(getSymbolsObject(data, 'greekSmall'));
            setGreekCapitalSymbols(getSymbolsObject(data, 'greekCapital'));
            setRelationSymbols(getSymbolsObject(data, 'relation'));
            setOperatorSymbols(getSymbolsObject(data, 'operator'));
            setOperatorBigSymbols(getSymbolsObject(data, 'operatorBig'));
            setArrowSymbols(getSymbolsObject(data, 'arrow'));
            setFunctionSymbols(getSymbolsObject(data, 'function'));
            setSymbolSymbols(getSymbolsObject(data, 'symbol'));
        });

    }, []);

    useEffect(() => {
        if (stateLabels) {
            console.log("selectedLabel", selectedLabel)
            setSelectedLabel(greekSmallSymbols);
            console.log("stateLabel[4]", stateLabels[4].state)
        }
    }, [stateLabels]);

    useEffect(() => {
        setStateLabels([
            {"state": lastUsedSymbols, "label": "Ostatnio używane"},
            {"state": formulaSymbols, "label": "Formuły matematyczne"},
            {"state": systemOfEquationsSymbols, "label": "Układy równań"},
            {"state": matricesSymbols, "label": "Tablice, macierze"},
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
        lastUsedSymbols,
        formulaSymbols,
        systemOfEquationsSymbols,
        matricesSymbols,
        greekSmallSymbols,
        greekCapitalSymbols,
        relationSymbols,
        operatorSymbols,
        operatorBigSymbols,
        arrowSymbols,
        functionSymbols,
        symbolSymbols
    ]);

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

    const handleLabelClick = (state) => {
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
        const symbol = formatSymbol(modals[index], values)
        props.setUserAnswer(updateInputValue(symbol, activeInputRef))
    };

    return (
        <div className={'latex-table'}>
            <table>
                <tbody>
                {stateLabels && stateLabels.map((obj, labelIndex) => (
                    <tr key={labelIndex}>
                        <th onClick={() => handleLabelClick(obj.state)}>{obj.label}</th>
                        {Array.from({length: columns}).map((_, colIndex) => (
                            <td key={labelIndex * columns + colIndex}>
                                {selectedLabel && <Latex text={selectedLabel[labelIndex * columns + colIndex]}></Latex>}
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
    )
        ;
};
