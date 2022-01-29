from flask import Flask
from flask_pymongo import PyMongo
import os
import urllib 


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://waldo:" + urllib.parse.quote(os.environ.get('PASSWORD')) + "@cluster0.f496s.mongodb.net/waldo?retryWrites=true&w=majority"
db_object= PyMongo(app)


from where_is_waldo import routes