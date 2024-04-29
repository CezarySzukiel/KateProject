from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from exercises_app.models import Exercise, Answer, Section, Subsection
from exercises_app.serializers import ExercisesListSerializer, AnswerSerializer, SectionSerializer, SubsectionSerializer, \
    CompareExerciseSerializer, ExerciseDetailSerializer
from users.models import UserSettings


class ExerciseViewSet(viewsets.ModelViewSet):
    """ViewSet for the Exercise class"""
    # todo optimalization: change serializer class, because list don't need all the details.

    queryset = Exercise.objects.all()
    serializer_class = ExercisesListSerializer
    permission_classes = (permissions.AllowAny, )


class AnswerViewSet(viewsets.ModelViewSet):
    """ViewSet for the Answer class"""

    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = (permissions.AllowAny, )


class SectionViewSet(viewsets.ModelViewSet):
    """ViewSet for the Section class"""

    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = (permissions.AllowAny, )


class SubsectionViewSet(viewsets.ModelViewSet):
    """ViewSet for the Subsection class"""

    queryset = Subsection.objects.all()
    serializer_class = SubsectionSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]


class SubsectionListView(generics.ListAPIView):
    """View to list all subsections for a specific section"""
    serializer_class = SubsectionSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        section_id = self.kwargs['section_id']
        section = get_object_or_404(Section, pk=section_id)
        return Subsection.objects.filter(section=section)


class ExerciseListView(generics.ListAPIView):
    """View to list all exercises for a specific subsection"""
    serializer_class = ExercisesListSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        subsection_id = self.kwargs['subsection_id']
        subsection = get_object_or_404(Subsection, pk=subsection_id)
        return Exercise.objects.filter(subsection=subsection).values('id', 'title', 'description')


class ExerciseDetailView(generics.RetrieveAPIView):
    """View to retrieve details of an exercise along with its correct answer"""
    # todo optimalization: check database logs how many querries is, in that view
    serializer_class = ExerciseDetailSerializer
    queryset = Exercise.objects.all()
    permission_classes = (permissions.AllowAny, )

    def get_object(self):
        exercise_id = self.kwargs['exercise_id']
        exercise = get_object_or_404(Exercise, pk=exercise_id)
        
        answer = get_object_or_404(Answer, exercise=exercise, correct=True)
        exercise.correct_answer = answer

        return exercise

class CompareExerciseView(APIView):
    """
    View to compare exercise data from the frontend form with the database.
    """

# todo optimalization: 2 asks to the database. Maybe frontend should send the exercise data?

    def post(self, request, format=None):
        serializer = CompareExerciseSerializer(data=request.data)
        if serializer.is_valid():
            # Get the data from the form
            form_data = serializer.validated_data

            # Get the exercise from the database
            try:
                exercise = Exercise.objects.get(title=form_data['title'])
            except Exercise.DoesNotExist:
                return Response({"detail": "Exercise does not exist."}, status=status.HTTP_404_NOT_FOUND)

            try:
                right_answer = Answer.objects.get(exercise=exercise, correct=True)
            except Answer.DoesNotExist:
                return Response({"detail": "Exercise does not have a right answer."}, status=status.HTTP_404_NOT_FOUND)
            # todo check if another user solve this exercise it will work correctly?
            # Compare the data
            if form_data['answer'] == right_answer.answer:
                # Get or create the user settings
                user_settings, created = UserSettings.objects.get_or_create(user=request.user)
                # check if exercise is already in user settings & update the user settings
                if exercise in user_settings.exercises.all():
                    return Response({"detail": "You have already solved this exercise."}, status=status.HTTP_400_BAD_REQUEST)
                user_settings.points += exercise.points
                user_settings.exercises.add(exercise)
                user_settings.save()
                return Response({"detail": "The correct answer!"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Try again!"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
