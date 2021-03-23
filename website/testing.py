import sys
import requests

base_url = "http://127.0.0.1:8000/"

user_data = [
    ("heigen@gmail.com", "123abc", "henry", "eigen"),
    ("bobby@aol.com", "901_blues", "bob", "dylan"),
    ("sulam@yahoo.com", "automata", "stanislaw", "ulam")
]

def make_user(a, b, c, d):
    return {
        "email": str(a),
        "password": str(b),
        "first_name": str(c),
        "last_name": str(d)
    }

def make_login(a, b, c, d):
    return {
        "username": str(a),
        "password": str(b)
    }

# --------------------------------------------------------

print("\nTesting User Registration: ", end="")

users = [make_user(*u) for u in user_data]

r_path = base_url + "api/register/"

for i, u in enumerate(users):
    receive = requests.post(r_path, data=u)
    if receive.status_code != 201:
        print("\nError", receive.status_code, "when registering user:", i)
        print(receive.text)
        sys.exit()

print("Succesfully registered users\n")

# --------------------------------------------------------

print("Testing User Login: ", end="")

users = [make_login(*u) for u in user_data]

r_path = base_url + "api/token-auth/"

for i, u in enumerate(users):
    receive = requests.post(r_path, data=u)
    if receive.status_code != 200:
        print("\nError", receive.status_code, "loggin in user:", i)
        print(receive.text)
        sys.exit()

print("Succesfully logged in users\n")

# --------------------------------------------------------
