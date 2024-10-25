from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    # Sample data or use your API here
    return jsonify({
        "Caller_Details": 5,
        "Concerns_List": 8,
        "Program_Fit": 7,
        "Follow_Up_Actions": 2
    })

if __name__ == "__main__":
    app.run(debug=True)
