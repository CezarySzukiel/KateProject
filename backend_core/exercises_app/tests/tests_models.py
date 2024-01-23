import pytest
from django.core.exceptions import ValidationError
from mixer.backend.django import mixer
from exercises_app.models import Exercise, Answer, Section, Subsection


@pytest.mark.django_db(transaction=True)
def test_exercise_model():
    exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
    assert Exercise.objects.count() >= 1
    assert Exercise.objects.filter(title='Test Exercise').count() == 1
    assert str(exercise) == 'Test Exercise'
    exercise.title = 'New Exercise'
    exercise.save()


@pytest.mark.django_db(transaction=True)
def test_exercise_delete_behavior():
    exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
    answer = mixer.blend('exercises_app.Answer', exercise=exercise)
    exercise.delete()
    with pytest.raises(Answer.DoesNotExist):
        Answer.objects.get(pk=answer.pk)


@pytest.mark.django_db(transaction=True)
def test_answer_model():
    answer = mixer.blend('exercises_app.Answer', answer='Test Answer')
    assert Answer.objects.count() == 1
    assert Answer.objects.get().answer == 'Test Answer'
    assert str(answer) == 'Test Answer'
    answer.answer = 'New Answer'
    answer.save()
    assert Answer.objects.get().answer == 'New Answer'


@pytest.mark.django_db(transaction=True)
def test_section_model():
    section = mixer.blend('exercises_app.Section', name='Test Section')
    assert Section.objects.count() == 1
    assert Section.objects.get().name == 'Test Section'
    assert str(section) == 'Test Section'
    section.name = 'New Section'
    section.save()
    assert Section.objects.get().name == 'New Section'


@pytest.mark.django_db(transaction=True)
def test_subsection_model():
    subsection = mixer.blend('exercises_app.Subsection', name='Test Subsection')
    assert Subsection.objects.count() == 1
    assert Subsection.objects.get().name == 'Test Subsection'
    assert str(subsection) == 'Test Subsection'
    subsection.name = 'New Subsection'
    subsection.save()
    assert Subsection.objects.get().name == 'New Subsection'
