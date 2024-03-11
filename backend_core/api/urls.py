from django.urls import path, include
from . import views

urlpatterns = [
	path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    path('exercises/', include('exercises_app.urls')),
]
