// import './homePage.css'
import React, { useState, useEffect, useRef } from 'react';
import { getFilteredPosts } from '../../helpers'


export function HomePage() {
    const [lastPost, setLastPost] = useState(null);
    const isInitialMount = useRef(false)
    const filters = {
        id: '',
        title: '',
        author: '',
        subsection: '',
        ordering: '-created_at',
        page_size: 1,
    }
    const SEARCH_URL = `http://0.0.0.0:8000/api/v1/blog/post/`;

    useEffect(() => {
        if (!isInitialMount) {
            isInitialMount.current = true;
        } else {
            getFilteredPosts(SEARCH_URL, filters, 1).then(data => setLastPost(data[0]))
        }
    }, [])

    useEffect(() => {
        console.log('lastPost', lastPost)
    }, [lastPost])


    return (
        <div className='HeroSection'>
            <div className='HeroContent'>
                <h1>Poznaj matematykę w wyjątkowy sposób</h1>
                <p>Ucz się matematyki krok po kroku, od podstaw do zaawansowanych zagadnień</p>
                <ul className='BenefitsList'>
                    <li>Interaktywne lekcje dostosowane do Twojego poziomu</li>
                    <li>Setki zadań matematycznych do rozwiązania</li>
                    <li>Zdobywaj punkty i rywalizuj z innymi użytkownikami</li>
                    <li>Otrzymuj natychmiastowe odpowiedzi i wskazówki</li>
                </ul>
                <button className='CTAButton'>Zacznij teraz</button>
            </div>
            {lastPost && <div>
                <h2>Ostatnio na blogu</h2>
                <h3>{lastPost.title}</h3>
                <p>{lastPost.post}</p>
                <p>{lastPost.author}</p>
                <p>{new Date(lastPost.created_at).toLocaleString()}</p>
            </div>}
        </div>

    );
} 