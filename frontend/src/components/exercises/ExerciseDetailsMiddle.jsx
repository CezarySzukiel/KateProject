import './exerciseDetails.css'
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { Latex } from './Latex'

export function ExerciseDetailsMiddle(props) {
    const {actualExercise} = props
    return (
        <>
            {
                actualExercise.additional_texts.length > 0 &&
                actualExercise.additional_texts[0].place === "Description" &&
                <Latex text={actualExercise.additional_texts[0].text} />
            }
            {
                actualExercise.images.length > 0 &&
                <div className={'HOC-E-D-image'}>
                    <Latex text={actualExercise.images[0].description} />
                    <img
                        src={actualExercise.images[0].image}
                        alt={actualExercise.images[0].description}
                    >
                    </img>
                </div>
            }
            <div className={'latex'}>
                <Latex text={actualExercise.description} />
            </div>
        </>
    )
}
