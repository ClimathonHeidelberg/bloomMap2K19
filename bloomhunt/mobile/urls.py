from django.urls import path

from . import views

urlpatterns = [
    path('scan', views.scan , name='scan'),
    path('', views.index, name='index')
]
