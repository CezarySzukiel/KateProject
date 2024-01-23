import pytest
from exercises_app.serializers import (ExerciseSerializer, AnswerSerializer, SectionSerializer, SubsectionSerializer,
                                       CompareExerciseSerializer)
from mixer.backend.django import mixer


@pytest.mark.django_db
def test_exercise_serializer():
    exercise = mixer.blend('exercises_app.Exercise')
    serializer = ExerciseSerializer(exercise)
    assert serializer.data['title'] == exercise.title, "Title does not match"
    assert serializer.data['description'] == exercise.description, "Description does not match"
    subsection = mixer.blend('exercises_app.Subsection')
    data = {
        'title': 'New Exercise',
        'description': 'New Description',
        'subsection': subsection.id,
        'difficult': 1,
        'points': 1,
        'type': 1,
        'solution_similar': [],
    }
    # data = {'title': 'New Exercise', 'description': 'New Description'}
    new_serializer = ExerciseSerializer(data=data)
    assert new_serializer.is_valid(), new_serializer.errors
    new_exercise = new_serializer.save()
    assert new_exercise.title == 'New Exercise', "second assert: Title does not match"
    assert new_exercise.description == 'New Description', " second assert: Description does not match"


@pytest.mark.django_db
def test_answer_serializer():
    answer = mixer.blend('exercises_app.Answer')
    serializer = AnswerSerializer(answer)
    assert serializer.data['answer'] == answer.answer, "Answer does not match"
    assert serializer.data['correct'] == answer.correct, "Correct does not match"
    data = {'answer': 'New Answer', 'correct': True, 'exercise': answer.exercise.id}
    new_serializer = AnswerSerializer(data=data)
    assert new_serializer.is_valid(), new_serializer.errors

    new_answer = new_serializer.save()
    assert new_answer.answer == 'New Answer', 'New answer does not match'
    assert new_answer.correct == True, 'New correct does not match'


@pytest.mark.django_db
def test_section_serializer():
    section = mixer.blend('exercises_app.Section')
    serializer = SectionSerializer(section)
    assert serializer.data['name'] == section.name
    data = {'name': 'New Section'}
    new_serializer = SectionSerializer(data=data)
    assert new_serializer.is_valid()
    new_section = new_serializer.save()
    assert new_section.name == 'New Section'


@pytest.mark.django_db
def test_subsection_serializer():
    subsection = mixer.blend('exercises_app.Subsection')
    serializer = SubsectionSerializer(subsection)
    assert serializer.data['name'] == subsection.name, "Name does not match"
    data = {'name': 'New Subsection', 'section': subsection.section.id}
    new_serializer = SubsectionSerializer(data=data)
    assert new_serializer.is_valid(), new_serializer.errors
    new_subsection = new_serializer.save()
    assert new_subsection.name == 'New Subsection', "Second assert: Name does not match"


@pytest.mark.django_db
def test_compare_exercise_serializer():
    exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
    answer = mixer.blend('exercises_app.Answer', exercise=exercise, correct=True, answer='Test Answer')
    data = {'title': 'Test Exercise', 'answer': 'Test Answer'}
    serializer = CompareExerciseSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.validated_data['title'] == 'Test Exercise'
    assert serializer.validated_data['answer'] == 'Test Answer'


@pytest.mark.django_db
def test_compare_exercise_serializer():
    data = {'title': 'Test Exercise', 'answer': 'Test Answer'}
    serializer = CompareExerciseSerializer(data=data)
    assert serializer.is_valid()
    assert serializer.validated_data['title'] == 'Test Exercise'
    assert serializer.validated_data['answer'] == 'Test Answer'
