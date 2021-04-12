def create_classes(db):
    class Pothole(db.Model):
        __tablename__ = 'pothole_cy'

        yearRequest  = db.Column(db.Integer)
        monthRequest = db.Column(db.String(10)) 
        dateRequest  = db.Column(db.Date)
        yearClosed   = db.Column(db.Integer)
        monthClosed  = db.Column(db.String(10)) 
        dateClosed   = db.Column(db.Date)
        srvrequestid = db.Column(db.String(50), primary_key=True) 
        caseagedays  = db.Column(db.Integer)
        status       = db.Column(db.String(50)) 
        servicename  = db.Column(db.String(40)) 
        latitude     = db.Column(db.Float)
        longitude    = db.Column(db.Float)
        district     = db.Column(db.Float)

        def __repr__(self):
            return '<Pothole %r>' % (self.srvrequestid)
    return Pothole
