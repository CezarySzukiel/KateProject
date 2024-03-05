import { ExercisesComponent } from ".././ExercisesComponent/ExercisesComponent"
import "./body.css"

function Body() {
	return (
    	<div className={'bodyContainer'}>
        	<h1>Body</h1>
            <ExercisesComponent />
        </div>
    );
}

export default Body