# Getting started

### Setting up the environment:

Python 3.9 is ideal, but anything 3.7+ should work.

It's not necessary, but you probably want to create a virtual environment with virtualenv or conda. 

Run "pip install -r requirements.txt" to install dependencies

### Getting the Database set up

Run "./reset_migrations.sh" to set up the database (make sure to run this from the website directory)

Run "python testing.py" to fill the database with dummy data for testing (this won't work until you start the server)

### Accessing the admin site

Run "python manage.py createsuperuser" to set up an admin account

Run "python manage.py runserver" to get the server running

Once you've created a superuser, you can access the admin site at localhost:[port]/admin

# Using the API

### Register new user

Methods: POST

Path: localhost:[port]/api/register/

required parameters: email, password, first_name, last_name

optional parameters: organization

### Get auth token and id

Methods: POST

Path: localhost:[port]/api/token-auth/

required parameters: username (actually user's email, but the dict entry should be called username), password

### Get user info

Path: localhost:[port]/api/user/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/user/5)

PUT is still under development

### Get letter info

Path: localhost:[port]/api/letter/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/letter/5)

PUT is still under development
