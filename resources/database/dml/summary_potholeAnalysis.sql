INSERT INTO pothole."summary_potholeAnalysis"(
	year_actual, quarter_name, month_actual, month_name, status, cnt_new, cnt_inprocess, cnt_closed, cnt_referred)

select 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	p.status,
	sum(case when p.status ='New' then 1 else 0 end ) as cnt_new,
	sum(case when p.status ='In Process' then 1 else 0 end ) as cnt_inProcess,
	sum(case when p.status ='Closed' then 1 else 0 end ) as cnt_closed,
	sum(case when p.status ='Referred' then 1 else 0 end ) as cnt_referred
	--count(p.srvrequestid) as cnt_requests

from pothole.potholes_f p
join pothole.date_dim dt on p.skdaterequested  = dt.date_dim_id

group by 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	p.status
	
order by 1	
	--select distinct status 	from pothole.potholes_f p
	
	
	
	