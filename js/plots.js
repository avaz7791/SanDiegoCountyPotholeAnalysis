var summaryPothole = [];
var summaryWeather = [];

//d3.csv("/resources/summary_pothole.csv").then(data => summaryPothole=data);
//d3.csv("/resources/summary_weather.csv").then(data => summaryWeather=data);

/**
 * Mockup data for preparing the html and js files
 * Real data will be read from d3.json after jsonifying the data
 * to a route in app.py
 */
// Unique years 
years = ["2016", "2017", "2018", "2019", "2020", "2021"];
precipitationPerYear = [688.66, 1195.24, 938.52, 2130.25, 1311.2, 409.98];
potholesPerYear = [4914,24100,11912,20748,14548,4023];

// Unique months
months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"];
precipitationPerMonth = [1351.51,1410.98,974.88,538.95,289.89,27.87,
                        21.05,20.09,85.06,74.44,770.36,1108.77];
potholesPerMonth = [13561,13296,11643,6788,5508,4839,
                    3723,3444,3478,3734,3739,6492];


var dataPerYear = [
  {
    type: "bar",
    x: years,
    y: potholesPerYear,
    name: "Potholes",
    color: "rgb(0,0,255)"
  },
  {
    type: "scatter",
    mode: "lines",
    x: years,
    y: precipitationPerYear,
    yaxis: "y2",
    name: "Precipitation",
    color: "rgb(255,0,0)"
   }
];

var layoutPerYer = {
    title: "Potholes per year",
    yaxis: {
        title: "Pothole counts",
        titlefont: {color: "rgb(0,0,255)"},
        tickfont: {color: "rgb(0,0,255)"}
    },
    yaxis2: {
        title: "Precipitation (?)",
        overlaying: "y",
        side: "right",
        titlefont: {color: "rgb(255,0,0)"},
        tickfont: {color: "rgb(255,0,0)"}
    }
};

var config = {responsive: true};

Plotly.newPlot("plotPerYear", dataPerYear, layoutPerYer, config)



// Plot per month
var dataPerMonth = [
    {
      type: "bar",
      x: months,
      y: potholesPerMonth,
      name: "Potholes",
      color: "rgb(0,0,255)"
    },
    {
      type: "scatter",
      mode: "lines",
      x: months,
      y: precipitationPerMonth,
      yaxis: "y2",
      name: "Precipitation",
      color: "rgb(255,0,0)"
     }
  ];
  
  var layoutPerMonth = {
      title: "Potholes per month",
      yaxis: {
          title: "Pothole counts",
          titlefont: {color: "rgb(0,0,255)"},
          tickfont: {color: "rgb(0,0,255)"}
      },
      yaxis2: {
          title: "Precipitation (?)",
          overlaying: "y",
          side: "right",
          titlefont: {color: "rgb(255,0,0)"},
          tickfont: {color: "rgb(255,0,0)"}
      }
  };
  
  Plotly.newPlot("plotPerMonth", dataPerMonth, layoutPerMonth, config)