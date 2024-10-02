import {useState, useRef} from 'react';
import ReactDOM from 'react-dom';

const DynamicModal = ({onClose, onSubmit, setActiveInput, modal, modals, setModals}) => {
    const [activeInputLocal, setActiveInputLocal] = useState(null);
    const [values, setValues] = useState(() => {
        return modal.variables.reduce((acc, variable) => {
            acc[variable] = '';
            return acc;
        }, {});
    });
    const inputRefs = useRef({});

    const handleChange = (e, variable) => {
        console.log('handleChange', e);
        setValues({
            ...values,
            [variable]: e.target.value,
        });
    };

    const handleFocus = (variable) => {
        /**
         * updates reference to active input for this modal in LatexTable modals state
         */
        console.log('variable', variable);
        const thisModal = modals.find((m) => m.id === modal.id);
        thisModal.inputRef = inputRefs.current[variable];
        console.log('thisModal', thisModal);
        setModals((prevModals) =>
            prevModals.map((m) =>
                m.id === modal.id ? {...m, inputRef: inputRefs.current[variable]} : m
            )
        );
    }
    // w latextable odwołać się do poprzedniego modala i jego inputa do wstawiania tekstu

    const handleSubmit = () => {
        onSubmit(values);
        onClose();
    };

    if (!modal.isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal">
            <h3>Podaj wartości</h3>
            {modal.variables.map((variable) => ( // tutaj jest mapowany stan zmiennych z modal
                <div key={variable}>
                    <label>
                        {variable}:
                        <input
                            key={`${modal.id}${variable}`} // (może usunąć key żeby się zrenderowało ponownie z nową wartością?) albo zamienić na id? sprawdzono, nie pomaga
                            ref={(el) => inputRefs.current[variable] = el}
                            type="text"
                            value={values[variable]}
                            onFocus={() => handleFocus(variable)}
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
