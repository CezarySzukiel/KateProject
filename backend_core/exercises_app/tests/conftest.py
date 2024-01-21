import pytest
from django.utils.text import slugify

from exercises_app.models import Exercise, Answer, Section, Subsection

@pytest.fixture
def section():
    """"
    Returns a list of section
    """
    lst = []
    lst.append(Section.objects.create(name='Test Section 1', slug='test-section-1'))
    lst.append(Section.objects.create(name='Test Section 2', slug='test-section-2'))
    return lst

@pytest.fixture
def subsection():
    """"
    Returns a list of subsection
    """
    lst = []
    lst.append(Subsection.objects.create(name='Test Subsection 1', section=Section.objects.get(name='Test Section 1'), slug='test-subsection-1'))
    lst.append(Subsection.objects.create(name='Test Subsection 2', section=Section.objects.get(name='Test Section 2'), slug='test-subsection-2'))
    # lst.append(Subsection.objects.create(name='Test Subsection 1', section=section[0], slug='test-subsection-1'))
    # lst.append(Subsection.objects.create(name='Test Subsection 2', section=section[1], slug='test-subsection-2'))
    return lst

@pytest.fixture
def exercises(subsections):
    """Returns a list of 11 exercises for testing. exercise[2] has 3 answers, 1 of which is correct"""
    lst = []
    lst.append(Exercise.objects.create(description="Zadanie 1",
                                        subsection=subsections[0],
                                        difficult=1,
                                        points=1,
                                        solution_exactly="solution 1",
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 1")))
    lst.append(Exercise.objects.create(description="Zadanie 2",
                                        subsection=subsections[1],
                                        difficult=2,
                                        points=2,
                                        type=1,
                                        advanced_level=True,
                                        slug=slugify("Zadanie 2")))
    lst.append(Exercise.objects.create(description="Zadanie 3",
                                        subsection=subsections[0],
                                        difficult=3,
                                        points=3,
                                        type=2,
                                        advanced_level=True,
                                        slug=slugify("Zadanie 3")))
    lst.append(Exercise.objects.create(description="Zadanie 4",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 4")))
    lst.append(Exercise.objects.create(description="Zadanie 5",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 5")))
    lst.append(Exercise.objects.create(description="Zadanie 6",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 6")))
    lst.append(Exercise.objects.create(description="Zadanie 7",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 7")))
    lst.append(Exercise.objects.create(description="Zadanie 8",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 8")))
    lst.append(Exercise.objects.create(description="Zadanie 9",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 9")))
    lst.append(Exercise.objects.create(description="Zadanie 10",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 10")))
    lst.append(Exercise.objects.create(description="Zadanie 11",
                                        subsection=subsections[1],
                                        difficult=1,
                                        points=1,
                                        type=1,
                                        advanced_level=False,
                                        slug=slugify("Zadanie 11")))
    return lst

@pytest.fixture
def answer(exercises):
    """Returns a list of 5 answers for testing. exercise[2] has 3 answers, 1 of which is correct"""
    lst = []
    lst.append(Answer.objects.create(exercise=exercises[0],
                                     answer="Odpowiedź 1",
                                     correct=True))
    lst.append(Answer.objects.create(exercise=exercises[1],
                                     answer="Odpowiedź 2",
                                     correct=True))
    lst.append(Answer.objects.create(exercise=exercises[2],
                                     answer='correct answer',
                                     correct=True))
    lst.append(Answer.objects.create(exercise=exercises[2],
                                     answer='incorrect answer1',
                                     correct=False))
    lst.append(Answer.objects.create(exercise=exercises[2],
                                     answer='incorrect answer2',
                                     correct=False))
    return lst