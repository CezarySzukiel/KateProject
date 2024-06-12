from django.urls import path
from rest_framework.routers import SimpleRouter

from . import views


app_name = 'blog'

router = SimpleRouter()
router.register('list', views.PostViewSet, basename='posts')

urlpatterns = router.urls

urlpatterns += [    

]