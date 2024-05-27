# Используем официальный образ Python
FROM python:3.10-alpine3.18
# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости для сборки
RUN apk add --no-cache build-base libffi-dev

# Обновляем pip и устанавливаем зависимости
RUN pip install --upgrade pip

# Копируем файлы в контейнер
COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

# Указываем порт, который будет открыт в контейнере
EXPOSE 8000

# Запускаем команду для миграции базы данных и запуска сервера
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]