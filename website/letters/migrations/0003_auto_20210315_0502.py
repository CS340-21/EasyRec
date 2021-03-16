# Generated by Django 3.1.5 on 2021-03-15 05:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('letters', '0002_auto_20210315_0336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='letter',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='written', to='letters.user'),
        ),
        migrations.AlterField(
            model_name='letter',
            name='candidate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received', to='letters.user'),
        ),
        migrations.AlterField(
            model_name='user',
            name='organization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='members', to='letters.organization'),
        ),
    ]