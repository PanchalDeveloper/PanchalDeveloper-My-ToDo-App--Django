# Generated by Django 4.1.2 on 2022-12-24 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0003_alter_todo_todotime_alter_trashedtodo_todotime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trashedtodo',
            name='todoTime',
            field=models.DateTimeField(),
        ),
    ]