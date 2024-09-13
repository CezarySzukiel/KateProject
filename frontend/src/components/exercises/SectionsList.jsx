import './sList.css'
import { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

import { getSectionsAndSubsections, extractSections, extractSubsections } from "../../helpers"


export function SectionsList(props) {
    const [sections, setSections] = useState([]);
    const [subsections, setSubsections] = useState([]);
    const isInitialMount = useRef(true)
    
    useEffect(() => {
        if (!props.allSections || !props.allSubsections) {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                getData()
            }
        }
        return () => setSections([]);
    }, []);

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

    const handleLinkClick = (section) => {
        props.setActualSection(section)
    }

    return (
        <div className={'s-list'}>
            <h2>Działy:</h2>
            <ul>
                {props.allSections && props.allSections.map(section => (
                    <li key={section.id}>
                        <Link to={`subsections/`}>
                            <h3 onClick={() => handleLinkClick(section)}>{section.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
