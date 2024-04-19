from flask import Flask,jsonify,request
from flask_mysqldb import MySQL
from flask_cors import CORS
from dotenv import load_dotenv
import MySQLdb.cursors
import os

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

load_dotenv()
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")
mysql = MySQL(app)

@app.route('/')
def hello_world():
    return 'Hello world'

@app.route('/login',methods = ['POST'])
def login():
    email = request.get_json().get("email")
    password = request.get_json().get("password")
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
    account = cursor.fetchone()
    if account:
        return jsonify({
            "status": True,
            "msg": "Successfully logged in"
        })
    return jsonify({"status": False, "msg": "Email/Password is wrong"}), 401

@app.route('/get-history',methods = ['GET'])
def history():
    history_data = []
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM history')
    hist = cursor.fetchall()
    for data in hist:
        history_data.append(data)
    return jsonify({"history": history_data})

@app.route('/reverser',methods = ['POST'])
def reverser():
    num = request.get_json().get("num")
    ret_num = int(num[len(num)::-1])
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO history (number, response, type) VALUES (%s, %s, "reverse")', (num, ret_num))
    mysql.connection.commit()
    return jsonify({"num":ret_num})

@app.route('/summation',methods = ['POST'])
def summation():
    num = request.get_json().get("num")
    sum = 0
    for i in num:
        sum += int(i)
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO history (number, response, type) VALUES (%s, %s, "summation")', (num, sum))
    mysql.connection.commit()
    return jsonify({"sum":sum})

if __name__ == "__main__":
     app.run()