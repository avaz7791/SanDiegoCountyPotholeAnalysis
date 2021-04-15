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
    
    resetData(minFilterDate, maxFilterDate, potholes);
});

// var filteredDates = [];
// var filteredIDs = [];
d3.select("#filter-form").on("submit", filterData);
d3.select("#filter-button").on("click", filterData);


function resetData(minDate, maxDate, potholes) {
    filteredPotholes = [];
    // Clear the list
    d3.select("#filteredList").html("")
    for (var dix = 0; (dix<potholes.length); dix++) {
        date = potholes[dix].date;
        id = potholes[dix].id;
        // filter dates
        if (date >= minDate && 
                date <= maxDate) {
            filteredPotholes.push(potholes[dix]);
            // Append to the list
            d3.select("#filteredList").append("li")
                        .attr("class", "list-group-item list-group-item-action")
                        .attr("id", id)
                        .attr("data-toggle", "list")
                        .attr("role", "tab")
                        .text(date)
        }
    }

    // return filteredPotholes;
}


function filterData() {
    // d3.event.preventDefault();
    // select summary text and make it read
    var isDatesOk = checkFromToDates(d3.select("#dateRangeHelp"));
    var minDate = d3.select("#fromDate").property("value");
    var maxDate = d3.select("#toDate").property("value");

    if (isDatesOk) {
        resetData(minDate, maxDate, potholes);
    }
    else {console.log("Choose correct range");}
}

function checkFromToDates(formHelp) {
    // Check for range
    if (d3.select("#fromDate").property("value") > d3.select("#toDate").property("value")) {
        formHelp.text("From: cannot be larger than To:")
                .attr("class", "form-text text-danger error");
        return false;
    }
    // Check for null
    else if (d3.select("#fromDate").property("value") == "" || 
        d3.select("#toDate").property("value") == "") {
        formHelp.text("Choose a valid date")
            .attr("class", "form-text text-danger error");
        return false;
    }
    // Default value
    formHelp.text("").attr("class", "form-text text-mute");
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
