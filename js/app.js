// Amir

function buildPlot() {

  // const url ='/api/pothole_cy';
  // d3.json(url).then(function(response){
  //     console.log(response);

  //     const data = response;

  //     const layout = {
  //       scope: "San Diego",
  //       title: "Potholes",
  //       showlegend: false,
  //       height: 600,
  //             // width: 980,
  //       geo: {
  //         scope: "usa",
  //         projection: {
  //           type: "San Diego"
  //         },
  //         showland: true,
  //         landcolor: "rgb(217, 217, 217)",
  //         subunitwidth: 1,
  //         countrywidth: 1,
  //         subunitcolor: "rgb(255,255,255)",
  //         countrycolor: "rgb(255,255,255)"
  //       }
  //     };
  
  //     Plotly.newPlot("plot", data, layout);
  // });

}


//Amir






function focusPothole(el) {
    // Reset the pothol 
    id = el.id;
    // Focus on the chosen pothole in the map
}


function resetPothole(el) {
    // Resets the pothole layer to unfocus from all the visible potholes
}

// Jeriel -------
//border layer------------------------------
// var myMap = L.map("mapid", {
//   center: [32.7157, -117.1611],
//   zoom: 11
// });









// Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// // Use this link to get the geojson data.
var link = "../geojson/council_districts_datasd.geojson";

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

// Grabbing our GeoJSON data..
d3.json(link, function(data) 
{
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
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
});



//end border layer--------------------------------------------









//var potholejson = "pothole_cy.json";

// d3.json(potholejson, function(response) {

//   console.log(response);

//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].location;

//     if (location) {
//       L.marker([location.coordinates[0], location.coordinates[1]]).addTo(myMap);
//     }
//   }

// });
//Jeriel--------^




//marker cluster--------------------
// Store API query variables
// var baseURL = "https://sdcpothole.herokuapp.com/api/pothole_cy";
// var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assemble API query URL
// var url = baseURL;

// // Grab the data with d3
// d3.json(url, function(response) {

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var location = response[i].location;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);

// });

var myMap = L.map("mapid", {
  center: [32.7157, -117.1611],
  zoom: 11
});
    

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=10000";

// Assemble API query URL
var url = baseURL + date + complaint + limit;

// Grab the data with d3
d3.json(url, function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].descriptor));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
