import { API_URL } from '../.././config'

fetch(`${API_URL}/exercises`)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


function Header() {
	console.log("______________________________________")
	console.log(API_URL)
	return (
		<h1>Header działa</h1>
		
	);
}

export default Header