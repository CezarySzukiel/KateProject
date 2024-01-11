from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views


app_name = 'exercises_app'

router = SimpleRouter()
router.register('exercises', views.ExerciseViewSet, basename='exercises')
router.register('answers', views.AnswerViewSet, basename='answers')
router.register('sections', views.SectionViewSet, basename='sections')
router.register('subsections', views.SubsectionViewSet, basename='subsections')

urlpatterns = router.urls
