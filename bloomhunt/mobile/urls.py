from django.urls import path

from . import views

urlpatterns = [
    path('addtree/', views.addtree, name='addtree'),
    path('scan/', views.scan , name='scan'),
    path('', views.index, name='index')
]
