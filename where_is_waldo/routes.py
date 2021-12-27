from where_is_waldo import app 
from flask import render_template, request

@app.route("/")
def home():
    return render_template("level.html")

@app.route("/verify/<character>", methods=['GET'])
def verify(character):
    x_cordinate = request.args.get('x_cordinate', type=int)
    y_cordinate = request.args.get('y_cordinate', type=int)
    
    return True