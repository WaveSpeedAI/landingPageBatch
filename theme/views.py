from django.shortcuts import render

def wavespeed_home(request):
    return render(request, 'wavespeed.html')

def home(request):
    return render(request, 'wavespeed.html')
