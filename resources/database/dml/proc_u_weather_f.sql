create or replace procedure pothole.u_weather_f()
language plpgsql
as $$
begin

INSERT into pothole.weather_f(
	station, "name", latitude, longitude, elevation, skdate, dapr, mdpr, prcp, tempaverage, tempmax, tempmin, tempobs)
	
SELECT 
	trim("STATION"), 
	trim("NAME"), 
	case 
		when "LATITUDE" ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left("LATITUDE",10) as double precision ) 
	 	else 0.0 end as latitude,
	case 
		when "LONGITUDE" ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left("LONGITUDE",10) as double precision ) 
	 	else 0.0 end as longitude,
	case 
		when "ELEVATION" ~ '^[-+]?[0-9]*\.?[0-9]+$' then cast (left("ELEVATION",10) as double precision ) 
	 	else 0.0 end as elevation,
	cast(
		cast(date_part('year', 	cast("DATE" as date)) as varchar(4))||
		case 
		when date_part('month', cast("DATE" as date))< 10 
			then '0'||cast(date_part('month', cast("DATE" as date)) as varchar(1)) 
		else 
			cast(date_part('month', cast("DATE" as date)) as varchar(2)) 
		end ||
		case 
		when date_part('day', cast("DATE" as date))< 10 
			then '0'||cast(date_part('month', cast("DATE" as date)) as varchar(1)) 
		else 
			cast(date_part('day', cast("DATE" as date)) as varchar(2)) 
		end as integer) as skdate,
	
	cast("DAPR" as integer) as dapr, 
	cast("MDPR"as double precision) as dmpr,  
	cast("PRCP"as double precision) as prcp,  
	cast("TAVG" as integer) as tempaverage,   
	cast("TMAX" as integer) as tempmax,  
	cast("TMIN" as integer) as tempmin,   
	cast("TOBS" as integer) as tempobs 
	
FROM 
	pothole.stg_historical_weather 

commit;
end;
$$;	

	
	