
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

var myMap = L.map("mapid", {
  center: [32.7157, -117.1611],
  zoom: 11
});

// Grabbing our GeoJSON data..Update File
d3.json("/api/sdcpa_data").then(function(response) 
{
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

  // Loop through data
  for (var i = 0; i < response.potholes_cy.length; i++) {

    // Set the data location property to a variable
    var phlocation = [response.potholes_cy[i].latitude, response.potholes_cy[i].longitude]
    

    // Check for location property4
    if (phlocation) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([phlocation[0], phlocation[1]])
         .bindPopup("<h3>" + "TEST" + 24 + "</h3><h5>" + response.potholes_cy[i].latitude + "</h5>"))
    }
    
  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);
});

// districts_data = response.council_districts_datasd
d3.json("/council_districts_datasd").then(function(districts_data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(districts_data, {
    style: function(feature) {
      return {
        color: "black",
        fillColor: chooseColor(feature.properties.objectid),
        fillOpacity: 0.5,
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
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.district + "</h1> <hr> <h2>" + feature.properties.district + "</h2>");

    }
  }).addTo(myMap);
})
  