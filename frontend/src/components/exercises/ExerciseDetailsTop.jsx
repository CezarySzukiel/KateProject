import './exerciseDetails.css'
import React from "react";
export function ExerciseDetailsTop(props) {
	const {actualSection, actualSubsection, advanced_level, exam, title, points, difficult} = props
	return (
		<>
			{actualSection && actualSubsection && <p>{actualSection} - {actualSubsection[0].name}</p>}
    		{actualSection && !actualSubsection && <p>{actualSection}</p>}
			{actualSubsection && !actualSection && <p>{actualSubsection[0].name}</p>}
			<div className='title'>
				<h1>{title}</h1>
				{points &&
				<div className={'points'}>
					<p>Pkt: {points}</p>
				</div>
				}
				{advanced_level &&
					<div className={'adv-level'}>
						<p>Rozszerzenie</p>
					</div>
				}
				{!advanced_level &&
					<div className={'std-level'}>
						<p>Podstawa</p>
					</div>
				}
				{exam &&
					<div className={'exam'}>
						{exam && <p>{exam}</p>}
					</div>
				}
			</div>
		</>

	)
}