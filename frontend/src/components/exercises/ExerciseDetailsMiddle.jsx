import './exerciseDetails.css'
import React from "react";
import Latex from "react-latex-next";

export function ExerciseDetailsMiddle(props) {
    const {actualExercise} = props
    return (
        <>
            {
                actualExercise.additional_texts.length > 0 &&
                actualExercise.additional_texts[0].place === "Description" &&
                <p><Latex>{actualExercise.additional_texts[0].text}</Latex></p>
            }
            {
                actualExercise.images.length > 0 &&
                <div className={'HOC-E-D-image'}>
                    <p>{actualExercise.images[0].description}</p>
                    <img
                        src={actualExercise.images[0].image}
                        alt={actualExercise.images[0].description}
                    >
                    </img>
                </div>
            }
            <div className={'description'}>
                <Latex>{actualExercise.description}</Latex>
            </div>
        </>
    )
}
