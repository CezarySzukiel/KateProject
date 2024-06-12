import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function PostList() {
	const SEARCH_URL = 'http://0.0.0.0:8000/api/v1/blog/list/'
	const [posts, setPosts] = useState(null)

	useEffect(() => {
		getData()
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

	return (
		<>	
			{posts && posts.length > 0 ? posts.map((post) => (
				<>
					<h1>{post.title}</h1>
					<p>{post.post}</p>
					<p>Autor: {post.author}</p>
				</>
			)) : <p>Brak postów</p>}
		</>
	)
	
		
}