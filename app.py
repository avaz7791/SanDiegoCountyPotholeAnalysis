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

@app.route("/council_districts_datasd")
def council_districts_datasd():
    return redirect(url_for("static", filename="geojson/council_districts_datasd.geojson"))

@app.route("/api/pothole_cy")
def pothole_cy():
    results = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude ).all()
    #Pothole.status, Pothole.dateRequest, Pothole.monthRequest, Pothole.monthClosed, Pothole.dateClosed, Pothole.caseagedays,Pothole.servicename, Pothole.latitude, Pothole.longitude).all()
    #, Pothole.district
    
    #print(results)
    srvrequestid = [r[0]  for r in results]
    latitude     = [r[1]  for r in results]
    longitude    = [r[2]  for r in results]
    #status       = [r[1]  for r in results]
    #dateRequest  = [r[2]  for r in results]
    #monthRequest = [r[3]  for r in results]
    #monthClosed  = [r[4]  for r in results]
    #dateClosed   = [r[5]  for r in results]
    #caseagedays  = [r[6]  for r in results]
    #servicename  = [r[7]  for r in results]
    
    #district     = [r[10]  for r in results]
        
    pothole_data = [{
        "srvrequestid": srvrequestid,
        "lat": latitude,
        "lon": longitude,
     #   "servicename": servicename,
      #  "status": status,
       # "dateRequest": dateRequest,
        #"monthRequest": monthRequest,
        #"dateClosed": dateClosed,
        #"monthClosed": monthClosed,
        #"caseagedays": caseagedays,
        
        #"district": district,
         "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
         }
    }]

    return jsonify(pothole_data)

@app.route("/api/pothole_all")
def pothole_all():
    results = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude,Pothole.status, Pothole.dateRequest ).all()
    #, Pothole.monthRequest, Pothole.monthClosed, Pothole.dateClosed, Pothole.caseagedays,Pothole.servicename).all()
    #, Pothole.district
    
    #print(results)
    srvrequestid = [r[0]  for r in results]
    latitude     = [r[1]  for r in results]
    longitude    = [r[2]  for r in results]
    status       = [r[3]  for r in results]
    dateRequest  = [r[4]  for r in results]
    #monthRequest = [r[3]  for r in results]
    #monthClosed  = [r[4]  for r in results]
    #dateClosed   = [r[5]  for r in results]
    #caseagedays  = [r[6]  for r in results]
    #servicename  = [r[7]  for r in results]
    
    #district     = [r[10]  for r in results]
        
    pothole_data = [{
        "srvrequestid": srvrequestid,
        "lat": latitude,
        "lon": longitude,
     #   "servicename": servicename,
        "status": status,
        "dateRequest": dateRequest,
        #"monthRequest": monthRequest,
        #"dateClosed": dateClosed,
        #"monthClosed": monthClosed,
        #"caseagedays": caseagedays,
        
        #"district": district,
         "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
         }
    }]

    return jsonify(pothole_data)


if __name__ == "__main__":
    app.run()