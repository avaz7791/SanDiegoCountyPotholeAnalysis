// query data
$.get('./data.csv', function(csvString) {

    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
  
    // For each row in data, create a marker and add it to the map
    // For each row, columns `Latitude`, `Longitude`, and `Title` are required
    for (var i in data) {
      var row = data[i];
  
      var marker = L.marker([row.Latitude, row.Longitude], {
        opacity: 1
      }).bindPopup(row.Title);
      
      marker.addTo(map);
    }
  
  
  
    // variable for earthquake objects
  var potholeobject = L.geoJSON(data.features, {pointToLayer: function(quakeData, coords) {
    
    
    
    return L.circle(coords, {
      radius: quakeData.properties.mag * 8000,
      color: "black",
      fillColor: markercolor(quakeData.geometry.coordinates[2]),
      fillOpacity: .75,
      opacity: .8,
      weight:.5
    });
  },
  onEachFeature: onEachFeature
  });
  
      // function for earthquake object colors
      function markercolor(pothole) {
          }
  
        
      // streetmap layer
      var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 26,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });
  
      // map layer and legend variables
      var baseMaps = {"Street Map": streetmap};
      var overlayMaps = {Earthquakes: potholeobject};
      var legenddata = L.control({position: "bottomright"});
      
      // initializing the map
      var myMap = L.map("mapid", {
        center: [40, -105],
        zoom: 5.5,
        layers: [streetmap, potholeobject]
      });
  
      
      // legend info
      legenddata.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var casedays = ["-10-10","10-30","30-50","50-70","70-90","90+"];
        var colors = ["#FDECEC", "#FFC1C1", "#FFA1A1", "#FF6969", "#FF3F3F", "#FF0000"]
        div.innerHTML += "Days to fill pothole (km)<br><br>"
       
        for (var i = 0; i < casedays.length; i++) {
          div.innerHTML += "<div width='50' height='50' style='float:left; background-color:" + colors[i] + "'>&nbsp&nbsp&nbsp&nbsp</div>&nbsp&nbsp" + casedays[i] + "<br>";};
          return div;
      };
  
      // event listener for earthquake objects
      function onEachFeature(feature, layer) {
        layer.bindPopup(
          " " + new Date(feature.properties.time) +
          " " + feature.properties.mag +
          " " + feature.properties.place +
          " " + feature.geometry.coordinates[2]);
        }
  
  
  
      
  
      // legend object to map
      legenddata.addTo(myMap);
    
  