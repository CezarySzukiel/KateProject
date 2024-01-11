from django.shortcuts import render
from rest_framework import viewsets, permissions

from exercises_app.models import Exercise, Answer, Section, Subsection
from exercises_app.serializers import ExerciseSerializer, AnswerSerializer, SectionSerializer, SubsectionSerializer


class ExerciseViewSet(viewsets.ModelViewSet):
    """ViewSet for the Exercise class"""

    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AnswerViewSet(viewsets.ModelViewSet):
    """ViewSet for the Answer class"""

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    # permission_classes = [permissions.IsAuthenticated]


class SectionViewSet(viewsets.ModelViewSet):
    """ViewSet for the Section class"""

    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    # permission_classes = [permissions.IsAuthenticated]


class SubsectionViewSet(viewsets.ModelViewSet):
    """ViewSet for the Subsection class"""

    queryset = Subsection.objects.all()
    serializer_class = SubsectionSerializer
    # permission_classes = [permissions.IsAuthenticated]

