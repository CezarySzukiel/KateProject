# Generated by Django 4.2.4 on 2024-01-11 10:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Subsection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='subsections', to='exercises_app.section')),
            ],
        ),
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, unique=False)),
                ('description', models.TextField()),
                ('ask1', models.TextField(blank=True, null=True)),
                ('ask2', models.TextField(blank=True, null=True)),
                ('difficult', models.IntegerField()),
                ('points', models.IntegerField()),
                ('solution_exactly', models.TextField(blank=True, null=True)),
                ('type', models.IntegerField()),
                ('advanced_level', models.BooleanField(default=False)),
                ('solution_similar', models.ManyToManyField(blank=True, related_name='exercises', to='exercises_app.exercise')),
                ('subsection', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='exercises', to='exercises_app.subsection')),
                ('exam', models.DateField(blank=True, null=True))
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField()),
                ('correct', models.BooleanField(default=True)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='exercises_app.exercise')),
                ('second_set', models.BooleanField(default=False)),
            ],
        ),
    ]
