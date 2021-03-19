

## Setting up the environment:

Create a virtual environment with virtualenv or conda. Python 3.9 is ideal, but 3.7 should work as well.

Run "pip install -r requirements.txt" to install dependencies

## Getting the Database set up

Run "./reset_migrations.sh" to set up the database

Run "./test_populate.sh" to fill the database with dummy data for testing

## Accessing the admin site

Run "python manage.py createsuperuser" to set up an admin account

Run "python manage.py runserver" to get the server running

Once you've created a superuser, you can access the admin site at localhost:[port]/admin

### Register new user

Methods: POST

Path: localhost:[port]/register

required parameters: email, password, first_name, last_name
optional parameters: organization

### Get auth token and id

Methods: POST

Path: localhost:[port]/api-token-auth

required parameters: username (email, but the dict entry should be called username), password

### Get user info

Path: localhost:[port]/api/users/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/users/5)

PUT is still under development

### Get letter info

Path: localhost:[port]/api/letters/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/letter/5)

PUT is still under development