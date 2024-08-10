import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { getSectionsAndSubsections, extractSections, extractSubsections } from "../../helpers"


export function SectionsList(props) {
    const SECTIONS_URL = 'http://0.0.0.0:8000/api/v1/exercises/sections/'
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
        <div>
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
