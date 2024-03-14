import { Exercises } from ".././exercises/Exercises"
import "./body.css"
import Counter from "../../containers/Counter.jsx"

function Body() {
	return (
    	<div className={'bodyContainer'}>
        	<h1>Body</h1>
            <Counter />
        </div>
    );
}

export default Body