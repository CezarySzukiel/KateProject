import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";

export function SubsectionsList(props) {
	const Sec = props.actualSection.id
    const SUBSECTIONS_URL = `http://0.0.0.0:8000/api/v1/exercises/s-subsections/${Sec}`;
    const [subsections, setSubsections] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const isInitialMount = useRef(true)
    
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getSubsections();
        }
        return () => setSubsections([]);
    }, []);

    const getSubsections = async () => {
        try {          
            console.log("ma być jeden raz")
            const response = await fetch(SUBSECTIONS_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (subsections.length === 0) {
                setSubsections(data.results);
            } else {
                setSubsections(prevSubsections => [...prevSubsections, ...data.results]);
            }
            setNextPageUrl(data.next);
        } catch (error) {
            console.error('Error fetching subsections:', error);
        }
    };

    const handleNextPage = async () => {
        if (nextPageUrl) {
            try {
                const response = await fetch(nextPageUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSubsections(prevSubsections => [...prevSubsections, ...data.results]);
                setNextPageUrl(data.next);
            } catch (error) {
                console.error('Error fetching next page of subsections:', error);
            }
        }
    };

    const handleLinkClick = (subsection) => {
        props.setSelectedSubsectionIds([subsection.id])
    }

    return (
        <div>
            <h2>Lista poddziałów</h2>
            <ul>
                {subsections.map(subsection => (
                    <li key={subsection.id}>
                        <Link to={`exercises/`}>
                            <h3 onClick={() => handleLinkClick(subsection)}>{subsection.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
            {nextPageUrl && <button onClick={handleNextPage}>Więcej</button>}
        </div>
    );
}

// todo is next page working? never checked