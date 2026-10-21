from flask import Flask, jsonify, render_template, request
import ast
import math
import operator

app = Flask(__name__)


def calculate_expression(expression:str):
    import sys
    global err
    err = 1
    try:
       value = eval(expression)
    except Exception as e:
       err = 0
       return err,e
    return err,value

@app.get("/")
def index():
    return render_template("index.html")


@app.post("/api/calculate")
def api_calculate():
    data = request.get_json(silent=True) or {}
    expression = data.get("expression", "")
    try:
        error_code,answer = calculate_expression(expression)
        if error_code!=0:
            return jsonify({"result": answer})
        else:
            return jsonify({"error": str(answer)}), 400
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400


if __name__ == "__main__":
    app.run(debug=True)
