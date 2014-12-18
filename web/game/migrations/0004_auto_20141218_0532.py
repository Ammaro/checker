# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20141218_0530'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='avatarUrl',
            field=models.CharField(max_length=200, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='player',
            name='email',
            field=models.CharField(max_length=100, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='player',
            name='rank',
            field=models.IntegerField(default=10),
            preserve_default=True,
        ),
    ]
