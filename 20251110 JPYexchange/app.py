import pandas as pd
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def formPage():
    df = pd.read_csv(
        "https://www.taifex.com.tw/data_gov/taifex_open_data.asp?data_name=DailyForeignExchangeRates",
        # encoding="cp950",
    )
    df.isnull().sum()
    df.drop(df.iloc[:, 5:], axis=1, inplace=True)
    df.drop(df.iloc[:, 2:4], axis=1, inplace=True)
    df.columns = ["date", "usd-twd", "usd-jpy"]

    # 新增一欄：TWD/JPY 的匯率（用兩個 USD 匯率算出來）
    df["twd-jpy"] = df["usd-twd"] / df["usd-jpy"]

    # 只刪掉 usd-jpy，保留 usd-twd 和 twd-jpy
    df.drop(columns=["usd-jpy"], inplace=True)

    # 讓欄位順序變得比較直覺：先日期，再日幣，再美金
    df = df[["date", "twd-jpy", "usd-twd"]]

    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    df['date'] = df["date"].astype(str)
    print(df.head())
    result = df.to_json(orient="records")
    return render_template("index.html", exchangeData=result)

if __name__ == '__main__':
    app.run()