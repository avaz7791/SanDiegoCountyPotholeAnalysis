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

# or "postgresql://postgres:456789123@localhost:5432/sdc_pothole"
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
    return redirect(url_for('static', filename='geojson/council_districts_datasd.geojson'))

@app.route("/api/sdcpa_data")
def sdcpa_data():
    pothole_response = db.session.query(Pothole.srvrequestid, Pothole.latitude, Pothole.longitude, Pothole.status, \
                                            Pothole.daterequest, Pothole.monthrequest, Pothole.monthclosed, Pothole.dateclosed, \
                                                Pothole.caseagedays, Pothole.servicename, Pothole.district).all()
    weather_response = db.session.query(Weather.pkid, Weather.dateRequest, Weather.station, Weather.name, \
                                            Weather.latitude, Weather.longitude, Weather.monthRequest, Weather.elevation,  \
                                                Weather.mdpr, Weather.prcp).all()
    #print(results)

    # All the data in a dictionary
    data = {}

    # Parse pothole data into a dictionary
    pothole_cy_data = []
    unique_month_request = set()
    unique_date_request = set()
    unique_service_id = set()
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
        unique_month_request.add(pothole[5])
        unique_date_request.add(pothole[4])
        unique_service_id.add(pothole[0])

    # Extra features for filtering
    data["uniqueDateList"] = list(unique_date_request)
    data["uniqueMonthList"] = list(unique_month_request)
    data["minFilterDate"] = min(unique_date_request)
    data["maxFilterDate"] = max(unique_date_request)
    data["uniqueServiceIDList"] = list(unique_service_id)

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

@app.route("/api/sdcpa_summarydata")
def sdcpa_summarydata():
    sum_pothole_response = db.session.query(
                                            SumPotholeData.pksummaryid, SumPotholeData.year_actual, SumPotholeData.quarter_name, \
                                            SumPotholeData.month_actual, SumPotholeData.month_name, SumPotholeData.status, \
                                            SumPotholeData.cnt_new, SumPotholeData.cnt_inprocess, SumPotholeData.cnt_closed, \
                                            SumPotholeData.cnt_referred, SumPotholeData.total_cnt).all()

    sum_weather_response = db.session.query(SumWeatherData.pksummaryid, SumWeatherData.year_actual, SumWeatherData.quarter_name, SumWeatherData.month_actual, \
                                            SumWeatherData.month_name, SumWeatherData.dapr, SumWeatherData.mdpr, SumWeatherData.prcp ).all()
   
    #print(results) SumPotholeData, SumWeatherData

    # All the data in a dictionary
    sdata = {}

    # Parse summary pothole data into a dictionary
    SummaryPothole_data = []
    for spd in sum_pothole_response:
        SummaryPothole_data.append({"pksummaryid":spd[0] ,

                            "year_actual": spd[1],
                            "quarter_name": spd[2],
                            "month_actual"    : spd[3],
                            "month_name": spd[4],
                            "status": spd[5],
                            "cnt_new": spd[6],
                            "cnt_inprocess" : spd[7],
                            "cnt_closed": spd[8],
                            "cnt_referred": spd[9],
                            "total_cnt" : spd[10]
                            
                            })

    # Parse summary weather data into a dictionary
    SummaryWeather_data = []
    for swd in sum_weather_response:
        SummaryWeather_data.append({"pksummaryid":swd[0],
                            "year_actual": swd[1],
                            "quarter_name": swd[2],
                            "month_actual"    : swd[3],
                            "month_name": swd[4],
                            "dapr": swd[5],
                            "mdpr": swd[6],
                            "prcp" : swd[7] })

    sdata["summary_potholeAnalysis"] = SummaryPothole_data
    sdata["summary_weatherAnalysis"] = SummaryWeather_data

    return jsonify(sdata)

if __name__ == "__main__":
    app.run()