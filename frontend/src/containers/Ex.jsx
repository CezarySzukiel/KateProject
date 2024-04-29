import { connect } from "react-redux";

import { setActualExercise, setActualSection, setActualSubsection } from "../actions/exActions"

import { ExercisesList } from "../components/exercises/ExercisesList"
import { ExerciseDetails } from "../components/exercises/ExerciseDetails"
import { SectionsList } from "../components/exercises/SectionsList"
import { SubsectionsList } from "../components/exercises/SubsectionsList"


const mapStateToProps = (state) => {
    return {
        actualSection: state.ex.actualSection,
        actualSubsection: state.ex.actualSubsection,
        actualExercise: state.ex.actualExercise,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActualSection: (section) => dispatch(setActualSection(section)),
        setActualSubsection: (subsection) => dispatch(setActualSubsection(subsection)),
        setActualExercise: (exercise) => dispatch(setActualExercise(exercise)),
    }
}

export const ConSectionsList = connect(mapStateToProps, mapDispatchToProps)(SectionsList)
export const ConSubsectionsList = connect(mapStateToProps, mapDispatchToProps)(SubsectionsList)
export const ConExercisesList = connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
export const ConExerciseDetails = connect(mapStateToProps )(ExerciseDetails);
