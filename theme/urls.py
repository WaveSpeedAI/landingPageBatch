from django.urls import path
from . import views

urlpatterns = [
    path('', views.wavespeed_feature, name='home'),
    path('api/feature/<str:keyword>', views.wavespeed_api_feature, name='api_feature'),
    path('api/keyword_map', views.wavespeed_api_feature_keyword_map, name='api_feature_keyword_map'),
    path('feature/<str:keyword>', views.wavespeed_feature, name='feature'),
]
