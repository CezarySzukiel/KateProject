import './searchBar.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";



import { getSectionsAndSubsections, extractSections, extractSubsections  } from "../../helpers"


export function SearchBar(props) {
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
            return subsections;
        }
        return subsections.filter(subsection =>
            selectedSections.includes(subsection.section)
        );
    };

    const handleCheckboxChange = (sectionId) => {
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
        if (checkedSubsections.length > 0) {
            const filteredSubsec = checkedSubsections.filter(subsec => displayedSubsectionsIds.includes(subsec))
            if (filteredSubsec.length) {
                props.setSelectedSubsectionIds(filteredSubsec)
            } else {
                props.setSelectedSubsectionIds(displayedSubsectionsIds)
            }
        } else {
            props.setSelectedSubsectionIds(displayedSubsectionsIds)
        }

        navigate('/sections/subsections/exercises/')
    }    

    return (
        <div className={'searchbar-div'}>
            <form onSubmit={handleSubmit}>
                <button type="submit">Wyszukaj</button>
                <h3>działy:</h3>
                {props.allSections && props.allSections.map((section, index) => (
                    <div key={section.id} className={`section ${section.id % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleCheckboxChange(section.id)}>
                        <div className={'section-text'}>
                            <label htmlFor={section.id}>
                                {section.name}
                            </label>
                        </div>
                        <input
                            name={section.id}
                            type="checkbox"
                            checked={checkedSections.includes(section.id)}
                        />
                    </div>
                ))}
                <br />
                <h3>Poddziały:</h3>
                {displayedSubsections && displayedSubsections.map(subsection => (
                    <div key={subsection.id} className={`section ${subsection.id % 2 === 0 ? 'even' : 'odd'}`} onClick={() => handleSubCheckboxChange(subsection.id)}>
                        <div className={'section-text'}>
                            <label htmlFor={subsection.id}>
                                {subsection.name}
                            </label>
                        </div>
                        <input
                            name={subsection.id}
                            type="checkbox"
                            checked={checkedSubsections.includes(subsection.id)}                         
                        />
                    </div>
                ))}
            </form>
        </div>
    );
}
