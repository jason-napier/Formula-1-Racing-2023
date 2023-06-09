from flask import Flask, render_template, json
import requests

app = Flask(__name__)

@app.route('/')
def home():
    response = requests.get('http://ergast.com/api/f1/2023/circuits.json')
    data = response.json()

    circuits = []
    for circuit in data['MRData']['CircuitTable']['Circuits']:
        circuit_info = {
            'circuitName': circuit['circuitName'],
            'lat': float(circuit['Location']['lat']),
            'long': float(circuit['Location']['long']),
            'locality': circuit['Location']['locality'],
            'country': circuit['Location']['country'],
        }
        circuits.append(circuit_info)

    return render_template('index.html', circuits=json.dumps(circuits))


if __name__ == "__main__":
    app.run(debug=True)
