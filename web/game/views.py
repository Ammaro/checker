
import models
from django.core import serializers




def players(request):
    if request.GET.get('id') and isinstance(request.GET['id'], int):
        id = int(request.GET['id'])
        return models.Player.objects.filter(id=id)
    else:
        return models.Player.objects.all()

def addPlayer(request):
    pass

