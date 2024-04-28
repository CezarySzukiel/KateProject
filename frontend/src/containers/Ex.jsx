import { connect } from "react-redux";

import { setActualExercise } from "../actions/exActions"

import { ExercisesList } from "../components/exercises/ExercisesList"
import { ExerciseDetails } from "../components/exercises/ExerciseDetails"


const mapStateToProps = (state) => {
    return {
        actualExercise: state.ex.actualExercise,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActualExercise: (exercise) => dispatch(setActualExercise(exercise)),
    }
}

export const ConExercisesList = connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
export const ConExerciseDetails = connect(mapStateToProps )(ExerciseDetails);
