from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Config SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Bryan/racing_info.db' # Bryan's path to database/change as needed
db = SQLAlchemy(app)

# Create models for your tables
class Circuit(db.Model):
    __tablename__ = 'circuit_info'
    id = db.Column(db.Integer, primary_key=True)
    circuit_name = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))

class Driver(db.Model):
    __tablename__ = 'driver_info'
    id = db.Column(db.Integer, primary_key=True)
    driver = db.Column(db.String(50))
    nationality = db.Column(db.String(50))
    team = db.Column(db.String(50))
    age = db.Column(db.Integer)
    salary = db.Column(db.Integer)

class Race(db.Model):
    __tablename__ = 'race_schedule'
    id = db.Column(db.Integer, primary_key=True)
    race = db.Column(db.String(50))
    date = db.Column(db.Date)

@app.route('/circuits', methods=['GET'])
def get_circuits():
    circuits = Circuit.query.all()
    data = [{'Circuit Name': c.circuit_name, 'Latitude': c.latitude, 'Longitude': c.longitude, 'City': c.city, 'Country': c.country} for c in circuits]
    return jsonify(data)

@app.route('/drivers', methods=['GET'])
def get_drivers():
    drivers = Driver.query.all()
    data = [{'Driver': d.driver, 'Nationality': d.nationality, 'Team': d.team, 'Age': d.age, 'Salary': d.salary} for d in drivers]
    return jsonify(data)

@app.route('/races', methods=['GET'])
def get_races():
    races = Race.query.all()
    data = [{'Race': r.race, 'Date': r.date.strftime('%Y-%m-%d')} for r in races]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
