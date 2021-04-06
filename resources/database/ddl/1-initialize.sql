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
	
	