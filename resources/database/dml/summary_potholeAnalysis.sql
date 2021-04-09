--truncate "summary_potholeAnalysis"

INSERT INTO "summary_potholeAnalysis"(
	year_actual, quarter_name, month_actual, month_name, status, cnt_new, cnt_inprocess, cnt_closed, cnt_referred, total_cnt)

select 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	p.status,
	sum(case when p.status ='New' then 1 else 0 end ) as cnt_new,
	sum(case when p.status ='In Process' then 1 else 0 end ) as cnt_inProcess,
	sum(case when p.status ='Closed' then 1 else 0 end ) as cnt_closed,
	sum(case when p.status ='Referred' then 1 else 0 end ) as cnt_referred,
	count(p.srvrequestid) as total_cnt

from potholes_f p
join date_dim dt on p.skdaterequested  = dt.date_dim_id

group by 
	dt.year_actual,
	dt.quarter_name,
	dt.month_actual,
	dt.month_name_abbreviated,
	p.status
	
order by 1	
	 
	
	
	