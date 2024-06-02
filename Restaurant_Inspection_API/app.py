from flask import Flask, jsonify, request
from inspector import Inspector

app = Flask(__name__)
inspector = Inspector()

@app.route("/search", methods=["GET"])
def search():
    # Get query parameters from the request
    cuisine = request.args.get('cuisine')
    restaurant_name = request.args.get('restaurant_name')
    zipcode = request.args.get('zipcode')
    limit = int(request.args.get('limit', 10))  # Default limit is 10 if not provided

    # Call the get_inspections method with the query parameters
    inspections = inspector.get_inspections(cuisine=cuisine, restaurant_name=restaurant_name, zipcode=zipcode, limit=limit)

    # Return JSON response
    return jsonify({"data": inspections})

if __name__ == "__main__":
    app.run(host="localhost", port=5173, debug=False)
