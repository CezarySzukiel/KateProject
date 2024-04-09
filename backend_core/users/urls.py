from django.urls import path
from .views import UserSettingsListView, UserSettingsDetailView


urlpatterns = [
	path('list/', UserSettingsListView.as_view()),
	path('<int:pk>/', UserSettingsDetailView.as_view()),
]
