# from email import message
from unicodedata import name
from flask import Flask, redirect, render_template, request, url_for, session, flash
import sqlite3
from werkzeug.utils import secure_filename
import uuid as uuid
import os
import json
app = Flask(__name__)
app.secret_key = 'yash'


@app.route('/')
def home():
    return render_template("index.html", name="")


@app.route('/game')
def ashish():
    return render_template("game.html")


@app.route('/end.html')
def end():
    return render_template("end.html")


@app.route('/highscores')
def highscores():
    return render_template("highscores.html")


@app.route('/quiz', methods=['POST'])
def quiz():
    connection = sqlite3.connect('database.db')
    mycursor = connection.cursor()
    name = request.form['name']
    session['myname'] = name
    mycursor.execute('SELECT COUNT(name) FROM quiz WHERE name=?', (name,))
    a = mycursor.fetchone()
    l = str(a).strip("() ,")
    m = int(l)
    if (m != 0):
        return render_template("index.html", message="This team already exists!!",)
    else:
        print('Username does not exist')
        return render_template("game.html")   

    


@app.route('/process/<string:data>', methods=['post'])
def process(data):
    print("---------------------------------")
    print(data)
    print(type(data))
    datas = json.loads(data)
    print("---------------------------------")
    print(datas)
    print(type(datas))
    time = (datas['time'])
    score = (datas['score'])
    name = session.get('myname')
    connection = sqlite3.connect('database.db')
    my_cursor = connection.cursor()
    my_cursor.execute('INSERT INTO quiz VALUES(?,?,?)', (name, score, time))
    connection.commit()
    connection.close()
    # print()
    # print(datas['time'])
    # print(datas['score'])
    # print(time)
    # print(score)
    # print(name)
    # print()
    return render_template("index.html")


@app.route('/list/')
def about():


   con = sqlite3.connect("database.db")
   con.row_factory = sqlite3.Row
   
   cur = con.cursor()
   cur.execute("select * from quiz ORDER BY score DESC, time;")
   
   rows = cur.fetchall(); 
   return render_template("list.html",rows = rows)
   
if(__name__) == '__main__':
    app.run(debug=True)
