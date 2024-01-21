FROM python:3.12-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

COPY Pipfile Pipfile.lock ./

RUN pip install -U pipenv
RUN pipenv install --system

COPY ./entrypoint.sh .
RUN chmod +x ./entrypoint.sh

COPY . .

ENTRYPOINT ["./entrypoint.sh"]