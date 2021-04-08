-- Table: public.summary_potholeAnalysis

DROP TABLE if exists public."summary_potholeAnalysis";

CREATE TABLE public."summary_potholeAnalysis"
(
    year_actual integer,
    quarter_name character varying(10) COLLATE pg_catalog."default",
    month_actual integer,
    month_name character varying(5) COLLATE pg_catalog."default",
    status character varying(40) COLLATE pg_catalog."default",
    cnt_new integer,
    cnt_inprocess integer,
    cnt_closed integer,
    cnt_referred integer,
	total_cnt integer
)

TABLESPACE pg_default;

ALTER TABLE public."summary_potholeAnalysis"
    OWNER to postgres;