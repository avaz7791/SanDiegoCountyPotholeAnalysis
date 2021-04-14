-- Database: sdc_pothole

-- DROP DATABASE sdc_pothole;

CREATE DATABASE sdc_pothole
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
	
CREATE SCHEMA pothole
    AUTHORIZATION postgres;	
	
-- Table creation
--Stage
-- Table: pothole.stg_historical_weather

DROP TABLE IF EXITS pothole.stg_historical_weather;

CREATE TABLE pothole.stg_historical_weather
(
    "STATION" text COLLATE pg_catalog."default",
    "NAME" text COLLATE pg_catalog."default",
    "LATITUDE" text COLLATE pg_catalog."default",
    "LONGITUDE" text COLLATE pg_catalog."default",
    "ELEVATION" text COLLATE pg_catalog."default",
    "DATE" text COLLATE pg_catalog."default",
    "DAPR" text COLLATE pg_catalog."default",
    "MDPR" text COLLATE pg_catalog."default",
    "PRCP" text COLLATE pg_catalog."default",
    "TAVG" text COLLATE pg_catalog."default",
    "TMAX" text COLLATE pg_catalog."default",
    "TMIN" text COLLATE pg_catalog."default",
    "TOBS" text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE pothole.stg_historical_weather
    OWNER to postgres;
	
-- Table: pothole.stg_pothole

DROP TABLE IF EXISTS pothole.stg_pothole;

CREATE TABLE pothole.stg_pothole
(
    service_request_id text COLLATE pg_catalog."default",
    service_request_parent_id text COLLATE pg_catalog."default",
    sap_notification_number text COLLATE pg_catalog."default",
    date_requested text COLLATE pg_catalog."default",
    case_age_days text COLLATE pg_catalog."default",
    service_name text COLLATE pg_catalog."default",
    case_record_type text COLLATE pg_catalog."default",
    date_closed text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    lat text COLLATE pg_catalog."default",
    lng text COLLATE pg_catalog."default",
    street_address text COLLATE pg_catalog."default",
    zipcode text COLLATE pg_catalog."default",
    council_district text COLLATE pg_catalog."default",
    comm_plan_code text COLLATE pg_catalog."default",
    comm_plan_name text COLLATE pg_catalog."default",
    park_name text COLLATE pg_catalog."default",
    case_origin text COLLATE pg_catalog."default",
    referred text COLLATE pg_catalog."default",
    public_description text COLLATE pg_catalog."default",
    iamfloc text COLLATE pg_catalog."default",
    floc text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE pothole.stg_pothole
    OWNER to postgres;	

--- END STAGE TABLES 

-- Table: pothole.potholes_f

DROP TABLE IF EXISTS potholes_f;

CREATE TABLE potholes_f
(
    pkpothole serial NOT NULL ,
    srvrequestid character varying(40) COLLATE pg_catalog."default",
    srvrequestparentid character varying(40) COLLATE pg_catalog."default",
    sapnotificationnumber character varying(40) COLLATE pg_catalog."default",
    skdaterequested integer,
    caseagedays integer,
    servicename character varying(100) COLLATE pg_catalog."default",
    caserecordtype character varying(40) COLLATE pg_catalog."default",
    skdateclosed integer,
    status character varying(40) COLLATE pg_catalog."default",
    latitude double precision,
    longitude double precision,
	district double precision,
    CONSTRAINT f_potholes_pkey PRIMARY KEY (pkpothole)
)

TABLESPACE pg_default;

ALTER TABLE potholes_f
    OWNER to postgres;
	
	
-- Table: pothole.weather_f

DROP TABLE IF EXISTS pothole.weather_f;

CREATE TABLE pothole.weather_f
(
	pkweatherid serial not null primary key,
    station character varying(50) COLLATE pg_catalog."default",
    name character varying(50) COLLATE pg_catalog."default",
    latitude double precision,
    longitude double precision,
    elevation double precision,
    skdate integer,
    dapr integer,
    mdpr double precision,
    prcp double precision,
    tempaverage integer,
    tempmax integer,
    tempmin integer,
    tempobs integer
)

TABLESPACE pg_default;

ALTER TABLE pothole.weather_f
    OWNER to postgres;

	