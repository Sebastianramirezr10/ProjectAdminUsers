# Generated by Django 5.1.3 on 2024-11-11 16:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_useractivity_session_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='buttonclick',
            name='user_activity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='button_clicks', to='core.useractivity'),
        ),
    ]
