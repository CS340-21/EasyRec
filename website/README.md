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

Path: /api/register/

required parameters: email, password, first_name, last_name

optional parameters: organization

### Get auth token and id

Methods: POST

Path: /api/token-auth/

required parameters: username (actually user's email, but the dict entry should be called username), password

### Get user info

Path: /api/user/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/user/5)

PUT is still under development

### Get letter info

Path: /api/letter/[id]

Methods: GET, PUT, DELETE

For GET and DELETE, all that is required is that the id be included in the url, (e.g. for id = 5, GET .../api/letter/5)

PUT is still under development

### Upload Letter

Path: /api/upload/

Methods: POST

Takes a file object as well as a json containing the id of the author and the email of the recipient

Python Ex.

files = {'file': open("example_file.txt", "rb")}
values = {'author_id': '2', 'email': 'bobby@aol.com'}

requests.post(url, files=files, data=values)




### Get all campaigns owned by a user
Route: api/campaigns/
Request type: GET
Payload: data = {‘user_id’}
Fields: 
- ‘user_id’ is the user’s id
Returns:
	If successful: status = 200, data = {“owner”: [ {“id” “name”, “camp_id”, … ]} 

### Create new campaign
Route: api/campaigns/
Request type: POST
Payload: data = {'owner', 'name'}
Fields:
- ‘owner’ is the user’s id
- ‘name’ is the name of the campaign (e.g. Piano Tuner job)
Returns:
	If successful: 201

### Send a letter to a campaign
Route: api/add-campaign/
Request type: PUT
Payload: data = {'letter_id',  'camp_id'}
Fields: 
- ‘letter_id’ is letter’s actual id
- ‘camp_id’ is Campaign field “camp_id”, not its actual id
Returns:
	If successful: status = 201
	If unsuccessful: status = 417, data = {“Error”}

Get all letters in a campaign
	Route: ‘api/campaign-letters/’
	Request type: GET
	Payload: data = {‘campaign_id’}
	Fields: 
		‘campaign_id’ is the campaign’s actual id, not its camp_id
	Returns:
		If successful: status = 200, data = {“my_campaigns”: [{'id', 'author', 'candidate', 'title'}...]}