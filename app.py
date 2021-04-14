#import necessary libraries
try:
    from models import create_classes

    import os
    import json
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


app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace("://", "ql://", 1) or "postgresql://postgres:456789123@localhost:5432/sdc_pothole"
# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

Pothole, Weather, SumPotholeData, SumWeatherData = create_classes(db)

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

@app.route("/api/sdcpa_data")
def sdcpa_data():
    pothole_response = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude, Pothole.status, \
                                            Pothole.daterequest, Pothole.monthrequest, Pothole.monthclosed, Pothole.dateclosed, \
                                                Pothole.caseagedays, Pothole.servicename, Pothole.district).all()
    weather_response = db.session.query(Weather.pkid, Weather.dateRequest, Weather.station, Weather.name, \
                                            Weather.latitude, Weather.longitude, Weather.monthRequest, Weather.elevation,  \
                                                Weather.mdpr, Weather.prcp).all()
    # pothole_summary_response = db.session.query()
    #print(results)

    # All the data in a dictionary
    data = {}

    # Parse pothole data into a dictionary
    pothole_cy_data = []
    for pothole in pothole_response:
        pothole_cy_data.append({"srvrequestid":pothole[0],
                            "latitude": pothole[1],
                            "longitude": pothole[2],
                            "status"    : pothole[3],
                            "daterequest": pothole[4],
                            "monthrequest": pothole[5],
                            "monthclosed": pothole[6],
                            "dateclosed" : pothole[7],
                            "caseagedays": pothole[8],
                            "servicename": pothole[9],
                            "district" : pothole[10]})

    # Weather.dapr,
    #print(results)
    weather_cy_data = []
    for weather in weather_response:
        weather_cy_data.append({"ID":weather[0],
                                "daterequest": weather[1],
                                "station": weather[2],
                                "name": weather[3],
                                "latitude": weather[4],
                                "longitude": weather[5],
                                "monthrequest": weather[6],
                                "elevation": weather[7],
                                "mdpr" : weather[8],
                                "prcp": weather[9],
                                "marker": {
                                            "size": 50,
                                            "line": {
                                                "color": "rgb(8,8,8)",
                                                "width": 1
                                },
                                }
            })
    
    data["potholes_cy"] = pothole_cy_data
    data["weather_cy"] = weather_cy_data

    return jsonify(data)

    # data["potholes_cy"]
# @app.route("/api/pothole_cy")
# def pothole_cy():
#     results = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude ).all()
#     #print(results)
#     srvrequestid = [r[0]  for r in results]
#     latitude     = [r[1]  for r in results]
#     longitude    = [r[2]  for r in results]

        
#     pothole_data = [{
#         "srvrequestid": srvrequestid,
#         "lat": latitude,
#         "lon": longitude,
#          "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#          }
#     }]

#     return jsonify(pothole_data)

# @app.route("/api/pothole_all")
# def pothole_all():
#     results = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude, Pothole.status, Pothole.daterequest, Pothole.monthrequest, Pothole.monthclosed, Pothole.dateclosed, Pothole.caseagedays, Pothole.servicename, Pothole.district).all()
    
    
#     #print(results)
#     srvrequestid = [r[0]  for r in results]
#     latitude     = [r[1]  for r in results]
#     longitude    = [r[2]  for r in results]
#     status       = [r[3]  for r in results]
#     daterequest  = [r[4]  for r in results]
#     monthrequest = [r[5]  for r in results]
#     monthclosed  = [r[6]  for r in results]
#     dateclosed   = [r[7]  for r in results]
#     caseagedays  = [r[8]  for r in results]
#     servicename  = [r[9]  for r in results]
#     district     = [r[10]  for r in results]
        
#     pothole_data = [{
#         "srvrequestid": srvrequestid,
#         "lat": latitude,
#         "lon": longitude,
#         "status": status,
#         "daterequest": daterequest,
#         "monthRequest": monthrequest,
#         "dateClosed": dateclosed,
#         "monthClosed": monthclosed,
#         "caseagedays": caseagedays,
#         "servicename": servicename,
#         "district": district,
#          "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#          }
#     }]

#     return jsonify(pothole_data)

# @app.route("/api/weather_cy")
# def weather_cy():
#     results = db.session.query(Weather.pkid, Weather.dateRequest, Weather.station, Weather.name, Weather.latitude, Weather.longitude, Weather.monthRequest, Weather.elevation,  Weather.mdpr, Weather.prcp).all()
#     # Weather.dapr,
#     #print(results)
#     pkid            = [r[0]  for r in results]
#     dateRequest     = [r[1]  for r in results]
#     station         = [r[2]  for r in results]
#     name            = [r[3]  for r in results]
#     latitude        = [r[4]  for r in results]
#     longitude       = [r[5]  for r in results]
#     monthRequest    = [r[6]  for r in results]
#     elevation       = [r[7]  for r in results]
#     #dapr            = [r[8]  for r in results]
#     mdpr            = [r[9]  for r in results]
#     prcp            = [r[10]  for r in results]
        
#     weather_data = [{
#         "ID": pkid,
#         "station": station,
#         "name": name,
#         "daterequest": dateRequest,
#         "coordinates":{ 
#                 "lat": latitude,
#                 "lon": longitude},
#         "monthrequest": monthRequest,
        
#         "elevation": elevation,
#         #"dapr": dapr,
#         "mdpr": mdpr,
#         "prcp": prcp,
#          "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#          }
#     }]

#     return jsonify(weather_data)

if __name__ == "__main__":
    app.run()