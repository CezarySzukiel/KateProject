import { connect } from "react-redux";

import { setActualExercise, 
setActualSection, 
setActualSubsection, 
setAllSections,
setAllSubsections,
setAllExercises, 
setSelectedSubsectionIds,
setSolvedExercises, } from "../actions/exActions";

import { ExercisesList } from "../components/exercises/ExercisesList";
import { ExerciseDetails } from "../components/exercises/ExerciseDetails";
import { SectionsList } from "../components/exercises/SectionsList";
import { SubsectionsList } from "../components/exercises/SubsectionsList";
import { SearchBar } from "../components/exercises/SearchBar";
import { ExProvider } from "../components/auth/UserDataExProvider";

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
        
    }
}

const mapSetSolvedExercisesToProps = (dispatch) => {
    return {
        setSolvedExercises: (exercises) => dispatch(setSolvedExercises(exercises)),
    }
}

export const ConSectionsList = connect(mapStateToProps, mapDispatchToProps)(SectionsList);
export const ConSubsectionsList = connect(mapStateToProps, mapDispatchToProps)(SubsectionsList);
export const ConExercisesList = connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
export const ConExerciseDetails = connect(mapStateToProps, mapDispatchToProps)(ExerciseDetails);
export const ConSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export const ConUserDataExProvider = connect(null, mapSetSolvedExercisesToProps)(ExProvider);