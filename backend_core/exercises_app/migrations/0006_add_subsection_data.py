# Generated by Django 4.2.4 on 2024-01-19 22:26
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

def add_subsection_data(apps, schema_editor):
    Subsection = apps.get_model('exercises_app', 'Subsection')
    Section = apps.get_model('exercises_app', 'Section')
    sections = Section.objects.all()

    i = 0
    for sec in data:
        for y in sec['Subsections']:
            name = y['name']
            slug = slugify(name)
            Subsection.objects.create(name=name, section=sections[i], slug=slug)
        i += 1


class Migration(migrations.Migration):

    dependencies = [
        ('exercises_app', '0005_add_section_data'),
    ]

    operations = [
        migrations.RunPython(add_subsection_data),
    ]
