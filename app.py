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
    results = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude, Pothole.status, Pothole.daterequest, Pothole.monthrequest, Pothole.monthclosed, Pothole.dateclosed, Pothole.caseagedays,Pothole.servicename, Pothole.district ).all()
    
    
    #print(results)
    srvrequestid = [r[0]  for r in results]
    latitude     = [r[1]  for r in results]
    longitude    = [r[2]  for r in results]
    status       = [r[3]  for r in results]
    daterequest  = [r[4]  for r in results]
    monthrequest = [r[5]  for r in results]
    monthClosed  = [r[6]  for r in results]
    dateClosed   = [r[7]  for r in results]
    caseagedays  = [r[8]  for r in results]
    servicename  = [r[9]  for r in results]
    district     = [r[10]  for r in results]
        
    pothole_data = [{
        "srvrequestid": srvrequestid,
        "lat": latitude,
        "lon": longitude,
        "status": status,
        "daterequest": daterequest,
        "monthRequest": monthrequest,
        "dateClosed": dateclosed,
        "monthClosed": monthclosed,
        "caseagedays": caseagedays,
        "servicename": servicename,
        "district": district,
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