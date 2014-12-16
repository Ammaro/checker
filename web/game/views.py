
import models

def getPlayer(reqeust):
    id = int(reqeust.Get['id'])
    return serializers.serialize("json", models.Player.objects.filter(id=id))

def getAll(request):
    return serializers.serialize("json", models.Player.objects.all())

def getPlayerGames(request):
    pass
