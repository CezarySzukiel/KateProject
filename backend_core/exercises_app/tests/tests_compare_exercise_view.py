import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from mixer.backend.django import mixer
from rest_framework import status


@pytest.mark.django_db
class TestCompareExerciseView:
    client = APIClient()

    def setup_method(self, method):
        self.user = mixer.blend('users.CustomUser')
        self.user_settings = mixer.blend('users.UserSettings', user=self.user)
        self.client.force_authenticate(user=self.user)

    def test_correct_answer(self):
        exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
        answer = mixer.blend('exercises_app.Answer', exercise=exercise, correct=True, answer='Test Answer')
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Test Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_200_OK

    def test_incorrect_answer(self):
        exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
        answer = mixer.blend('exercises_app.Answer', exercise=exercise, correct=True, answer='Test Answer')
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Test Exercise', 'answer': 'Wrong Answer'})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_exercise_does_not_exist(self):
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Nonexistent Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_no_correct_answer(self):
        exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Test Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_already_solved_exercise(self):
        exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
        answer = mixer.blend('exercises_app.Answer', exercise=exercise, correct=True, answer='Test Answer')
        self.user_settings.exercises.add(exercise)
        response = self.client.post(reverse('exercises_app:compare_answer'),
                                    {'title': 'Test Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_multiple_users_can_solve_same_exercise(self):
        user1 = mixer.blend('users.CustomUser')
        user2 = mixer.blend('users.CustomUser')
        exercise = mixer.blend('exercises_app.Exercise', title='Test Exercise')
        answer = mixer.blend('exercises_app.Answer', exercise=exercise, correct=True, answer='Test Answer')

        self.client.force_authenticate(user=user1)
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Test Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_200_OK

        self.client.force_authenticate(user=user2)
        response = self.client.post(reverse('exercises_app:compare_answer'), {'title': 'Test Exercise', 'answer': 'Test Answer'})
        assert response.status_code == status.HTTP_200_OK