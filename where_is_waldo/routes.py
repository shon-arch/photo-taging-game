from where_is_waldo import app, db_object
from flask import render_template, request

lvl_characters = {
    '1' : ['Goku', 'Leo', 'Mike'],
    '2' : ['Sus', 'Yubaba', 'Mario'],
    '3' : ['Ryuk', 'Tom', 'Patrick']
}

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/level/<lvl>")
def level(lvl):
    return render_template("level.html",characters=lvl_characters[lvl], lvl=lvl)
    

@app.route("/verify/<character>")
def verify(character):
    x_coordinate = request.args.get('x_coordinate', type=int)
    y_coordinate = request.args.get('y_coordinate', type=int)
    character_data = db_object.db.characterCoordinates.find_one_or_404({'name':character})
    
    if((x_coordinate <= character_data['x_coordinate']+20) and
       (x_coordinate >=character_data['x_coordinate']-20) and
       (y_coordinate <= character_data['y_coordinate']+40) and
       (y_coordinate >=character_data['y_coordinate']-40)):
        return {'Message' : 'success'}
    return {'Message' : 'failed'}
    