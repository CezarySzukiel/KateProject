import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

export function SubsectionsList(props) {
    const { actualSection, allSubsections, setSelectedSubsectionIds} = props
    const SUBSECTIONS_URL = actualSection
        ? `http://0.0.0.0:8000/api/v1/exercises/s-subsections/${actualSection.id}`
        : `http://0.0.0.0:8000/api/v1/exercises/subsections/`;
    // const SUBSECTIONS_URL = `http://0.0.0.0:8000/api/v1/exercises/s-subsections/${actualSection.id}`;
    const [subsections, setSubsections] = useState(null);
    
    useEffect(() => {
        if (allSubsections && actualSection) {
            setSubsections(allSubsections.filter((subsec) => subsec.section == actualSection.id));
        } else {
            getSubsections()
        }
        return () => setSubsections([]);
    }, [actualSection]);

    const getSubsections = async () => {
        try { console.log('pobieram dane')         
            const response = await fetch(SUBSECTIONS_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSubsections(data)
        } catch (error) {
            console.error('Error fetching subsections:', error);
        }
    };

    const handleLinkClick = (subsection) => {
        setSelectedSubsectionIds([subsection.id])
    }

    return (
        <div>
            <h2>Lista poddziałów</h2>
            <ul>
                {subsections && subsections.map(subsection => (
                    <li key={subsection.id}>
                        <Link to={`exercises/`}>
                            <h3 onClick={() => handleLinkClick(subsection)}>{subsection.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
