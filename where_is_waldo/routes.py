import json
from where_is_waldo import app, db_object
from flask import render_template, request, url_for, redirect, jsonify

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/level/<lvl>")
def level(lvl):
    level_data = db_object.db.levelCharacters.find_one({'level' : int(lvl)})
    return render_template("level.html",characters=level_data['data'], lvl=lvl)

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/post_user', methods=['POST'])
def post_user():
    body = request.get_json()
    db_object.db.leaderboard.insert_one({'username': body['username'], 'time' : body['time'],'level': body['level']})
    return {'Message': 'Success'}, 201

@app.route("/leaderboard_level")
def leaderboard_level():
    level = request.args.get('level')
    user_info = db_object.db.leaderboard.find({'level': str(level)})
    user_info = list(user_info)
    user_data = [[x['username'],x['time']] for x in user_info ]
    return jsonify(user_data)
    

@app.route("/verify/<character>")
def verify(character):
    x_coordinate = request.args.get('x_coordinate', type=float)
    y_coordinate = request.args.get('y_coordinate', type=float)
    character_data = db_object.db.characterCoordinates.find_one_or_404({'name':character})
    
    if((x_coordinate <= character_data['x_coordinate']+0.02) and
       (x_coordinate >=character_data['x_coordinate']-0.02) and
       (y_coordinate <= character_data['y_coordinate']+0.04) and
       (y_coordinate >=character_data['y_coordinate']-0.04)):
        return {'Message' : 'success'}
    return {'Message' : 'failed'}
    