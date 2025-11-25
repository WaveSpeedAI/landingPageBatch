from django.urls import path
from . import views

urlpatterns = [
    path('', views.wavespeed_feature, name='home'),
    path('feature/<str:keyword>', views.wavespeed_feature, name='feature'),
]
