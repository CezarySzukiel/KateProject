import './searchBar.css'
import React, { useState } from 'react';

export function SearchBar(props) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [selectedSections, setSelectedSections] = useState([]);

    const handleCheckboxChange = (sectionId) => {
        if (selectedSections.includes(sectionId)) {
            setSelectedSections(selectedSections.filter(id => id !== sectionId));
        } else {
            setSelectedSections([...selectedSections, sectionId]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (selectedSections.length === 0 && props.allSections) {
            const allSectionIds = props.allSections.map(section => section.id);
            setSelectedSections(allSectionIds);
        }
        console.log('działa', selectedSections, 'oraz', props)
    }

    const getExercises

    const handleCheckbox2Change = () => {
        setIsChecked2(!isChecked2);
    };

    return (
        <div className={'searchbar-div'}>
            <form onSubmit={handleSubmit}>
                <button type="submit">Wyszukaj</button>
                <p>działy</p>
                {props.allSections && props.allSections.map(section => (
                    <div key={section.id}>
                        <label >
                            {section.name}:
                            <input
                                type="checkbox"
                                checked={selectedSections.includes(section.id)}
                                onChange={() => handleCheckboxChange(section.id)}
                            />
                        </label>
                    </div>
                ))}
                <br />
                <label>
                    Poddziały:
                    <input
                        type="checkbox"
                        checked={isChecked2}
                        onChange={handleCheckbox2Change}
                    />
                </label>
            </form>
        </div>
    );
}
