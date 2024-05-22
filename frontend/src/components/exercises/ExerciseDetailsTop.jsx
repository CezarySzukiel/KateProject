
export function ExerciseDetailsTop(props) {
	return (
		<>
			{props.actualSection && <p>section: {props.actualSection.name}</p>}
    		{props.actualSubsection && <p>subsection: {props.actualSubsection[0].name}</p>}
			<h1><strong>{props.title}</strong></h1>
	        {props.advanced_level && <h3>Poziom rozszerzony</h3>}
        </>

	)
}