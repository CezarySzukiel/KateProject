import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setActualPost } from '../../actions/blogActions'
import { Link } from 'react-router-dom';


export function PostList() {
	const SEARCH_URL = 'http://0.0.0.0:8000/api/v1/blog/list/'
	const [posts, setPosts] = useState(null)
	const dispatch = useDispatch()
	const isInitialMount = useRef(false)


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
			setPosts(response.data.results)
			return response.data.results
		} catch (error) {
			console.error(error);
			throw error;
		}
	} 

	const handleClick = (post) => {
		dispatch(setActualPost(post))
	}

	return (
		<>	
			{posts && posts.length > 0 ? posts.map((post) => (
				<Link to={`/post/`} >
				<div onClick={() => (handleClick(post))}>
					<h3>{post.title}</h3>
					{post.author && <p>Autor: {post.author}</p>}
				</div>
				</Link>
			)) : <p>Brak postów</p>}
		</>
	)
	
		
}