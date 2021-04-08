-- Table: pothole.pothole_cy

DROP TABLE IF EXISTS pothole.pothole_cy;

CREATE TABLE pothole.pothole_cy
(
    "yearRequest" integer,
    "monthRequest" character varying(10) COLLATE pg_catalog."default",
    "dateRequest" date,
    "yearClosed" integer,
    "monthClosed" character varying(10) COLLATE pg_catalog."default",
    "dateClosed" date,
    srvrequestid character varying(50) COLLATE pg_catalog."default",
    caseagedays integer,
    status character varying(50) COLLATE pg_catalog."default",
    servicename character varying(40) COLLATE pg_catalog."default",
    latitude double precision,
    longitude double precision
)

TABLESPACE pg_default;

ALTER TABLE pothole.pothole_cy
    OWNER to postgres;