import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

const DynamicModal = ({ isOpen, onClose, onSubmit, variables, setActiveInput }) => {
  const [values, setValues] = useState(() => {
    return variables.reduce((acc, variable) => {
      acc[variable] = '';
      return acc;
    }, {});
  });
  const inputRef = useRef(null);

  const handleChange = (e, variable) => {
    setValues({
      ...values,
      [variable]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };
  
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <h3>Podaj wartości</h3>
      {variables.map((variable) => (
        <div key={variable}>
          <label>
            {variable}:
            <input
              ref={inputRef}
              type="text"
              value={values[variable]}
              onChange={(e) => handleChange(e, variable)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Zatwierdź</button>
      <button onClick={onClose}>Anuluj</button>
    </div>,
    document.getElementById('modal-root')
  );
};

export default DynamicModal;
