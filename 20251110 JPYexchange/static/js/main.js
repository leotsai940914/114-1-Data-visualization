// 抓兩個圖表容器
let jpyChart = document.getElementById('line-chart-jpy');
let usdChart = document.getElementById('line-chart-usd');

// 從隱藏的 div 抓 JSON 資料
let twd_jpy_data = JSON.parse(document.getElementById('exchangeData').innerHTML);
console.log(twd_jpy_data);

// JPY 的 trace
let traceJPY = {};
traceJPY.type = "scatter";
traceJPY.mode = "lines";
traceJPY.name = "TWD/JPY";
traceJPY.x = [];
traceJPY.y = [];

// USD 的 trace
let traceUSD = {};
traceUSD.type = "scatter";
traceUSD.mode = "lines";
traceUSD.name = "TWD/USD";
traceUSD.x = [];
traceUSD.y = [];

// 填資料
for (let i = 0; i < twd_jpy_data.length; i++) {
    let row = twd_jpy_data[i];

    // x 軸為日期
    traceJPY.x[i] = row.date;
    traceUSD.x[i] = row.date;

    // y 軸分別為 TWD/JPY 和 TWD/USD
    traceJPY.y[i] = row['twd-jpy'];
    traceUSD.y[i] = row['usd-twd'];   // ✅ 修正欄位名稱
}

console.log("traceJPY.x: ", traceJPY.x);
console.log("traceJPY.y: ", traceJPY.y);
console.log("traceUSD.x: ", traceUSD.x);

// 準備資料陣列
let dataJPY = [];
dataJPY.push(traceJPY);

let dataUSD = [];
dataUSD.push(traceUSD);

// 先算好日期範圍
let firstDateJPY = traceJPY.x[0];
let lastDateJPY = traceJPY.x[traceJPY.x.length - 1];

let firstDateUSD = traceUSD.x[0];
let lastDateUSD = traceUSD.x[traceUSD.x.length - 1];

// JPY 圖 layout
let layoutJPY = {
    title: {
        text: "JPY",
        x: 0.5,
    },
    margin: {
        t: 40
    },
    xaxis:{
        showline:true
    },
    yaxis:{
        showline:true
    },
    annotations:[
        {
            xref:'paper',
            yref:'paper',
            x:0.5,
            y:0.1,
            text: `JPY Exchange ${firstDateJPY} ~ ${lastDateJPY}`,
            showarrow:false,
            xanchor:'center',
            yanchor:'top',
            font:{
                size:12,
                color:'gray'
            }
        }
    ]
};

// USD 圖 layout
let layoutUSD = {
    title: {
        text: "USD",
        x: 0.5,
    },
    margin: {
        t: 40
    },
    xaxis:{
        showline:true
    },
    yaxis:{
        showline:true
    },
    annotations:[
        {
            xref:'paper',
            yref:'paper',
            x:0.5,
            y:0.1,
            text: `USD Exchange ${firstDateUSD} ~ ${lastDateUSD}`,
            showarrow:false,
            xanchor:'center',
            yanchor:'top',
            font:{
                size:12,
                color:'gray'
            }
        }
    ]
};

Plotly.newPlot(jpyChart, dataJPY, layoutJPY);
Plotly.newPlot(usdChart, dataUSD, layoutUSD);