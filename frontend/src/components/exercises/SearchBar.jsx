import './searchBar.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { getSectionsAndSubsections } from "../../helpers"


export function SearchBar(props) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [checkedSections, setCheckedSections] = useState([]);
    const [checkedSubSections, setCheckedSubSections] = useState([]);
    const [displayedSubsections, setDisplayedSubsections] = useState(null)
    const [selectedSections, setSelectedSections] = useState(null)
    const [selectedSubsections, setSelectedSubsections] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getSectionsAndSubsections();
                const sections = extractSections(response);
                const subsections = extractSubsections(response);
                props.setAllSections(sections);
                props.setAllSubsections(subsections);
            } catch (error) {
                console.error(error);
            }
        }
        if (!props.allSections || !props.allSubsections) {
            getData()
        }
        if (checkedSections.length == 0) {

        }

    }, [props.allSections, props.allSubsections])

    const handleCheckboxChange = (sectionId) => {
        // w przypadku kliknięcia w okienko: jeśli było zaznaczone to usuń z zaznaczonych, w przeciwnym przypadku dodaj
        if (checkedSections.includes(sectionId)) {
            setCheckedSections(checkedSections.filter(id => id !== sectionId));
        } else {
            setCheckedSections([...checkedSections, sectionId]);
        }
    };
    
    // problem: filtrowanie poddziałów tak, aby wyświetlały się tylko te,
    // dla których sekcje są zaznaczone.

    // następnie w handle submit ma wysłać zapytanie o zadania tylko dla tych subsections, 
    // które są zaznaczone. 
    // Jeśli żadne sections nie są zaznaczone, zapytaj o wszystkie displayedSections

    // algorytm: po kliknięciu w jakąś sec dodaje się ona do checkedSections.
    // displayedSubsections to maja byc odfiltrowane props.AllSubsections, w tym celu:
    // przeiteruj wszystkie props.allSubsections, jeśli props.AllSubsections.section 
    // znajduje się w checkedSections dodaj go (cały obiekt z props.allSubsections) 
    // do displayedSubsections.
    // jeśli checkedSections.length == 0 dodaj wszystkie props.AllSubsections 
    // do displayedSubsections
    // w komponencie wyświetl displayedSubsections, zamiast props.allSubsections

     const handleSubCheckboxChange = (subSectionId) => {
        if (checkedSubSections.includes(subSectionId)) {
            setCheckedSubSections(checkedSubSections.filter(id => id !== subSectionId));
        } else {
            setCheckedSubSections([...checkedSubSections, subSectionId]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkedSections.length === 0 && props.allSections) {
            const allSectionIds = props.allSections.map(section => section.id);
            setCheckedSections(allSectionIds);
        }
        if (checkedSubSections.length === 0 && props.allSubsections) {
            const allSubSectionIds = props.allSubsections.map(subsection => subsection.id);
            setCheckedSubSections(allSubSectionIds);
        }
            console.log(props)
    }    

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
                                checked={checkedSections.includes(section.id)}
                                onChange={() => handleCheckboxChange(section.id)}
                            />
                        </label>

                    </div>
                ))}
                <br />
                <p>Poddziały:</p>
                {props.allSubsections && props.allSubsections.map(subsection => (
                    <div key={subsection.id}>
                        <label>
                            {subsection.name}:
                            <input
                                type="checkbox"
                                checked={checkedSubSections.includes(subsection.id)}
                                onChange={() => handleSubCheckboxChange(subsection.id)}
                            />
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}
