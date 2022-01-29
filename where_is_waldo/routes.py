from where_is_waldo import app, db_object
from flask import render_template, request, url_for

lvl_characters = {
    '1' : [
            {
                'name' : 'Goku', 
                'source': 'Drangon Ball Z', 
                'difficulty': 'Easy'
            },
            {   'name': 'Leo', 
                'source': 'Ninja Turtles', 
                'difficulty': 'Medium'
            }, 
            {   'name' : 'Mike', 
                'source': 'Monster Inc.',
                'difficulty': 'Hard'
            }
        ],
     '2' : [
            {
                'name' : 'Sus', 
                'source': 'Among Us', 
                'difficulty': 'Easy'
            },
            {   'name': 'Yubaba', 
                'source': 'Spirited Away', 
                'difficulty': 'Medium'
            }, 
            {   'name' : 'Mario', 
                'source': 'Super Mario',
                'difficulty': 'Hard'
            }
        ],
      '3' : [
            {
                'name' : 'Ryuk', 
                'source': 'Death Note', 
                'difficulty': 'Easy'
            },
            {   'name': 'Tom', 
                'source': 'Tom and Jerry', 
                'difficulty': 'Medium'
            }, 
            {   'name' : 'Patrick', 
                'source': 'SpongeBob Square Pants',
                'difficulty': 'Hard'
            }
        ],
}

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/level/<lvl>")
def level(lvl):
    return render_template("level.html",characters=lvl_characters[lvl], lvl=lvl)

@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')

@app.route('/post_user')
def post_user():
    return url_for('leaderboard')


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
    