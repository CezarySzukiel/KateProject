# Generated by Django 4.2.4 on 2024-06-05 10:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
        ('exercises_app', '0008_add_answer_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='solution_exactly',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises_exactly', to='blog.post'),
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='solution_similar',
        ),
        migrations.AddField(
            model_name='exercise',
            name='solution_similar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises_similar', to='blog.post'),
        ),
    ]
