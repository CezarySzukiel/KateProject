from django.urls import path, re_path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

from . import views


urlpatterns = [
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
	path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    path('exercises/', include('exercises_app.urls')),
    path('blog/', include('blog.urls')),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #  for using cookies maybe use auth/token/refresh?
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    path("password/reset/confirm/<str:uidb64>/<str:token>/", views.password_reset_confirm_redirect, name="password_reset_confirm", #  potrzebne do redirecta po resecie hasła
    ),
]
