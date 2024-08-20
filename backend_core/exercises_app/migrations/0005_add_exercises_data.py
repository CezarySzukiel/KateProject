# Generated by Django 4.2.4 on 2024-08-09 08:02
import json
import os
from django.db import migrations

current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'exercises_data.txt')


class ExerciseDataLoader:
    def __init__(self, file_path=None):
        self.file_path = file_path
        self.title = None
        self.description = None
        self.ask1 = None
        self.ask2 = None
        self.difficult = None
        self.points = None
        self.type = None
        self.advanced_level = None
        self.exam = None
        self.data = None
        self.subsubsection = None
        self.subsection = None
        self.section = None
        self.Exercise = None
        self.Section = None
        self.Subsection = None
        self.Subsubsection = None

        if self.file_path:
            self.data = self.read_json_from_file(self.file_path)

    def read_json_from_file(self, file_path):
        try:
            with open(file_path, 'r') as file:
                data = json.load(file)
                return data
        except FileNotFoundError:
            print("*-" * 50)
            print(f'File not found: {file_path}')
            print("*-" * 50)

        except json.JSONDecodeError as e:
            print("*-" * 50)
            print(f'Error decoding JSON from the file: {file_path}')
            print(f'Error: {e.msg}')
            print(f'Line: {e.lineno}, Column: {e.colno}')
            print("*-" * 50)

    def add_exercise_data(self, apps, schema_editor):
        self.Exercise = apps.get_model('exercises_app', 'Exercise')
        self.Subsubsection = apps.get_model('exercises_app', 'Subsubsection')
        self.Subsection = apps.get_model('exercises_app', 'Subsection')
        self.Section = apps.get_model('exercises_app', 'Section')

        for exercise in self.data:
            self.title = exercise['title']
            self.description = exercise['description']
            self.ask1 = exercise.get('ask1', None)
            self.ask2 = exercise.get('ask2', None)
            self.difficult = exercise['difficult']
            self.points = exercise['points']
            self.type = exercise['type']
            self.advanced_level = exercise['advanced_level']
            self.exam = exercise['exam']
            self.section = self.Section.objects.get(name=exercise['section'])
            if 'subsubsection' in exercise:
                self.subsubsection = self.Subsubsection.objects.get(name=exercise['subsubsection'])
            if 'subsection' in exercise:
                self.subsection = self.Subsection.objects.get(name=exercise['subsection'])

            self.Exercise.objects.create(
                title=self.title,
                description=self.description,
                section=self.section,
                subsection=self.subsection,
                subsubsection=self.subsubsection,
                ask1=self.ask1,
                ask2=self.ask2,
                difficult=self.difficult,
                points=self.points,
                type=self.type,
                advanced_level=self.advanced_level,
                exam=self.exam
            )


class AnswerDataLoader(ExerciseDataLoader):
    def __init__(self, file_path=None):
        super().__init__(file_path)
        self.exercise = None
        self.answer = None
        self.correct = None
        self.second_set = None
        self.Answer = None
        self.Exercise = None

    def add_answer_data(self, apps, schema_editor):
        self.Answer = apps.get_model('exercises_app', 'Answer')
        self.Exercise = apps.get_model('exercises_app', 'Exercise')

        for ex in self.data:
            exercise = self.Exercise.objects.get(title=ex['title'])
            if 'answers' in ex:
                for answer in ex['answers']:
                    self.Answer.objects.create(
                        exercise=exercise,
                        answer=answer['answer'],
                        correct=answer['correct'],
                        second_set=answer['second_set']
                    )


def add_exercise_data(apps, schema_editor):
    exercise_loader = ExerciseDataLoader(file_path=os.path.join(current_directory, 'exercises_data.txt'))
    exercise_loader.add_exercise_data(apps, schema_editor)
    answer_loader = AnswerDataLoader(file_path=os.path.join(current_directory, 'exercises_data.txt'))
    answer_loader.add_answer_data(apps, schema_editor)


class Migration(migrations.Migration):
    dependencies = [
        ('exercises_app', '0004_add_subsubsection_data'),
    ]

    operations = [
        migrations.RunPython(add_exercise_data),
    ]
