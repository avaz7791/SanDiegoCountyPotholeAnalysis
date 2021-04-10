# import necessary libraries
#from models import create_classes???????
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from c_fig import dbkey

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# Heroku server connection
conn = psycopg2.connect(
    host="ec2-54-211-176-156.compute-1.amazonaws.com",
    database="da9sl2d3dh1uah",
    user="gjijwlitunzqrh",
    password="a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b"
)


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get( 'DATABASE_URL', '') or "postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

##db = SQLAlchemy(app)????


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


#@app.route("/pothole_cy")
def pothole_data_pull():
    curr = conn.cursor()

    curr.execute("select srvrequestid, caseagedays, latitude, longitude from pothole_cy")
    rows = curr.fetchall()

    
    requestid = [r[0] for r in rows]
    caseage = [r[1] for r in rows]
    coordinates = [[r[2] for r in rows],[r[3] for r in rows]]

    
    potholedata = [{    
        "Service Request ID": requestid,
        "Case Age Days" : caseage,
        "Location": {"Coordinates": coordinates}
    }]

    curr.close()
    conn.close()
    return jsonify(potholedata)


if __name__ == "__main__":
    app.run()
