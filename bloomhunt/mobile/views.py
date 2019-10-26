from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, 'mobile/index.html')


def scan(request):
    return render(request, 'mobile/scan.html')
