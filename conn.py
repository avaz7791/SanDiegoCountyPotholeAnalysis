import psycopg2

conn = psycopg2.connect(
        host = "ec2-54-211-176-156.compute-1.amazonaws.com",
        database = "da9sl2d3dh1uah",
        user = "gjijwlitunzqrh",
        password = "a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b"
)

curr = conn.cursor()

curr.execute("select srvrequestid, caseagedays, latitude, longitude from pothole_cy")
rows = curr.fetchall()


requestid = [r[0] for r in rows]
caseage = [r[1] for r in rows]
lat = [r[2] for r in rows]
lon =   [r[3] for r in rows]


potholedata = [{
        "Service Request ID": requestid,
        "Case Age Days" : caseage,
        "Latitude": lat,
        "Longitude": lon,
    }]

curr.close()
    
conn.close()