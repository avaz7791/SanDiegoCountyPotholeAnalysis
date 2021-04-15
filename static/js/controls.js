/**
 * Date reading will be done using d3.json after
 * jsonifying the dictionary into a route defined in app.py
 * Here, I'm using sample values to prepare the html files
 * and the javascript accordingly.
 */

// var cityList = ["San Diego", "Clairemont", "La Jolla"]


function utcToISODate(str) {
    d = new Date(str);
    return d.toISOString().slice(0,10);
}

var potholes = [];
var filteredPotholes = []

var myMap = L.map("mapid", {
    center: [32.7157, -117.1611],
    zoom: 11
});

// Grabbing our GeoJSON data..Update File
// d3.json("/api/sdcpa_data").then(function(response) 
// {
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

// Create a new marker cluster group
var markers = L.markerClusterGroup();

// Read from d3.json
d3.json("/api/sdcpa_data").then(function(data) {
    // Parse all dates into %YYY-MM-DD format
    ///////////////////////////////////////////
    ///////////////////////////////////////////


    var minFilterDate = utcToISODate(data.minFilterDate);
    var maxFilterDate = utcToISODate(data.maxFilterDate);
    data.potholes_cy.forEach(function(pothole) {
        potholes.push({
            "id": pothole.srvrequestid,
            "date": utcToISODate(pothole.daterequest),
            "age": pothole.caseagedays,
            "latitude": pothole.latitude,
            "longitude": pothole.longitude,
            "status": pothole.status
        });
    });
    // var monthLst = data.uniqueMonthList;
    // idLst = data.uniqueServiceIDList;

        // set min and max date value for filters
    
    d3.select("#fromDate").attr("min", minFilterDate)
                .attr("max", maxFilterDate);
    d3.select("#toDate").attr("min", minFilterDate)
                .attr("max", maxFilterDate);
    
    resetData(minFilterDate, maxFilterDate);
    filterMarkers(potholes)
});

// var filteredDates = [];
// var filteredIDs = [];
d3.select("#filter-form").on("submit", filterData);
d3.select("#filter-button").on("click", filterData);


function resetData(minDate, maxDate) {
    filteredPotholes = [];
    // Clear the list
    d3.select("#filteredList").html("")
    for (var dix = 0; (dix<potholes.length); dix++) {
        pothole = potholes[dix]
        // filter dates
        if (pothole.date >= minDate && 
                pothole.date <= maxDate) {
            filteredPotholes.push(pothole);
            // Append to the list
            d3.select("#filteredList").append("li")
                .attr("class", "list-group-item list-group-item-action")
                .attr("id", pothole.id)
                .attr("data-toggle", "list")
                .attr("role", "tab")
                .html(
                    "<h5>Service ID:</h5>" + pothole.id + "<br>" + 
                    "<h5>Status:</h5>" + pothole.status + "<br>"  +
                    "<h5>Date Requested:</h5>" + pothole.date + "<br>" +
                    "<h5>Case Age:</h5>" + pothole.age
                    );
            
        }
    }

    filterMarkers(filteredPotholes);
}


function filterData() {
    // d3.event.preventDefault();
    // select summary text and make it read
    var isDatesOk = checkFromToDates();
    var minDate = d3.select("#fromDate").property("value");
    var maxDate = d3.select("#toDate").property("value");

    if (isDatesOk) {
        resetData(minDate, maxDate, potholes);
    }
    else {console.log("Choose correct range");}
}

function checkFromToDates() {
    // Check for range
    if (d3.select("#fromDate").property("value") > d3.select("#toDate").property("value")) {
        d3.select("#dateRangeHelp").text("From: cannot be larger than To:")
                .attr("class", "form-text text-danger error");
        return false;
    }
    // Check for null
    else if (d3.select("#fromDate").property("value") == "" || 
        d3.select("#toDate").property("value") == "") {
            d3.select("#dateRangeHelp").text("Choose a valid date")
            .attr("class", "form-text text-danger error");
        return false;
    }
    // Default value
    d3.select("#dateRangeHelp").text("").attr("class", "form-text text-mute");
    return true;
}


function chooseColor(objectid) {
    switch (objectid) {
    case 1:
      return "red";
    case 2:
      return "orange";
    case 3:
      return "yellow";
    case 4:
      return "#6f7b0d" //greenish;
    case 5:
      return "blue";
    case 6:
      return "brown";
    case 7:
      return "purple";
    case 8:
      return "#fc11ca";
    default:
      return "black";
    }
  }
  

function filterMarkers(filteredPotholes) {
      markers.clearLayers();

      // Loop through data
      for (var i = 0; i < filteredPotholes.length; i++) {
        filteredPothole = filteredPotholes[i]
        // Set the data location property to a variable
        var phlocation = [filteredPothole.latitude, filteredPothole.longitude]
        
      
        // Check for location property4
       {
      
          // Add a new marker to the cluster group and bind a pop-up
          markers.addLayer(L.marker([phlocation[0], phlocation[1]])
              .bindPopup("<h5>Service ID: " + filteredPothole.id +
              "</h5><h5>Status: " + filteredPothole.status + 
              "</h5><h5>Date Requested: " + filteredPothole.date +
              "</h5><h5>Case Age: " + filteredPothole.age + 
              "</h5><h5>Coordinates: " + filteredPothole.latitude + ", " + filteredPothole.longitude + "</h5>"))
      
        }
        
      }
      
      // Add our marker cluster layer to the map
      myMap.addLayer(markers);
      // });
     
}

function addDistricts() {  // districts_data = response.council_districts_datasd
    d3.json("/council_districts_datasd").then(function(response) {
      // Creating a geoJSON layer with the retrieved data
      L.geoJson(response, {
        style: function(feature) {
          return {
            color: "black",
            fillColor: chooseColor(feature.properties.objectid),
            fillOpacity: 0.4,
            weight: 1.5
          };
        
        },
        // Called on each feature
        onEachFeature: function(feature, layer) {
          // Set mouse events to change map styling
          layer.on({
            // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.2
              });
            },
            // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.4
              });
            },
            // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
            click: function(event) {
              myMap.fitBounds(event.target.getBounds());
            }
          });
          // Giving each feature a pop-up with information pertinent to it
          layer.bindPopup("<h2>District: " + feature.properties.district + "</h2>");
    
        }
      }).addTo(myMap);
    });
}
