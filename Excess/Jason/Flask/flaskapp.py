from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float

# import os

# file_path = os.path.abspath(os.getcwd())+"Final/formula1_database.db"

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
# db = SQLAlchemy(app)

# app = Flask(__name__)

# # Config SQLite database
# app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///Final/formula1.db' # Bryan's path to database/change as needed
# db = SQLAlchemy(app)

#Init engine
engine = create_engine("sqlite:///formula1.db")

#Create Base
Base = declarative_base()










# Create models for your tables
class Circuit(db.Model):
    __tablename__ = 'circuit_info'
    # id = db.Column(db.Integer, primary_key=True)
    Circuit= db.Column(db.String(50), primary_key=True)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    City = db.Column(db.String(50))
    Country = db.Column(db.String(50))

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
    data = [{'Circuit Name': c.Circuit, 'Latitude': c.Latitude, 'Longitude': c.Longitude, 'City': c.City, 'Country': c.Country} for c in circuits]
    return jsonify(data)
    # print(jsonify(data))

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
