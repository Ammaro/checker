import models
from django.core import serializers
import json

from cpp import game

def playerValue(player):
    return {
        "id": int(player.id),
        "avatarUrl":player.avatarUrl,
        "name": player.name,
        "rank": player.rank,
        "email": player.email
    }

def players(request):
    if 'id' in request.GET:
        id = int(request.GET['id'])
        return playerValue((models.Player.objects.filter(id=id).get()))
    else:
        return [playerValue(player) for player in models.Player.objects.all()]

def matchplayer(request):
    # print cpp.matchplayer(123, [23, 23, 135, 135, 12512531234, 123, 1243, 1243])
    ret = [i for i in range(100)]
    return ret

def addPlayer(request):
    print request.POST
    print request.body
    player = json.loads(request.body)['player']

    print player
    p = models.Player.create(player['name'], player['email'], player['avatarUrl'], player['password'])
    p.save()
    return p.id

