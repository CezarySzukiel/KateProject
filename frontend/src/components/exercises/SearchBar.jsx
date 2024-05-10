import './searchBar.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



import { getSectionsAndSubsections, extractSections, extractSubsections  } from "../../helpers"


export function SearchBar(props) {
    // const SEARCH_URL = 'http://0.0.0.0:8000/api/v1/exercises/search-by-subsections/'
    // const [isChecked1, setIsChecked1] = useState(false);
    // const [isChecked2, setIsChecked2] = useState(false);
    const [checkedSections, setCheckedSections] = useState([]);
    const [checkedSubsections, setCheckedSubsections] = useState([]);
    const [displayedSubsections, setDisplayedSubsections] = useState(null)
    const [selectedSections, setSelectedSections] = useState(null)
    const [selectedSubsections, setSelectedSubsections] = useState(null)
    const subsection_ids = checkedSubsections
    const navigate = useNavigate()

    useEffect(() => {
        setDisplayedSubsections(filterSubsectionsBySections(props.allSubsections, checkedSections));
        setSelectedSections(checkedSections);
        setSelectedSubsections(checkedSubsections);
    }, [props.allSections, props.allSubsections, checkedSections])

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
    
    const filterSubsectionsBySections = (subsections, selectedSections) => {
        if (!selectedSections.length) {
            // console.log("selectedSections.length = false, więc zwracam: ", subsections)
            return subsections;
            // return getArrIdsFromArrObjects(s)
        }
        return subsections.filter(subsection =>
            selectedSections.includes(subsection.section)
        );
    };

    // const getArrIdsFromArrObjects = (arrObjects) => {
    //     return arrObjects.map(obj => obj.id)
    // }

    const handleCheckboxChange = (sectionId) => {
        // w przypadku kliknięcia w okienko: jeśli było zaznaczone to usuń z zaznaczonych, w przeciwnym przypadku dodaj
        if (checkedSections.includes(sectionId)) {
            setCheckedSections(checkedSections.filter(id => id !== sectionId));
        } else {
            setCheckedSections([...checkedSections, sectionId]);
        }        
    };
    
    const handleSubCheckboxChange = (subSectionId) => {
        if (checkedSubsections.includes(subSectionId)) {
            setCheckedSubsections(checkedSubsections.filter(id => id !== subSectionId));
        } else {
            setCheckedSubsections([...checkedSubsections, subSectionId]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const displayedSubsectionsIds = displayedSubsections.map(obj => obj.id)
        console.log('displayedSubsectionsIds; ', displayedSubsectionsIds)
        if (checkedSubsections.length > 0) {
            const filteredSubsec = checkedSubsections.filter(subsec => displayedSubsectionsIds.includes(subsec))
            if (filteredSubsec.length) {
                props.setSelectedSubsectionIds(filteredSubsec)
            } else {
                props.setSelectedSubsectionIds(displayedSubsectionsIds)
            }
            console.log("filtered subsec: ", filteredSubsec)
        } else {
            props.setSelectedSubsectionIds(displayedSubsectionsIds)
        }

        navigate('/sections/subsections/exercises/')
        // console.log('props: ', props, 'checkedSections: ', checkedSections, 'displayedSubsections: ', displayedSubsections)
        // console.log('checkedSubsections: ', checkedSubsections, 'subsection_ids: ', subsection_ids, )

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
