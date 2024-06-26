# Generated by Django 4.2.4 on 2024-01-20 19:13
import json
import os
from django.db import migrations
from django.utils.text import slugify

current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'data.txt')

def read_json_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f'File not found: {file_path}')
    except json.JSONDecodeError:
        print(f'Error decoding JSON from the file: {file_path}')

data = read_json_from_file(file_path)

def add_exercise_data(apps, schema_editor):
    Exercise = apps.get_model('exercises_app', 'Exercise')
    Subsection = apps.get_model('exercises_app', 'Subsection')
    subsections = Subsection.objects.all()
    sec = 0
    subsec = 0
    for section in data:
        for subsection in section['Subsections']:
            for exercise in subsection['exercises']:
                title = exercise['title']
                description = exercise['description']
                ask1 = exercise.get('ask1', None)
                ask2 = exercise.get('ask2', None)
                subsection = subsections[subsec]
                difficult = exercise['difficult']
                points = exercise['points']
                type = exercise['type']
                advanced_level = exercise['advanced_level']
                exam = exercise['exam']
                slug = slugify(title)

                Exercise.objects.create(
                    title=title, 
                    description=description, 
                    subsection=subsection,
                    ask1=ask1,
                    ask2=ask2, 
                    difficult=difficult,
                    points=points, 
                    type=type, 
                    advanced_level=advanced_level, 
                    exam=exam, 
                    slug=slug)

            subsec += 1
        sec += 1

class Migration(migrations.Migration):

    dependencies = [
        ('exercises_app', '0006_add_subsection_data'),
    ]

    operations = [
        migrations.RunPython(add_exercise_data),
    ]
