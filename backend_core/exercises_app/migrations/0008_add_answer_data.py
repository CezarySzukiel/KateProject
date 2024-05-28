# Generated by Django 4.2.4 on 2024-01-20 19:38
import json
import os
from django.db import migrations


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

def add_answer_data(apps, schema_editor):
    Answer = apps.get_model('exercises_app', 'Answer')
    Exercise = apps.get_model('exercises_app', 'Exercise')
    exercises = Exercise.objects.all()

    ex = 0
    for section in data:
        for subsection in section['Subsections']:
            for exercise in subsection['exercises']:
                for answer in exercise['answers']:
                    ans = answer['answer']
                    correct = answer['correct']
                    exercise = exercises[ex]
                    second_set = answer['second_set']
                    Answer.objects.create(answer=ans, exercise=exercise, correct=correct, second_set=second_set)
                ex += 1

class Migration(migrations.Migration):

    dependencies = [
        ('exercises_app', '0007_add_exercise_data'),
    ]

    operations = [
        migrations.RunPython(add_answer_data),
    ]
