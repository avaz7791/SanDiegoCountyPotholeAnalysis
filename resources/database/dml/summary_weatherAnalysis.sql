INSERT INTO pothole."summary_weatherAnalysis"(
	year_actual, quarter_name, month_actual, month_name,  neighborhood_name, latitude, longitude, dapr, mdpr, prcp)

select 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	trim(w.name),
	w.latitude,
	w.longitude,
	sum(w.dapr) as dapr,
	sum(w.mdpr) as mdpr,
	sum(w.prcp) as prcp
	
from pothole.weather_f w
join pothole.date_dim dt on w.skdate  = dt.date_dim_id

group by 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	w.name,
	w.latitude,
	w.longitude
	
order by 1	

