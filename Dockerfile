# start with a blank computer that already has Python 3.11 installed
FROM python:3.11-slim

# do not generate junk .pyc files and to print logs instantly
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#folder inside the container named /app and move inside it
WORKDIR /app

#copy ONLY your requirements file first
COPY requirements.txt .

#installing all your Python libraries
RUN pip install --no-cache-dir -r requirements.txt

#copy the rest of your code into the container
COPY . .

#container wants to communitcate on port 8000
EXPOSE 8000

#turn the server on
# we use 0.0.0.0 instead of 127.0.0.1 so the container can broadcast outside itself
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]