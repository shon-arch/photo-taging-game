from where_is_waldo import app 
from flask import render_template

@app.route("/")
def home():
    return render_template("level.html")