# Generated by Django 4.2.4 on 2024-08-07 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exercise',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField()),
                ('ask1', models.TextField(blank=True, null=True)),
                ('ask2', models.TextField(blank=True, null=True)),
                ('difficult', models.IntegerField()),
                ('points', models.IntegerField()),
                ('type', models.IntegerField()),
                ('advanced_level', models.BooleanField(default=False)),
                ('exam', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subsection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='subsections', to='exercises_app.section')),
            ],
        ),
        migrations.CreateModel(
            name='Subsubsection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('subsection', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='subsubsections', to='exercises_app.subsection')),
            ],
        ),
        migrations.CreateModel(
            name='Function',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('function_type', models.CharField(choices=[('linear', 'Linear'), ('quadratic', 'Quadratic'), ('inverse', 'Inverse'), ('sinusoidal', 'Sinusoidal'), ('logarithmic', 'Logarithmic'), ('exponential', 'Exponential'), ('square_root', 'Square Root'), ('polynomial', 'Polynomial'), ('step', 'Step')], max_length=20)),
                ('a', models.FloatField()),
                ('b', models.FloatField(blank=True, null=True)),
                ('c', models.FloatField(blank=True, null=True)),
                ('coefficients', models.JSONField(blank=True, null=True)),
                ('x_start', models.FloatField(default=-10)),
                ('x_end', models.FloatField(default=10)),
                ('x_step', models.FloatField(default=1)),
                ('x_offset', models.FloatField(default=0)),
                ('y_offset', models.FloatField(default=0)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='functions', to='exercises_app.exercise')),
            ],
        ),
        migrations.AddField(
            model_name='exercise',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='exercises', to='exercises_app.section'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='solution_exactly',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises_exactly', to='blog.post'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='solution_similar',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises_similar', to='blog.post'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='subsection',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises', to='exercises_app.subsection'),
        ),
        migrations.AddField(
            model_name='exercise',
            name='subsubsection',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='exercises', to='exercises_app.subsubsection'),
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField()),
                ('correct', models.BooleanField(default=True)),
                ('second_set', models.BooleanField(default=False)),
                ('exercise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='exercises_app.exercise')),
            ],
        ),
    ]
