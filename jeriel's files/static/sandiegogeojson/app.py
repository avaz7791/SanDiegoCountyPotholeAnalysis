#import necessary libraries
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)



#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"
#os.environ.get('DATABASE_URL', '') or "postgres://gjijwlitunzqrh:a3722514ebcbdb13b7548855c5794e8205c88e8c18e9fef14b989481433b517b@ec2-54-211-176-156.compute-1.amazonaws.com:5432/da9sl2d3dh1uah"
# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


Pot = create_classes(db)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
#@app.route("/send", methods=["GET", "POST"])
#def send():
   # if request.method == "POST":
      #  name = request.form["year_actual"]
        # qn= request.form["quarter_name"]
        # lon = request.form["month_actual"]

       # pot = Pot(name=name)
       # db.session.add(pot)
      #  db.session.commit()
      #  return redirect("/", code=302)

   # return render_template("form.html")


@app.route("/api/pothole_cy")
def ping():
    results = db.session.query(Pot.pothole_cy).all()
    print(results)
    
    return jsonify(results)


if __name__ == "__main__":
    app.run()