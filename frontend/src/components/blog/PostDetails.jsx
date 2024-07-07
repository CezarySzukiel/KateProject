import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActualPost } from '../../actions/blogActions'

export function PostDetails() {
	const actualPost = useSelector(state => state.blog.actualPost)
	const SEARCH_URL = `http://0.0.0.0:8000/api/v1/blog/list/${actualPost.id}/`
	const [posts, setPosts] = useState(null)
	const isInitialMount = useRef(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if (isInitialMount.current) {
            getData();
        }
        else {
            isInitialMount.current = true;
        }
	}, [])

	const getData = async () => {
		try {
			const response = await axios.get(SEARCH_URL, {
				headers: {
	                    'Content-Type': 'application/json',
	            },
			})
			console.log(response)
			return response.data.results
		} catch (error) {
			console.error(error);
			throw error;
		}
	} 
	return (
		<>
		<h1>{actualPost.title}</h1>
		<p>{actualPost.post}</p>
		<p>{actualPost.author}</p>
		</>
	)
}
