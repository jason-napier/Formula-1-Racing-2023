from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Date
from sqlalchemy.orm import Session

# import os

# file_path = os.path.abspath(os.getcwd())+"Final/formula1.db"

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
class Circuit(Base):
    __tablename__ = 'circuit_info'
    # id = Column(Integer, primary_key=True)
    Circuit= Column(String(50), primary_key=True)
    Latitude = Column(Float)
    Longitude = Column(Float)
    City = Column(String(50))
    Country = Column(String(50))

class Driver(Base):
    __tablename__ = 'driver_info'
    # id = Column(Integer, primary_key=True)
    Driver = Column(String(50), primary_key=True)
    Nationality = Column(String(50))
    Team = Column(String(50))
    Age = Column(Integer)
    Salary = Column(Integer)

class Race(Base):
    __tablename__ = 'race_schedule'
    # id = Column(Integer, primary_key=True)
    Race = Column(String(50), primary_key=True)
    Date = Column(Date)

# Start Session
session = Session(bind=engine)

#Check Class
circuits = session.query(Circuit)
for x in circuits:
    print(x.Circuit)

#Close session
session.close


# @app.route('/circuits', methods=['GET'])
# def get_circuits():
#     circuits = Circuit.query.all()
#     data = [{'Circuit Name': c.Circuit, 'Latitude': c.Latitude, 'Longitude': c.Longitude, 'City': c.City, 'Country': c.Country} for c in circuits]
#     return jsonify(data)
#     # print(jsonify(data))

# @app.route('/drivers', methods=['GET'])
# def get_drivers():
#     drivers = Driver.query.all()
#     data = [{'Driver': d.driver, 'Nationality': d.nationality, 'Team': d.team, 'Age': d.age, 'Salary': d.salary} for d in drivers]
#     return jsonify(data)

# @app.route('/races', methods=['GET'])
# def get_races():
#     races = Race.query.all()
#     data = [{'Race': r.race, 'Date': r.date.strftime('%Y-%m-%d')} for r in races]
#     return jsonify(data)

# if __name__ == '__main__':
#     app.run(debug=True)
