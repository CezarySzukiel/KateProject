import { connect } from "react-redux";

import { setActualExercise, 
setActualSection, 
setActualSubsection, 
setAllSections,
setAllSubsections,
setAllExercises, 
setSelectedSubsectionIds,
setSolvedExercises, 
pushSolvedExercise, 
setActiveInput,
setUserAnswer, } from "../actions/exActions";

import { HOC_ExercisesList } from "../components/exercises/HOC_ExercisesList";
import { HOC_ExerciseDetails } from "../components/exercises/HOC_ExerciseDetails";
import { SectionsList } from "../components/exercises/SectionsList";
import { SubsectionsList } from "../components/exercises/SubsectionsList";
import { SearchBar } from "../components/exercises/SearchBar";
import { ExProvider } from "../components/auth/UserDataExProvider";
import { HOC_AnswerInput } from "../components/exercises/HOC_AnswerInput"

const mapStateToProps = (state) => {
    return {
        actualSection: state.ex.actualSection,
        actualSubsection: state.ex.actualSubsection,
        actualExercise: state.ex.actualExercise,
        allSections: state.ex.allSections,
        allSubsections: state.ex.allSubsections,
        allExercises: state.ex.allExercises, 
        selectedSubsectionIds: state.ex.selectedSubsectionIds,
        solvedExercises: state.ex.solvedExercises,
        activeInputRef: state.ex.activeInputRef,
        userAnswer: state.ex.userAnswer,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setActualSection: (section) => dispatch(setActualSection(section)),
        setActualSubsection: (subsection) => dispatch(setActualSubsection(subsection)),
        setActualExercise: (exercise) => dispatch(setActualExercise(exercise)),
        setAllSections: (sections) => dispatch(setAllSections(sections)),
        setAllSubsections: (subsections) => dispatch(setAllSubsections(subsections)),
        setAllExercises: (exercises) => dispatch(setAllExercises(exercises)),
        setSelectedSubsectionIds: (ids) => dispatch(setSelectedSubsectionIds(ids)),
        pushSolvedExercise: (exercise) => dispatch(pushSolvedExercise(exercise)),
        setActiveInput: (payload) => dispatch(setActiveInput(payload)),
        setUserAnswer: (payload) => dispatch(setUserAnswer(payload)),
    }
}

const mapSetSolvedExercisesToProps = (dispatch) => {
    return {
        setSolvedExercises: (exercises) => dispatch(setSolvedExercises(exercises)),
    }
}

export const ConSectionsList = connect(mapStateToProps, mapDispatchToProps)(SectionsList);
export const ConSubsectionsList = connect(mapStateToProps, mapDispatchToProps)(SubsectionsList);
export const ConExercisesList = connect(mapStateToProps, mapDispatchToProps)(HOC_ExercisesList);
export const ConExerciseDetails = connect(mapStateToProps, mapDispatchToProps)(HOC_ExerciseDetails);
export const ConSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);
export const ConAnswerInput = connect(mapStateToProps, mapDispatchToProps)(HOC_AnswerInput);

export const ConUserDataExProvider = connect(mapStateToProps, mapSetSolvedExercisesToProps)(ExProvider);