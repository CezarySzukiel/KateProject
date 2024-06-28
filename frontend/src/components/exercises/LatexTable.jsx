import './latexTable.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Latex from 'react-latex-next';
import DynamicModal from './DynamicModal';
import latexSymbols from '../../latexSymbols';
// import handleChange from './AnswerInputs';
// import { insertAtCaret } from './helpers';
import { reformatAnswer } from './AnswerInputs';

import { connect } from 'react-redux';
import { setActiveInput } from '../../actions/exActions';

const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export function LatexTable(props) {
	// console.log('props', props)
	const { activeInputRef } = props
  // const { setRef, insertAtCaret } = useCaret();
  const columns = 10;
  const symbolChunks = chunkArray(latexSymbols, columns);

  const inputRef = useRef(null); //wywalić

  const [modals, setModals] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // useEffect(() => { //wywalić
	// 	console.log('activeInputRef: ', activeInputRef)
	// 	// inputRef = activeInputRef
  // }, [activeInputRef])

  const handleSymbolClick = (symbol) => {
    console.log('activeInputRef: ', activeInputRef)
    // todo usuwać modale po zakończonej akcji
    const variables = symbol.match(/[{[][^}\]]+[}\]]/g) || [];
    const cleanedVariables = variables.map((variable) => variable.slice(1, -1));
    setModals((prevModals) => [
      ...prevModals,
      { symbol, variables: cleanedVariables, isOpen: true },
    ]);
  };

  const handleModalClose = (index) => {
    setModals((prevModals) => {
      const newModals = [...prevModals];
      newModals[index].isOpen = false;
      return newModals;
    });
  };

  const handleModalSubmit = (index, values) => {
    const { symbol } = modals[index];
    let updatedSymbol = symbol;
    Object.keys(values).forEach((variable) => {
      const re = /[{[]([a-zA-Z0-9]+)[}\]]/g;
      updatedSymbol = updatedSymbol.replace(re, (match, p1) => {
        if (values[p1] !== undefined) {
          return `{${values[p1]}}`;
        }
        return match;
      });
    });
    // todo dodać obsługę wstawiania znaków do wyskakującego okienka
    // todo dodać warunki, aby tablica znaków wyświetlała się tylko w type9
    // todo dodać aktualizację stanu, tak aby odrazu po dodaniu znaku wyświetlał się pod spodem
    if (activeInputRef) {
      // console.log("no tu jest", activeInputRef, updatedSymbol);
      // console.log('insertAtCaret', activeInputRef);
      // console.log('inputRef.value: ', activeInputRef.value)
      const start = activeInputRef.selectionStart;
      const end = activeInputRef.selectionEnd;
      let text = activeInputRef.value;
      // text = text.replace(/\$/g, '');
      text = text.slice(0, start) + updatedSymbol + text.slice(end);
  		// text = `$${text}$`;
      console.log('activeInputRef: ', activeInputRef.value, 'oraz text: ', text)
      text = reformatAnswer(text)
      activeInputRef.value = text;
      setTimeout(() => {
        activeInputRef.setSelectionRange(start + updatedSymbol.length, start + updatedSymbol.length);
        activeInputRef.focus();
      }, 0);

      props.setUserAnswer([text])
    }

  };

  const handleFocus = () => { // todo wywalić?
  	props.setActiveInput(inputRef.current);
  }

  return (
    <div>
      <textarea
        ref={inputRef}
        onFocus={handleFocus}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Type your LaTeX here..."
      />
      <table>
        <tbody>
          {symbolChunks.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((symbol, colIndex) => (
                <td key={colIndex} onClick={() => handleSymbolClick(symbol)}>
                  <Latex>{symbol}</Latex>
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
        />
      ))}
    </div>
  );
};
