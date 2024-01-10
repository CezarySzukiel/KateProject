#!/bin/sh

if test "$POSTGRES_DB" = "katemath_backend_core_db"
then
    echo "Waiting for postgres..."

    dockerize -wait tcp://$POSTGRES_HOST:$POSTGRES_PORT -timeout 30s

    echo "PostgreSQL started"

fi

python manage.py flush --no-input
python manage.py migrate

exec "$@"