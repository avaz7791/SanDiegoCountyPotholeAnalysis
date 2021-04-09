//import necessary libraries
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)



    #################################################
    # Flask Setup
    #################################################
    app = Flask(__name__)
    
    #################################################
    # Database Setup
    #################################################
    
    from flask_sqlalchemy import SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
    
    # Remove tracking modifications
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db = SQLAlchemy(app)






















// //var myMap = L.map("map", {
//   center: [32.7157, -117.1611],
//   zoom: 13
// });

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// var newtry = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=1000";

// d3.json(newtry, function(response) {

//   console.log(response);

//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].location;

//     if (location) {
//       L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
//     }
//   }

// });
