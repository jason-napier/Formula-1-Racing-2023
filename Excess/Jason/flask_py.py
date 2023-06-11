from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/data')
def get_data():
    import sqlite3

    # Connect to the SQLite database
    conn = sqlite3.connect('BryansDatabase.db')

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # Retrieve data from the "results" table
    cursor.execute("SELECT * FROM results")
    results = cursor.fetchall()

    # Retrieve data from the "races" table
    cursor.execute("SELECT * FROM races")
    races = cursor.fetchall()

    # Close the database connection
    conn.close()

    # Return the data as JSON
    return jsonify({'results': results, 'races': races})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()
