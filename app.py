#import necessary libraries
try:
    from models import create_classes

    import os
    from flask import (
        Flask,
        render_template,
        jsonify,
        request,
        redirect,
        url_for)
    from flask_sqlalchemy import SQLAlchemy

    from sqlalchemy.orm import Session
    from sqlalchemy import create_engine, inspect, func
    from c_fig import dbkey

except Exception as e:
        print(f'a module(s) have not been imported {e}')

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace("://", "ql://", 1) 
#or "postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"
#"postgresql://postgres:456789123@localhost:5432/sdc_pothole"
# or "postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"

#"postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"
#os.environ.get('DATABASE_URL', '') 

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

Pothole = create_classes(db)

# create route that renders index.html template
@app.route("/")
@app.route("/index")
def home():
    return render_template("index.html")

@app.route("/stats")
def stats():
    return render_template("stats.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/team")
def team():
    return render_template("team.html")

@app.route("/project")
def project():
    return render_template("project.html")

# Query the database and send the jsonified results
    
    #     monthRequest = db.Column(db.strin(10)) 
    #     dateRequest = db.Column(db.date)
    #     yearClosed  = db.Column(db.Integer)
    #     monthClosed = db.Column(db.strin(10)) 
    #     dateClosed  = db.Column(db.date)
    #     srvrequestid = db.Column(db.strin(50)) 
    #     caseagedays = db.Column(db.Integer)
    #     status = db.Column(db.strin(50)) 
    #     servicename = db.Column(db.strin(40)) 



@app.route("/api/pothole_cy")
def pothole_cy():
    results = db.session.query(Pothole.yearRequest, Pothole.latitude, Pothole.longitude).all()
    print(results)
    yearRequest = [r[0]  for r in results]
    latitude    = [r[1] for r in results]
    longitude   = [r[2] for r in results]

    pothole_data = [{
        "year": yearRequest,
        "lat": latitude,
        "lon": longitude,

         "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
         }
    }]

    return jsonify(pothole_data)

@app.route("/council_districts_datasd")
def council_districts_datasd():
    return redirect(url_for("static", filename="geojson/council_districts_datasd.geojson"))

if __name__ == "__main__":
    app.run()