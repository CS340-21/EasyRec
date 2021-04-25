import sys
import random
import string
import json
import requests
import time
from tqdm import tqdm

num_samples = 15
base_url = "http://127.0.0.1:8000/api/"

try:
    verbose = (sys.argv[1] == "-v")
except:
    verbose = False
    
# ------------------ Create dummy data -------------------

def r_str(email=False):
    letters = string.ascii_letters
    s = ''.join(random.choice(letters) for i in range(15))
    if email:
        s += "@gmail.com"
    return s
        
def make_user(a, b, c, d):
    return {
        "email": str(a),
        "password": str(b),
        "first_name": str(c),
        "last_name": str(d),
    }

new_users = []
user_data = []

for i in range(num_samples):
    new_user = make_user(r_str(email=True), r_str(), r_str(), r_str())
    new_users.append(new_user)
    
# --------------- Register New Users -------------
print("\nTesting User Registration:")

num_succesful = 0
r_path = base_url + "register/"

for i, user in enumerate(tqdm(new_users, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    receive = requests.post(r_path, data=user)
    if receive.status_code == 201:
        num_succesful += 1
        user_data.append(user)
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)
        
print("Succesfully registered: {0} / {1}\n".format(num_succesful, num_samples))

# ------------------ Login Users --------------------
print("Testing User Login:")

num_succesful = 0
r_path = base_url + "token-auth/"

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    data = {"username": user["email"], "password": user["password"]}
    receive = requests.post(r_path, data=data)
    if receive.status_code == 200:
        user_data[i]["user_id"] = json.loads(receive.text)['user_id']
        num_succesful += 1
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()
        
    time.sleep(0.1)
        
print("Succesfully logged in: {0} / {1}\n".format(num_succesful, num_samples))

# -------------------- Upload Letters ---------------------
print("Testing Letter Upload:")

num_succesful = 0
r_path = base_url + "upload/"

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    user_id = user_data[(i+1)%num_samples]['user_id']
    data = {"author_id": user_id, "email": user['email']}
    files = {"file": open("test_file.txt", "rb")}
    receive = requests.post(r_path, files=files, data=data)
    if receive.status_code == 201:
        num_succesful += 1
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)
        
print("Succesfully uploaded: {0} / {1}\n".format(num_succesful, num_samples))

# ------------------ Look up Letters --------------------
print("Testing Retrieve Letter:")

num_succesful = 0

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    r_path = base_url + "user/" + str(user["user_id"])
    receive = requests.get(r_path)
    if receive.status_code == 200:
        num_succesful += 1
        letter_id = json.loads(receive.text)['written'][0]['id']
        user_data[i]['letter'] = letter_id
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)
        
print("Succesfully Retrieved: {0} / {1}\n".format(num_succesful, num_samples))

# ------------------ Create Campaigns ------------------------
print("Testing campaign creation:")

campaign_names = [r_str() for i in range(num_samples)]
num_succesful = 0
r_path = base_url + 'campaigns/'

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    data = {"owner": user['user_id'], "name": campaign_names[i]}
    receive = requests.post(r_path, data=data)
    if receive.status_code == 201:
        num_succesful += 1
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)
        
print("Succesfully Created: {0} / {1}\n".format(num_succesful, num_samples))

# ----------------- Look up Campaigns ----------------------
print("Testing Campaign Lookup:")

num_succesful = 0
r_path = base_url + 'campaigns/'

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    data = {"user_id": user['user_id']}
    receive = requests.get(r_path, data=data)
    if receive.status_code == 200:
        num_succesful += 1
        camp_id = json.loads(receive.text)['owner'][0]['camp_id']
        user_data[i]['camp_id'] = camp_id
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()
        
    time.sleep(0.1)

print("Succesfully Searched: {0} / {1}\n".format(num_succesful, num_samples))

# ----------------- Send Letters to Campaigns ----------------------

print("Testing Send Letter:")

num_succesful = 0
r_path = base_url + 'add-campaign/'

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    data = {"letter_id": user['letter'], 'camp_id': user['camp_id']}
    receive = requests.put(r_path, data=data)
    if receive.status_code == 201:
        num_succesful += 1
    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            print("Request payload:", user)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)

print("Succesfully Sent: {0} / {1}\n".format(num_succesful, num_samples))

# --------------- Test User Deletion -------------
print("Deleting Dummy Users:")

num_succesful = 0

for i, user in enumerate(tqdm(user_data, bar_format='{l_bar}{bar:30}{r_bar}{bar:-30b}')):
    r_path = base_url + "user/" + str(user["user_id"])
    receive = requests.delete(r_path)
    if receive.status_code == 204:
        num_succesful += 1

    else:
        if verbose:
            print("Status:", receive.status_code)
            print("Message:", receive.text)
            if(input("\nPress [Enter] to continue or [q] to quit:  ") == 'q'):
                sys.exit()

    time.sleep(0.1)
        
print("Succesfully deleted: {0} / {1}\n".format(num_succesful, num_samples))
