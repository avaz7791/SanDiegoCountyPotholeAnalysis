function focusPothole(el) {
    // Reset the pothol 
    id = el.id;
    // Focus on the chosen pothole in the map
}


function resetPothole(el) {
    // Resets the pothole layer to unfocus from all the visible potholes
}

// Jeriel -------
var myMap = L.map("map", {
  center: [32.7157, -117.1611],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var potholejson = "pothole_cy.json";

d3.json(potholejson, function(response) {

  console.log(response);

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      L.marker([location.coordinates[0], location.coordinates[1]]).addTo(myMap);
    }
  }

});
//Jeriel--------^