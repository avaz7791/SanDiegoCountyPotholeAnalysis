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
            if (dix < 100) {
                d3.select("#filteredList").append("li")
                    .attr("class", "list-group-item list-group-item-action")
                    .attr("id", pothole.id)
                    .attr("data-toggle", "list")
                    .attr("role", "tab")
                    .text(
                        "<h5>Service ID: " + pothole.id +
                        "<h5><h5>Status: " + pothole.status + 
                        "<h5><h5>Date Requested: " + pothole.date +
                        "<h5><h5>Case Age: " + pothole.age
                        );
            }
            
        }
    }
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

function focusPothole(id) {
    // Reset the pothole focus
    resetPothole(id);
    console.log(id);
    // Focus on the chosen pothole in the map
}


function resetPothole(id) {
    // Resets the pothole layer to unfocus from all the visible potholes
    console.log("Pothole focus reset for " + id)
}
