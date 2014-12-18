from django.db import models


class Player(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    avatarUrl = models.CharField(blank=True, null=True, max_length=200)
    email = models.CharField(blank=True, null=True, max_length=100)
    rank = models.IntegerField(default=10)
    password = models.CharField(max_length=20, blank=True, null=True)

    @classmethod
    def create(cls, name, email, avatarUrl, password):
        """

        :param name:
        :param email:
        :param avatarUrl:
        :param password:
        :return:
        """
        player = cls(name=name, avatarUrl=avatarUrl, email=email, password=password)
        return player

    def __str__(self):
        return self.name + ' ' + str(self.rank)

    class Meta:
        db_table = 'players'
