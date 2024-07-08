import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActualPost } from '../../actions/blogActions'
import { getFilteredPosts } from '../../helpers'

export function PostDetails() {
	const actualPost = useSelector(state => state.blog.actualPost)
	const SEARCH_URL = `http://0.0.0.0:8000/api/v1/blog/post/`;
	const [post, setPost] = useState(null);
	const [filters, setFilters] = useState({
		id: '',
        title: '',
        author: '',
        subsection: '',
        ordering: '-created_at',
        page_size: 1,
    });
    const [currentPage, setCurrentPage] = useState(1);
	const isInitialMount = useRef(false)
	const dispatch = useDispatch()

	useEffect(() => {
        if (actualPost.id && !isInitialMount.current) {
            setFilters(prevFilters => ({ ...prevFilters, id: actualPost.id, page_size: 1}));
            isInitialMount.current = false;
        }
    }, [actualPost.id]);

    useEffect(() => {
        if (filters.id) {
            getFilteredPosts(SEARCH_URL, filters, currentPage).then(data => dispatch(setActualPost(data[0])));
        }
    }, [filters, currentPage]);

	return (
		<>
			<h1>{actualPost.title}</h1>
			<p>{actualPost.post}</p>
			<p>{actualPost.author}</p>
			<p>{new Date(actualPost.created_at).toLocaleString()}</p>
		</>
	)
}