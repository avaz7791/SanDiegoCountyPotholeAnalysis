def create_classes(db):
    class Pothole(db.Model):
        __tablename__ = 'pothole_cy'

        yearrequest  = db.Column(db.Integer)
        monthrequest = db.Column(db.String(10)) 
        daterequest  = db.Column(db.Date)
        yearclosed   = db.Column(db.Integer)
        monthclosed  = db.Column(db.String(10)) 
        dateclosed   = db.Column(db.Date)
        srvrequestid = db.Column(db.String(50), primary_key=True) 
        caseagedays  = db.Column(db.Integer)
        status       = db.Column(db.String(50)) 
        servicename  = db.Column(db.String(40)) 
        latitude     = db.Column(db.Float)
        longitude    = db.Column(db.Float)
        district     = db.Column(db.Float)

        def __repr__(self):
            return '<Pothole %r>' % (self.srvrequestid)
    
    class Weather(db.Model):
        __tablename__ = 'weather_cy'
        
        pkid         = db.Column(db.Integer, primary_key=True)
        yearRequest  = db.Column(db.Integer)
        monthRequest = db.Column(db.String(10)) 
        dateRequest  = db.Column(db.Date)
        station      = db.Column(db.String(50)) 
        name         = db.Column(db.String(50)) 
        latitude     = db.Column(db.Float)
        longitude    = db.Column(db.Float)
        elevation    = db.Column(db.Float)
        dapr         = db.Column(db.Integer)
        mdpr         = db.Column(db.Float)
        prcp         = db.Column(db.Float)
                

        def __repr__(self):
            return '<Weather %r>' % (self.pkid)

    class SumPotholeData(db.Model):
        __tablename__ = 'summary_potholeAnalysis'
        
        pksummaryid    = db.Column(db.Integer, primary_key=True)
        year_actual    = db.Column(db.Integer)
        quarter_name   = db.Column(db.String(10)) 
        month_actual   = db.Column(db.Integer)
        month_name     = db.Column(db.String(5)) 
        status         = db.Column(db.String(40)) 
        cnt_new        = db.Column(db.Integer)
        cnt_inprocess  = db.Column(db.Integer)
        cnt_closed     = db.Column(db.Integer)
        cnt_referred   = db.Column(db.Integer)
        total_cnt      = db.Column(db.Integer)
        
        def __repr__(self):
            return '<SumPotholeData %r>' % (self.pksummaryid)

    class SumWeatherData(db.Model):
        __tablename__ = 'summary_weatherAnalysis'
        
        pksummaryid    = db.Column(db.Integer, primary_key=True)
        year_actual    = db.Column(db.Integer)
        quarter_name   = db.Column(db.String(10)) 
        month_actual   = db.Column(db.Integer)
        month_name     = db.Column(db.String(5)) 
        dapr           = db.Column(db.Float)
        mdpr           = db.Column(db.Float)
        prcp           = db.Column(db.Float)
        
        def __repr__(self):
            return '<SumWeatherData %r>' % (self.pksummaryid)



    return (Pothole, Weather, SumPotholeData, SumWeatherData)


