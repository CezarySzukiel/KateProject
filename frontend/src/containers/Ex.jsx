import { connect } from "react-redux";

import { setActualExercise, 
setActualSection, 
setActualSubsection, 
setAllSections,
setAllSubsections,
setAllExercises, } from "../actions/exActions";

import { ExercisesList } from "../components/exercises/ExercisesList";
import { ExerciseDetails } from "../components/exercises/ExerciseDetails";
import { SectionsList } from "../components/exercises/SectionsList";
import { SubsectionsList } from "../components/exercises/SubsectionsList";
import { SearchBar } from "../components/exercises/SearchBar";


const mapStateToProps = (state) => {
    return {
        actualSection: state.ex.actualSection,
        actualSubsection: state.ex.actualSubsection,
        actualExercise: state.ex.actualExercise,
        allSections: state.ex.allSections,
        allSubsections: state.ex.allSubsections,
        allExercises: state.ex.allExercises, 
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
    }
}

export const ConSectionsList = connect(mapStateToProps, mapDispatchToProps)(SectionsList);
export const ConSubsectionsList = connect(mapStateToProps, mapDispatchToProps)(SubsectionsList);
export const ConExercisesList = connect(mapStateToProps, mapDispatchToProps)(ExercisesList);
export const ConExerciseDetails = connect(mapStateToProps )(ExerciseDetails);
export const ConSearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);