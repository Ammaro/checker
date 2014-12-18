
from django.contrib import admin
from game.models import Player

class PlayerAdmin(admin.ModelAdmin):
    # fields = ['name', 'email', 'avatarUrl']
    list_display = ('name', 'email', 'rank')

admin.site.register(Player, PlayerAdmin)