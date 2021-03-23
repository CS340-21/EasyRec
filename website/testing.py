import sys
import requests

base_url = "http://127.0.0.1:8000/"

def make_user(a, b, c, d):
    return {
        "email": str(a),
        "password": str(b),
        "first_name": str(c),
        "last_name": str(d)
    }

print("\nTesting User Registration: ", end="")

r_path = base_url + "api/register/"

users = [
    ("heigen@gmail.com", "123abc", "henry", "eigen"),
    ("bobby@aol.com", "901_blues", "bob", "dylan"),
    ("sulam@yahoo.com", "automata", "stanislaw", "ulam")
]

for i, u in enumerate(users):
    receive = requests.post(r_path, data=make_user(*u))
    if receive.status_code != 201:
        print("\nError", receive.status_code, "when registering user:", i)
        print(receive.text)
        sys.exit()

print("Succesfully registered users")





