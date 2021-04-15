# City of San Diego  Pothole Analysis
# Premise:
In 2015 the City of San Diego (the City) began a concerted effort to repave and repair streets that had been neglected for decades. Potholes are reported at a near-steady state during dry weather, but pothole reports will increase during the rainy season or years when there is above average precipitation. 
# Goal:
Discover correlations (if any) between weather and pothole formation.
Determine whether the City is seeing an annual decrease in pothole reports
Use this information to:
	Improve road repair crew scheduling
	Target historically problematic roads in the City
	Set future budgets for road repair
# Background:
In 2015, Mayor Faulconer initiated a program to accelerate the repaving of streets or the repair of potholes, without raising taxes to do so.  In 2016 the City began using their “Get it Done (GID) website to track pothole reports.
Using data collected by GID we were able to identify the report date, fix/closure date and location of every pothole reported to the City.  GID allows the reporting party to locate the pothole by using location data on the party’s phone or tablet, or if using a non-GPS enabled device (a laptop or desktop computer) by dragging a marker to the approximate point on a map.  The lat/long data can contain up to 6 digits after the decimal point, which is extremely accurate .  In reality it is much more precise than a consumer-grade GPS (7-13M)  can provide, not to mention accounting for the positional offset of the device in relation to the pothole. As a result, there is a significant chance that many of the reports are duplicates, but determining how many, and which, is beyond the scope of this project.
San Diego’s Mediterranean climate is split between a dry season that generally runs between April and October, and a wet season that runs between November and March.  For official records, the water year begins on October 1st and ends on September 30th of the following year.  The official rainfall for the county is measured at San Diego International Airport and has averaged just over 10” for the last 20 years. 

