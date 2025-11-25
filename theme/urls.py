from django.urls import path
from . import views

urlpatterns = [
    path('', views.wavespeed_home, name='home'),
    path('wavespeed/', views.wavespeed_home, name='wavespeed'),
]
