from where_is_waldo import app, db_object
from flask import render_template, request

@app.route("/")
def home():
    return render_template("level.html")

@app.route("/verify/<character>")
def verify(character):
    x_coordinate = request.args.get('x_coordinate', type=int)
    y_coordinate = request.args.get('y_coordinate', type=int)
    character_data = db_object.db.characterCoordinates.find_one_or_404({'name':'Goku'})
    
    if((x_coordinate <= character_data['x_coordinate']+20) and
       (x_coordinate >=character_data['x_coordinate']-20) and
       (y_coordinate <= character_data['y_coordinate']+40) and
       (y_coordinate >=character_data['y_coordinate']-40)):
        return {'Message' : 'success'}
    return {'Message' : 'failed'}
    