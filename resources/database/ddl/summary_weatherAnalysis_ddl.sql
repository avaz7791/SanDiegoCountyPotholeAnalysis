-- Table: pothole.summary_potholeAnalysis

DROP TABLE if exists pothole."summary_weatherAnalysis";

CREATE TABLE pothole."summary_weatherAnalysis"
(
    year_actual integer,
    quarter_name character varying(10),
    month_actual integer,
    month_name character varying(5),
	neighborhood_name character varying(100),
	latitude double precision,
	longitude double precision,
	dapr double precision,
	mdpr double precision,
	prcp double precision
)

TABLESPACE pg_default;

ALTER TABLE pothole."summary_weatherAnalysis"
    OWNER to postgres;