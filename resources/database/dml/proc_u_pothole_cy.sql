-- PROCEDURE: public.u_pothole_f()

-- DROP PROCEDURE public.u_pothole_f();

CREATE OR REPLACE PROCEDURE public.u_pothole_f(
	)
LANGUAGE 'plpgsql'
AS $BODY$
begin

INSERT INTO potholes_f ( srvrequestid, srvrequestparentid, sapnotificationnumber, skdaterequested, caseagedays, servicename, caserecordtype, skdateclosed, status, latitude, longitude, district)
	
SELECT 
	 trim(service_request_id)
	,trim(service_request_parent_id)
	,trim(sap_notification_number)
	,case when date_requested='' then null
	 	  else cast(replace(left(date_requested,10),'-','') as integer) end as skdaterequested
	,cast(case_age_days as integer) as caseagedays
	,trim(service_name)
	,trim(case_record_type)
	,case when date_closed='' then null 
		  else cast(left(replace(date_closed,'-',''),8) as integer)
	 end as skdateclosed
	,trim(status)
	,case 
		when lat ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left(lat,10) as double precision ) 
	 	else 0.0 end as latitude
	,case 
		when lng ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left(lng,10) as double precision ) 
	 	else 0.0 end as longitude	
	,case 
		when council_district ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left(council_district,10) as double precision ) 
	 	else 0.0 end as district
	
from
stg_pothole

commit;
end;
$BODY$;
