# Generated by Django 5.1.3 on 2024-11-11 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_button_remove_useractivity_button_clicks_buttonclick_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useractivity',
            name='session_duration',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
