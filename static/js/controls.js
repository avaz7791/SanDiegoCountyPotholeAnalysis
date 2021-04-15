/**
 * Date reading will be done using d3.json after
 * jsonifying the dictionary into a route defined in app.py
 * Here, I'm using sample values to prepare the html files
 * and the javascript accordingly.
 */
var minFilterDate;
var maxFilterDate;
var dateLst = [];
var idLst = [];
// var cityList = ["San Diego", "Clairemont", "La Jolla"]


function utcToISODate(str) {
    d = new Date(str);
    return d.toISOString().slice(0,10);
}

// Read from d3.json
d3.json("/api/sdcpa_data").then(function(data) {
    // Parse all dates into %YYY-MM-DD format
    ///////////////////////////////////////////
    ///////////////////////////////////////////
    minFilterDate = utcToISODate(data.minFilterDate);
    maxFilterDate = utcToISODate(data.maxFilterDate);
    dateLst = [];
    data.uniqueDateList.forEach(function(datestr) {
        dateLst.push(utcToISODate(datestr))
    });
    // var monthLst = data.uniqueMonthList;
    idLst = data.uniqueServiceIDList;

        // set min and max date value for filters
    
    d3.select("#fromDate").attr("min", minFilterDate)
                .attr("max", maxFilterDate);
    d3.select("#toDate").attr("min", minFilterDate)
                .attr("max", maxFilterDate);
});

d3.select("#filter-form").on("submit", filterData);
d3.select("#filter-button").on("click", filterData);

var filteredDates = [];
var filteredIDs = [];
resetData(minFilterDate, maxFilterDate);

function resetData(minDate, maxDate) {
    filteredDates = [];
    filteredIDs = [];
    // Clear the list
    d3.select("#filteredList").html("")
    for (var dix = 0; (dix<dateLst.length && dix<100); dix++) {
        date = dateLst[dix];
        id = idLst[dix];
        // filter dates
        if (date >= d3.select("#fromDate").property("value") && 
                date <= d3.select("#toDate").property("value")) {
            filteredDates.push(date);
            filteredIDs.push(id);
            // Append to the list
            filteredList.append("li")
                        .attr("class", "list-group-item list-group-item-action")
                        .attr("id", id)
                        .attr("data-toggle", "list")
                        .attr("role", "tab")
                        .text(date)
        }
    }
}


function filterData() {
    // d3.event.preventDefault();
    // select summary text and make it read
    var isDatesOk = checkFromToDates(d3.select("#dateRangeHelp"));
    var minDate = d3.select("#fromDate").property("value");
    var maxDate = d3.select("#toDate").property("value");

    if (isDatesOk) {
        resetData(minDate, maxDate);
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
