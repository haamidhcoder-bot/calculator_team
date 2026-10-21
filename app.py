from flask import Flask, jsonify, render_template, request
import ast
import math
import operator

app = Flask(__name__)


def calculate_expression(expression:str):
    import sys
    try:
       value = eval(expression)
    except Exception as e:
       return "Calculation Error:"+str(e)
    return value

@app.get("/")
def index():
    return render_template("index.html")


@app.post("/api/calculate")
def api_calculate():
    data = request.get_json(silent=True) or {}
    expression = data.get("expression", "")
    try:
        return jsonify({"result": calculate_expression(expression)})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400


if __name__ == "__main__":
    app.run(debug=True)
