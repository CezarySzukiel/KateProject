
export function ExerciseDetailsTop(props) {
	return (
		<>
			{props.actualSection && <p>{props.actualSection}</p>}
    		{props.actualSubsection && <p>{props.actualSubsection[0].name}</p>}
			<h1><strong>{props.title}</strong></h1>
	        {props.advanced_level ? <h3>Poziom rozszerzony</h3> : <h3>Poziom podstawowy</h3>}
	        {props.exam && <p>matura {props.exam}</p>}
        </>

	)
}