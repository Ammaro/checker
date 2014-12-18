__author__ = 'Ammar'

from models import Player
from django.test import TestCase

class PlayerTest(TestCase):
    def setUp(self):
        Player.objects.create(name='Charlie',rank=322)
    def testSomething(self):
        print Player.objects.all()