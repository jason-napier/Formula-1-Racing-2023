import os
import json
import requests

endpoints = [
    'circuits',
    'drivers'
    'results'
]

base_url = 'http://ergast.com/api/f1/2023/'

def save_data_to_file(endpoint, data):
    filename = f'{endpoint}.json'
    filepath = os.path.join(os.path.dirname(__file__), filename)
    try:
        with open(filepath, 'w') as file:
            json.dump(data, file)
        print(f'Successfully created file: {filename}')
    except Exception as e:
        print(f'Error creating file: {filename}')
        print(str(e))

for endpoint in endpoints:
    url = f'{base_url}{endpoint}.json'
    response = requests.get(url)
    data = response.json()
    save_data_to_file(endpoint, data)
