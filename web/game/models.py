
from django.db import models


class Player(models.Model):
    name = models.CharField(max_length=10)
    avatarurl = models.CharField(max_length=200)
    email = models.CharField(max_length=50)
    rank = models.IntegerField(default=10)


