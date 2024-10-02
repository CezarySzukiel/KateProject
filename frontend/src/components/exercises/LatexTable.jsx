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
     * @returns {Array} - The chunked array.
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
     * @returns {Array} - The symbols object.`
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
    const {activeInputRef, setUserAnswer, setActiveInput} = props
    const columns = 8;
    const lastUsedSymbolsLimit = columns * 8;
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
        /**
         * Get the symbols object from the data and set the state symbols.
         */
        fetchLatexSymbols().then((data) => {
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

    useEffect(() => {
        /**
         * sets the appropriate active input.
         * Active input is the input in which the symbol can be currently inserted
         */
        const penultimateModalinputRef = modals[modals.length - 2]?.inputRef;
        console.log("wchodzę w useeffect gdzie jest sprawdzenie i ewentualnie aktualizacja stanu modali")
        if (penultimateModalinputRef && penultimateModalinputRef !== activeInputRef) {
            console.log('sprawdziłem i ustawiam penultimateModalinputRef na: ', penultimateModalinputRef);
            setActiveInput(penultimateModalinputRef);
        } // else { setActiveInput(activeInputRef) } // todo to miała być dalsza część kodu która ustawia active input na textarea
    //     todo po zaktualizowaniu activeInputRef o nową wartość stan modali jest aktualizowany ponownie, chyba o starą wartość i to może być powodem nie przekazywania wartości.
    //     todo dodaj warunek jeśłi penultimateModalinputRef to textarea to ustaw activeInputRef na textarea. to nie będzie poprawne w przypadku większej ilości zagnieżdżonych okienek, ale pozwoli sprawdzić czy to jest przyczyną, czy jeszcze nie.
    //     todo do tego przenieś cl do wewnątrz ifa aby mieć pewność czy warunek się spełnia, czy tylko sprawdza.
    }, [modals.length])

    const updateInputValue = (symbol, activeInputRef) => {
    /**
     * checks the position of the cursor or text selection and inserts a symbol in its place.
     * @param {string} symbol - The symbol to insert.
     * @param {Object} activeInputRef - The reference to the active input element.
     * @returns {Object} - The reference to the active input element with updated value.
     */
    if (activeInputRef) {
        const start = activeInputRef.selectionStart;
        const end = activeInputRef.selectionEnd;
        let text = activeInputRef.value;
        text = text.slice(0, start) + symbol + text.slice(end);
        console.log('text w update input value', text)
        activeInputRef.value = text; // activeInputRef.value to jest cały symbol ze wpisaną wartością
        console.log('activeInputRef.value', activeInputRef.value) // value to ${alamakota}^{} $ z drugiego modala
        setTimeout(() => {
            activeInputRef.setSelectionRange(start + symbol.length, start + symbol.length);
            activeInputRef.focus();
        }, 0);
        return activeInputRef // zwracam activeInputRef pierwszego modala z nową wartością value przypisaną z drugiego modala (potwierdzone debugowaniem)
    }
};

    const handleSymbolClick = (symbol) => {
        /**
         * adds the symbol to the most recently used and:
         * if there are variables, sets a modal window
         * or immediately passes the symbol to the active input if there are no variables
         */
        setTempLastUsedSymbols((prevLastUsedSymbols) => {
            const updatedSymbols = [symbol, ...prevLastUsedSymbols];
            return Array.from(new Set(updatedSymbols)).slice(0, lastUsedSymbolsLimit);
        });
        const variables = symbol.match(/\{[a-zA-Z0-9]\}|\[[a-zA-Z0-9]\]/g) || [];
        const cleanedVariables = variables.map((variable) => variable.slice(1, -1));
        // todo dodaj warunek jeśli !cleanedVariables && modals.length > 0 to znak dodaj do aktywnego inputa w ostatnim modalu
        if (cleanedVariables.length > 0) {
            setModals((prevModals) => [
                ...prevModals,
                {id: modals.length + 1, symbol: symbol, variables: cleanedVariables, isOpen: true, inputRef: null},
            ]);
        } else {
            console.log('activeInputRef', activeInputRef)
            setUserAnswer(updateInputValue(symbol, activeInputRef))
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
        /**
         * changes the values of variables in the symbol to those given by the user
         * @param {string} symbol - The symbol to format.
         * @param {array} values - The values to insert.
         * @returns {string} - The formatted symbol.
         */
        let updatedSymbol = symbol.symbol;
        console.log('values', values)
        console.log('symbol', symbol)
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


    const handleModalSubmit = (index, values) => {
        const symbol = formatSymbol(modals[index], values);
        // setUserAnswer(updateInputValue(symbol, activeInputRef))
        const updatedInput = updateInputValue(symbol, activeInputRef)
        // todo błąd bo ustawia userAnswer wiec ta wartość będzie zawsze trafiała do textarea w type9, nawet jeśłi będzie miała trafić do inputa
    //     todo drugi input ref przekazuje poprawnie znak, ale do textarea a nie do inputa,
    //     todo poza tym po zamknięciu modala zmienia się penultimateModalinputRef na undefined, ale active input ref nie zmienia się automatycznie na textarea
    //     jak więc zaktualizować wartość aktywnego inputa w przedostatnim modalu?  penultimateModalinputRef ustawia się poprawnie
    //     użyj setActiveInput do zaktualizowania activeInput o nową wartość pola value
        setActiveInput(updatedInput)
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
                <tbody>
                {selectedLabel && selectedLabel.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((symbol, colIndex) => (
                            <td key={colIndex} onClick={() => handleSymbolClick(symbol)}>
                                <Latex text={symbol}></Latex>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {modals.map((modal, index) => (
                <DynamicModal
                    key={index}
                    modals={modals}
                    setModals={setModals}
                    modal={modal}
                    onClose={() => handleModalClose(index)}
                    onSubmit={(values) => handleModalSubmit(index, values)}
                    setActiveInput={setActiveInput}
                />
            ))}

        </div>
    );

}
