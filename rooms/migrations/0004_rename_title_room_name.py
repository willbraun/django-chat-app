# Generated by Django 4.0.5 on 2022-06-17 18:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0003_rename_created_timestamp_message_created_timestamp_utc'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='title',
            new_name='name',
        ),
    ]