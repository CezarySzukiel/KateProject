import './searchBar.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { getSectionsAndSubsections, extractSections, extractSubsections  } from "../../helpers"


export function SearchBar(props) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [checkedSections, setCheckedSections] = useState([]);
    const [checkedSubsections, setCheckedSubsections] = useState([]);
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
        setDisplayedSubsections(filterSubsectionsBySections(props.allSubsections, checkedSections));
        setSelectedSections(checkedSections);
        setSelectedSubsections(checkedSubsections);

    }, [props.allSections, props.allSubsections, checkedSections])

    const handleCheckboxChange = (sectionId) => {
        // w przypadku kliknięcia w okienko: jeśli było zaznaczone to usuń z zaznaczonych, w przeciwnym przypadku dodaj
        if (checkedSections.includes(sectionId)) {
            setCheckedSections(checkedSections.filter(id => id !== sectionId));
        } else {
            setCheckedSections([...checkedSections, sectionId]);
        }
        // subsections filtering:
        
    };
    
    const filterSubsectionsBySections = (subsections, selectedSections) => {
    if (!selectedSections.length) {
        // console.log("selectedSections.length = false, więc zwracam: ", subsections)
        return subsections;
    }
    return subsections.filter(subsection =>
        selectedSections.includes(subsection.section)
    );
};
    // problem: filtrowanie poddziałów tak, aby wyświetlały się tylko te,
    // dla których sekcje są zaznaczone.

    // następnie w handle submit ma wysłać zapytanie o zadania tylko dla tych subsections, 
    // które są zaznaczone. 
    // Jeśli żadne sections nie są zaznaczone, zapytaj o wszystkie displayedSections

     const handleSubCheckboxChange = (subSectionId) => {
        if (checkedSubsections.includes(subSectionId)) {
            setCheckedSubsections(checkedSubsections.filter(id => id !== subSectionId));
        } else {
            setCheckedSubsections([...checkedSubsections, subSectionId]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (checkedSections.length === 0 && props.allSections) {
            const allSectionIds = props.allSections.map(section => section.id);
            // setCheckedSections(allSectionIds);
        }
        if (checkedSubsections.length === 0 && props.allSubsections) {
            const allSubsectionIds = props.allSubsections.map(subsection => subsection.id);
            // setCheckedSubsections(allSubsectionIds);
        }
        console.log('props: ', props, 'checkedSections: ', checkedSections, 'displayedSubsections: ', displayedSubsections)
        console.log('checkedSubsections: ', checkedSubsections)
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
                {displayedSubsections && displayedSubsections.map(subsection => (
                    <div key={subsection.id}>
                        <label>
                            {subsection.name}:
                            <input
                                type="checkbox"
                                checked={checkedSubsections.includes(subsection.id)}
                                onChange={() => handleSubCheckboxChange(subsection.id)}
                            />
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}
