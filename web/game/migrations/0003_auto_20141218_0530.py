# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_auto_20141218_0530'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='player',
            table='players',
        ),
    ]
