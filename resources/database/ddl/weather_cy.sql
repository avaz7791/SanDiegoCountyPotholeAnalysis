INSERT INTO weather_cy(
	"yearRequest", "monthRequest", "dateRequest", 
	station, name, latitude, longitude, elevation, dapr, mdpr, prcp)
	
	select 
	dtr.year_actual as yearRequest,
	dtr.month_name_abbreviated as monthRequest,
	dtr.date_actual as dateRequest,
	p.station, 
	p.name, 
	p.latitude, 
	p.longitude, 
	p.elevation, 
	p.dapr, 
	p.mdpr, 
	p.prcp
	
from weather_f p
left join date_dim dtr on dtr.date_dim_id = p.skdate 

where dtr.year_actual in (2021)
and p.prcp <>0

