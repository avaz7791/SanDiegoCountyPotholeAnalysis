INSERT INTO pothole_cy(
	"yearRequest", "monthRequest", "dateRequest", "yearClosed", "monthClosed", "dateClosed", srvrequestid, caseagedays, status, servicename, latitude, longitude, district)
	
select 
	dtr.year_actual as yearRequest,
	dtr.month_name_abbreviated as monthRequest,
	dtr.date_actual as dateRequest,
	dtc.year_actual as yearClosed,
	dtc.month_name_abbreviated as monthClosed,
	dtc.date_actual as dateClosed,
	p.srvrequestid,
	p.caseagedays,
	p.status,
	p.servicename,
	p.latitude,
	p.longitude,
	p.district
	
from potholes_f p
left join date_dim dtr on dtr.date_dim_id = p.skdaterequested
left join date_dim dtc on dtc.date_dim_id = p.skdateclosed

where dtr.year_actual in (2021)


select * from pothole_cy


