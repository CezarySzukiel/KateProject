from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views


app_name = 'exercises_app'

router = SimpleRouter()
router.register('list', views.ExerciseViewSet, basename='exercises')
router.register('answers', views.AnswerViewSet, basename='answers')
router.register('sections', views.SectionViewSet, basename='sections')
router.register('subsections', views.SubsectionViewSet, basename='subsections')
# router.register('<int:pk>', views.ExerciseViewSet, basename='exercise_details')

urlpatterns = router.urls

urlpatterns += [
    path('compare/', views.CompareExerciseView.as_view(), name='compare_answer'),
    path('s-subsections/<int:section_id>/', views.SubsectionListView.as_view(), name='subsection-list'),
    path('s-exercises/<int:subsection_id>/', views.ExerciseListView.as_view(), name='exercises-list'),
]
