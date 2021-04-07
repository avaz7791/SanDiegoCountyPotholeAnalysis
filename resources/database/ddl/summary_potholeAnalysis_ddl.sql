-- Table: pothole.summary_potholeAnalysis

DROP TABLE IF EXISTS pothole."summary_potholeAnalysis";

CREATE TABLE pothole."summary_potholeAnalysis"
(
    year_actual integer,
    quarter_name character varying(10) COLLATE pg_catalog."default",
    month_actual integer,
    month_name character varying(5) COLLATE pg_catalog."default",
    status character varying(40) COLLATE pg_catalog."default",
    cnt_new integer,
    cnt_inprocess integer,
    cnt_closed integer,
    cnt_referred integer
)

TABLESPACE pg_default;

ALTER TABLE pothole."summary_potholeAnalysis"
    OWNER to postgres;