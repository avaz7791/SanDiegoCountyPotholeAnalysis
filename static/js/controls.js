/**
 * Date reading will be done using d3.json after
 * jsonifying the dictionary into a route defined in app.py
 * Here, I'm using sample values to prepare the html files
 * and the javascript accordingly.
 */


// Read from d3.json
d3.json("/api/sdcpa_data").then(function(data) {
    var minFilterDate = data.minFilterDate;
    var maxFilterDate = data.maxFilterDate;
    var dateLst = data.uniqueDateList;
    var monthLst = data.uniqueMonthList;
    var serviceIDLst = data.uniqueServiceIDList;

    // set min and max date value for filters
    var fromDatePicker = d3.select("#fromMonth");
    var toDatePicker = d3.select("#toMonth");

    fromDatePicker.attr("min", minFilterDate)
                .attr("max", maxFilterDate);
    toDatePicker.attr("min", minFilterDate)
                .attr("max", maxFilterDate);

    var filterForm = d3.select("#filter-form");
    var filterButton = d3.select("#filter-button");

    filterForm.on("submit", filterData);
    filterButton.on("click", filterData);

    resetData(minFilterDate, maxFilterDate, dateLst);
})



// var minFilterDate = "2021-01-01";
// var maxFilterDate = "2021-03-10";
// var dateLst = ["2021-01-15", "2021-03-10", "2021-02-14", "2021-02-10"];
// var idLst = ["1000", "2000", "3000", "4000"]
// var cityList = ["San Diego", "Clairemont", "La Jolla"]

// // set min and max date value for filters
// var fromDatePicker = d3.select("#fromMonth");
// var toDatePicker = d3.select("#toMonth");

// fromDatePicker.attr("min", minFilterDate)
//               .attr("max", maxFilterDate);
// toDatePicker.attr("min", minFilterDate)
//             .attr("max", maxFilterDate);

// var filterForm = d3.select("#filter-form");
// var filterButton = d3.select("#filter-button");

// filterForm.on("submit", filterData);
// filterButton.on("click", filterData);

// resetData(minFilterDate, maxFilterDate, dateLst); 

function resetData(minDate, maxDate, dateLst) {
    var filteredDates = [];
        var filteredIDs = [];
        var filteredList = d3.select("#filteredList");
        // Clear the list
        filteredList.html("")
        for (var dix = 0; (dix<dateLst.length && dix<100); dix++) {
            date = dateLst[dix];
            id = idLst[dix];
            // filter dates
            if (date >= minDate && date <= maxDate) {
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
    var formHelp = d3.select("#monthRangeHelp");
    var isDatesOk = checkFromToDates(formHelp);
    var minDate = fromDatePicker.property("value");
    var maxDate = toDatePicker.property("value");

    if (isDatesOk) {
        resetData(minDate, maxDate);
    }
    else {console.log("Choose correct range");}
}

function checkFromToDates(formHelp) {
    // Check for range
    if (fromDatePicker.property("value") > toDatePicker.property("value")) {
        formHelp.text("From: cannot be larger than To:")
                .attr("class", "form-text text-danger error");
        return false;
    }
    // Check for null
    else if (fromDatePicker.property("value") == "" || 
        toDatePicker.property("value") == "") {
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
