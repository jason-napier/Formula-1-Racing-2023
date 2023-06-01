from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# API base URL
API_BASE_URL = "http://ergast.com/api/f1"

# Home route
@app.route('/')
def home():
    return render_template('index.html')

# Endpoint to fetch driver information
@app.route('/api/drivers/<driver_id>')
def get_driver_info(driver_id):
    url = f"{API_BASE_URL}/drivers/{driver_id}.json"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

# Endpoint to fetch constructor information
@app.route('/api/constructors/<constructor_id>')
def get_constructor_info(constructor_id):
    url = f"{API_BASE_URL}/constructors/{constructor_id}.json"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

# Endpoint to fetch race results
@app.route('/api/races/<season>/<round>/results')
def get_race_results(season, round):
    url = f"{API_BASE_URL}/{season}/{round}/results.json"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

# Endpoint to fetch standings
@app.route('/api/standings/<season>/<round>')
def get_standings(season, round):
    url = f"{API_BASE_URL}/{season}/{round}/driverStandings.json"
    response = requests.get(url)
    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
