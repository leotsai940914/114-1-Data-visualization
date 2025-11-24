# Python Flask Web
import os
from flask import Flask, render_template, request, url_for
from werkzeug.utils import secure_filename
import pandas as pd

UPLOAD_FOLDER = "static/data"
ALLOWED_EXTENSIONS = set(["csv"])

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/submit", methods=["POST"])
def submit():
    print("Submit!")
    if request.method == "POST":
        if "file1" not in request.files:
            print("No file part")
            return render_template("index.html")
        file = request.files["file1"]
        if file.filename == "":
            print("No selected file")
            return render_template("index.html")
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            print(filename)
            describe_data = describe_handler(filename)
            print(describe_data.index)
            result = "File uploaded successfully"
        return render_template(
            "index.html",
            prediction=result,
            describe_column=describe_data.index.to_list(),
            describe_data=describe_data.to_json(orient="records"),
        )
    else:
        return render_template("index.html", prediction="Method not allowed")


@app.route("/call_data", methods=["POST"])
def call_data():
    if request.method == "POST":
        print("POST!")
        data = request.form
        print(data["message"])
        if "缺失值" in data["message"]:
            result = missing_reporter()
        elif "資料型態" in data["message"]:
            result = data_type_reporter()
        elif "筆數" in data["message"]:
            result = f"資料共有 {len(df)} 筆。"
        else:
            result = "目前尚未開發此功能。"
        return result

def describe_handler(filename):
    global df
    df = pd.read_csv(f"static/data/{filename}")
    return df.describe().T

def missing_reporter():
    missing_report = df.isnull().sum().sort_values(ascending=False)
    return "\n" + missing_report.to_string()

def data_type_reporter():
    data_type_report = df.dtypes
    print(data_type_report)
    return "\n" + data_type_report.to_string()

if __name__ == '__main__':
    app.run()