This project attempts to find any correlations between the following

1. Weather
2. Pothole formation in dry weather vs after a storm
3. City responsiveness to pothole repair based on neighborhood

Using information from the City of San Diego “Get it Done” website [https://www.sandiego.gov/get-it-done]() we were able to download a CSV containing historical data about the City of San Diego (not county) potholes.

The original file had approximately 80,000 pothole reports between May 2016 and March 2021.  We had to trim it down to 10,000 to stay within the 10K record limit for the free tier of the Heroku hosted PostGreSQL database (is this what we're using?)

##Premise:
San Diego potholes are reported at a near-steady state during dry weather, but pothole reports will spike 2-7 days after a significant (1/4” or more) of rain.

## Charts:

Scatter with linear regression:

* Pothole reports during a calendar year
* Pothole reports during the dry season (April – October)
* Pothole reports during wet season (November – March)
	*	Is there a difference?  
* Overlay that shows significant rain events (can be toggled)*

*I think this might be too hard to do on a heat map in a way that makes sense.

## Map(s):

San Diego County or a zoomed-in area that covers the City of San Diego portion of the county with markers for each pothole.
The markers will be color coded for how quickly the report was closed out.

* 1-2 days = green
* 3-4 days = yellow
* 5 or more days = red

Since the close-out times are strictly date information, we will ignore the time portion of the “reported” date.  If a pothole is reported on the 1st and closed out by the 3rd, it will count as a green.  1st and 4th, a yellow; 1st and 6th (or later) a red 


If we can figure out how to convert a shapefile to geojson  we will overlay the different City Council districts to see if there is an observable trend on which part of the city/which districts get their potholes repaired more quickly.


